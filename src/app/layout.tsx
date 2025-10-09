import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { loadConfig, themeStyleFromConfig } from "@/lib/config";
import { SocialIcon } from "@/components/SocialIcons";
import ParticlesBackground from "@/components/ParticlesBackground";
import SmoothScrollLink from "@/components/SmoothScrollLink";
import MobileNavigation from "@/components/MobileNavigation";

export const runtime = "nodejs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const cfg = await loadConfig();
  return {
    title: cfg.site.title,
    description: cfg.site.description,
    metadataBase: new URL("https://example.com"),
    icons: {
      icon: '/favicon.svg',
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cfg = await loadConfig();
  const themeCss = themeStyleFromConfig(cfg);
  const navItems = cfg.nav?.items ?? [];
  return (
    <html lang="en">
      <head>
        <style id="config-theme" dangerouslySetInnerHTML={{ __html: themeCss }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ParticlesBackground />        
        {/* App shell with sidebar + top nav inline */}
        <div className="flex">
          <aside className="sidebar hidden md:flex">
            <div className="brand text-[14px] font-semibold tracking-wide rotate-180 writing-mode-vertical">{cfg.hero?.name?.split(" ")[0] || cfg.site.title}</div>
            <div className="grow flex flex-col items-center gap-5 pt-10">
              {(cfg.hero?.social ?? []).map(s => (
                <SocialIcon key={s.href} platform={s.label} href={s.href} className="social-dot" />
              ))}
            </div>
          </aside>
          <div className="flex-1 min-h-screen">
            <header className="top-nav">
              <div className="inner-nav">
                <SmoothScrollLink href="#home" className="site-name">{cfg.hero?.name || cfg.site.title}</SmoothScrollLink>
                <nav className="nav-inline">
                  {navItems.map((item,i) => (
                    <SmoothScrollLink key={item.href} href={item.href} className={i===0?"active":""}>{item.label.toLowerCase()}</SmoothScrollLink>
                  ))}
                </nav>
                <MobileNavigation 
                  navItems={navItems}
                  socialLinks={cfg.hero?.social ?? []}
                  siteName={cfg.hero?.name || cfg.site.title}
                />
              </div>
            </header>
            <main className="wrap pt-24 pb-24 space-y-28 ml-sidebar">{children}</main>
            <footer className="footer-section ml-sidebar">
              <div className="footer-content">
                <div className="footer-left">
                  <div className="footer-brand">
                    <div className="footer-name">{cfg.hero?.name?.split(" ")[0] || "Gazi"}</div>
                    <div className="footer-email">{cfg.site.email || "gazirefatul@gmail.com"}</div>
                  </div>
                  <div className="footer-tagline">{cfg.site.tagline || "Full-stack engineer and developer"}</div>
                </div>
                <div className="footer-right">
                  <div className="footer-media-title">Media</div>
                  <div className="footer-social">
                    {(cfg.hero?.social ?? []).map(s => (
                      <SocialIcon key={s.href} platform={s.label} href={s.href} className="footer-social-icon" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                © Copyright {new Date().getFullYear()}. Made by {cfg.hero?.name?.split(" ")[0] || "Gazi"}
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
