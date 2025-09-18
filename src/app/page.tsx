import { loadConfig, type PortfolioConfig, type Project, type Experience } from "@/lib/config";
import Image from "next/image";
import rectBig from "../assets/Rectangle-big.png";
import rectSmall from "../assets/Rectangle-small.png";
import dotsPng from "../assets/Dots.png";
import heroLogo from "../assets/hero-section-logo.png";
import niceNodeImg from "../assets/nice-node.jpg";
import goodDollarImg from "../assets/gooddollar.jpeg";
import unlockImg from "../assets/unlock.jpg";
import safeImg from "../assets/safe.png";
import soliLogo from "../assets/soli.svg";
import devCrafterLogo from "../assets/devcrafter.png";
import cleverCoreAILogo from "../assets/clevercoreai.png";
import whisperAppLogo from "../assets/upscaled_whipherai.png";
import ascendDMLogo from "../assets/AscendDM.png";
import { SocialIcon } from "@/components/SocialIcons";
import { AnimatedText, FadeInText, TypewriterText } from "@/components/AnimatedText";
import SmoothScrollLink from "@/components/SmoothScrollLink";

function Heading({ title }: { title?: string }) {
  if (!title) return null;
  return <h2 className="section-heading mb-6">{title.toLowerCase()}</h2>;
}

