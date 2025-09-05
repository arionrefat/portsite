import { promises as fs } from "fs";
import path from "path";

export type NavItem = { label: string; href: string };
export type LinkItem = { label: string; href: string };
export type Project = { title: string; summary?: string; tags?: string[]; links?: LinkItem[] };

export type Experience = { 
  company: string; 
  role: string; 
  period: string; 
  location?: string; 
  website?: string; 
  achievements?: string[] 
};

export type ThemeConfig = {
  mode?: "light" | "dark" | "system";
  primary?: string;
  background?: { light: string; dark: string };
  foreground?: { light: string; dark: string };
};

export type PortfolioConfig = {
  site: {
    title: string;
    description?: string;
    email?: string;
    tagline?: string;
    theme?: ThemeConfig;
  };
  nav?: { items?: NavItem[] };
  hero?: {
    id?: string;
    name?: string;
    role?: string;
    summary?: string;
    currentEmployer?: string;
    avatar?: string;
    location?: string;
    actions?: Array<LinkItem & { variant?: "primary" | "ghost" | "link" }>;
    social?: LinkItem[];
  };
  sections?: Array<
    | {
        type: "experience";
        id?: string;
        title?: string;
        items?: Experience[];
      }
    | {
        type: "projects";
        id?: string;
        title?: string;
        description?: string;
        items?: Project[];
      }
    | {
        type: "about";
        id?: string;
        title?: string;
        body?: string;
      }
    | {
        type: "skills";
        id?: string;
        title?: string;
        groups?: { title?: string; items?: string[] }[];
      }
    | {
        type: "contact";
        id?: string;
        title?: string;
        email?: string;
        phone?: string;
        note?: string;
        discord?: string;
      }
  >;
};

// In-memory cache; disabled in development for live updates
let configCache: PortfolioConfig | null = null;

export async function loadConfig(): Promise<PortfolioConfig> {
  const isDev = process.env.NODE_ENV !== "production";
  if (!isDev && configCache) return configCache;
  const filePath = path.join(process.cwd(), "public", "portfolio.config.json");
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = JSON.parse(raw);
  // Minimal shape validation with sensible defaults
  const cfg: PortfolioConfig = {
    site: {
      title: parsed?.site?.title ?? "Portfolio",
      description: parsed?.site?.description ?? "",
      theme: {
        mode: parsed?.site?.theme?.mode ?? "system",
        primary: parsed?.site?.theme?.primary ?? "#2563eb",
        background: parsed?.site?.theme?.background ?? { light: "#ffffff", dark: "#0a0a0a" },
        foreground: parsed?.site?.theme?.foreground ?? { light: "#171717", dark: "#ededed" },
      },
    },
    nav: {
      items: Array.isArray(parsed?.nav?.items) ? parsed.nav.items : [],
    },
    hero: parsed?.hero ?? {},
    sections: Array.isArray(parsed?.sections) ? parsed.sections : [],
  };
  configCache = isDev ? null : cfg; // don't cache in dev
  return cfg;
}

export function themeStyleFromConfig(cfg: PortfolioConfig): string {
  const theme = cfg.site.theme ?? {};
  const primary = theme.primary ?? "#2563eb";
  const bgLight = theme.background?.light ?? "#ffffff";
  const bgDark = theme.background?.dark ?? "#0a0a0a";
  const fgLight = theme.foreground?.light ?? "#171717";
  const fgDark = theme.foreground?.dark ?? "#ededed";
  // CSS to inject in <head> to sync CSS variables with config, honoring prefers-color-scheme
  return `:root{--primary:${primary};--background:${bgLight};--foreground:${fgLight};}
  @media (prefers-color-scheme: dark){:root{--background:${bgDark};--foreground:${fgDark};}}`;
}