function Hero({ cfg }: { cfg: PortfolioConfig }) {
  const hero = cfg.hero ?? {};
  return (
    <section id={hero.id ?? "home"} className="relative pt-6">
      <div className="rect-stack hidden lg:block">
        <Image src={rectBig} alt="rectangle decorative" className="rect-big opacity-60" />
        <Image src={rectSmall} alt="rectangle decorative small" className="rect-small opacity-60" />
      </div>
      <div className="dots-group right hidden md:block">
        <Image src={dotsPng} alt="dots decorative" />
      </div>
  <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <h1 className="text-[48px] md:text-[64px] lg:text-[72px] leading-[1.1] max-w-4xl">
              <FadeInText delay={0.2}>
                <span className="muted">{hero.name?.split(" ")[0]} is a </span>
              </FadeInText>
              <AnimatedText 
                words={["full-stack engineer", "AI developer", "problem solver", "tech innovator"]}
                className="text-[var(--accent)]"
                typingSpeed={100}
                deletingSpeed={50}
                delayBetweenWords={2500}
              />
            </h1>
            {hero.summary ? (
              <FadeInText delay={2} className="max-w-xl">
                <TypewriterText 
                  text={hero.summary} 
                  speed={30} 
                  delay={2.2}
                  className="text-[14px] leading-relaxed"
                />
              </FadeInText>
            ) : null}
          </div>
          <FadeInText delay={3} className="flex gap-3 flex-wrap">
            {(hero.actions ?? []).map(a => {
              const cls = a.variant === "primary" ? "btn primary" : a.variant === "ghost" ? "btn" : "text-[var(--accent)]";
              return (
                <SmoothScrollLink key={a.href} href={a.href} className={cls}>
                  {a.label}
                </SmoothScrollLink>
              );
            })}
          </FadeInText>
          <FadeInText delay={3.5} className="pt-4">
            <div className="status-pill">
              <span className="dot" /> Currently working at <strong className="text-[12px] tracking-wide">{hero.currentEmployer || 'Remote'}</strong>
            </div>
          </FadeInText>
          {(hero.social ?? []).length ? (
            <FadeInText delay={4} className="flex gap-4 text-[13px]">
              {hero.social?.map(s => (
                <SocialIcon key={s.href} platform={s.label} href={s.href} className="hover:text-[var(--accent)]" />
              ))}
            </FadeInText>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ExperienceCards({ items = [] as Experience[] }) {
  if (!items.length) return null;
  return (
    <div className="experience-timeline">
      {items.map((exp, index) => (
        <div key={index} className="experience-item">
          <div className="experience-header">
            <div className="experience-company">
              {exp.website ? (
                <a href={exp.website} target="_blank" rel="noopener noreferrer" className="company-link">
                  {exp.company}
                </a>
              ) : (
                exp.company
              )}
            </div>
            <div className="experience-period">{exp.period}</div>
          </div>
          <div className="experience-role">{exp.role}</div>
          {exp.location && <div className="experience-location">{exp.location}</div>}
          {exp.achievements && exp.achievements.length > 0 && (
            <ul className="experience-achievements">
              {exp.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function ProjectCards({ items = [] as Project[], description }: { items?: Project[]; description?: string }) {
  if (!items.length) return null;
  
  const getProjectImage = (project: Project) => {
    // Check for specific project titles
    const titleLower = project.title.toLowerCase();
    if (titleLower.includes('whisperapp') || titleLower.includes('whisper app')) return whisperAppLogo;
    if (titleLower.includes('soli')) return soliLogo;
    if (titleLower.includes('clevercore')) return cleverCoreAILogo;
    if (titleLower.includes('devcrafter')) return devCrafterLogo;
    if (titleLower.includes('nice node')) return niceNodeImg;
    if (titleLower.includes('goodcollective') || titleLower.includes('good collective')) return goodDollarImg;
    if (titleLower.includes('unlock')) return unlockImg;
    if (titleLower.includes('safes') || titleLower.includes('safe')) return safeImg;
    if (titleLower.includes('ascend dm') || titleLower.includes('ascenddm')) return ascendDMLogo;
    return heroLogo; // fallback
  };
  
  return (
    <div className="space-y-6">
      {description && <p className="text-[14px] leading-relaxed max-w-2xl">{description}</p>}
      <div className="grid-auto">
        {items.map((p) => (
          <article key={p.title} className="project-card">
            <div className="project-thumb">
              <Image 
                src={getProjectImage(p)} 
                alt={`${p.title} thumbnail`} 
                width={200} 
                height={200} 
                className="project-image"
              />
            </div>
            <div className="project-meta">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold tracking-wide">{p.title}</h3>
                {p.summary ? <p className="text-[13px] leading-relaxed">{p.summary}</p> : null}
              </div>
              {p.tags?.length ? (
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(t => <span key={t} className="pill">{t}</span>)}
                </div>
              ) : null}
              {p.links?.length ? (
                <div className="project-buttons">
                  {p.links.map(l => <a key={l.href} href={l.href} className={`mini-btn ${l.label.toLowerCase().includes("live")?"primary":""}`}>{l.label}</a>)}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Skills({ groups = [] as { title?: string; items?: string[] }[] }) {
  if (!groups.length) return null;
  return (
    <div className="skills-grid">
      {groups.map((g, i) => (
        <div key={i} className="skill-category">
          <h3 className="skill-category-title">{g.title}</h3>
          <div className="skill-items">
            {(g.items ?? []).map(it => <span key={it} className="skill-item">{it}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function Contact({ email, note, discord, phone }: { 
  email?: string; 
  note?: string; 
  discord?: string; 
  phone?: string; 
}) {
  if (!email && !note && !discord && !phone) return null;
  return (
    <div className="contact-section">
      <div className="contact-text">
        {note ? <p className="text-[14px] leading-relaxed max-w-lg">{note}</p> : null}
      </div>
      <div className="contact-card">
        <h3 className="contact-card-title">Message me here</h3>
        <div className="contact-options">
          {discord ? (
            <div className="contact-option">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0188 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
              </svg>
              <span>{discord}</span>
            </div>
          ) : null}
          {email ? (
            <div className="contact-option">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
              </svg>
              <span>{email}</span>
            </div>
          ) : null}
          {phone ? (
            <div className="contact-option">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
              </svg>
              <span>{phone}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const cfg = await loadConfig();
  const sections = cfg.sections ?? [];
  return (
    <div className="space-y-32">
      <Hero cfg={cfg} />
      {sections.map((s) => {
        if (s.type === "experience") return (
          <section key={s.id ?? s.title} id={s.id}>
            <Heading title={s.title} />
            <ExperienceCards items={s.items ?? []} />
          </section>
        );
        if (s.type === "projects") return (
          <section key={s.id ?? s.title} id={s.id}>
            <Heading title={s.title} />
            <ProjectCards items={s.items ?? []} description={s.description} />
          </section>
        );
        if (s.type === "about") return (
          <section key={s.id ?? s.title} id={s.id}>
            <Heading title={s.title} />
            {s.body ? <p className="max-w-2xl text-[14px] leading-relaxed">{s.body}</p> : null}
          </section>
        );
        if (s.type === "skills") return (
          <section key={s.id ?? s.title} id={s.id}>
            <Heading title={s.title} />
            <Skills groups={s.groups ?? []} />
          </section>
        );
        if (s.type === "contact") return (
          <section key={s.id ?? s.title} id={s.id}>
            <Heading title={s.title} />
            <Contact email={s.email} note={s.note} discord={s.discord} phone={s.phone} />
          </section>
        );
        return null;
      })}
    </div>
  );
}
