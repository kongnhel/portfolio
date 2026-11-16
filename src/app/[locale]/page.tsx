import Link from "next/link";
import type { CSSProperties } from "react";
import { Container, LinkButton, Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { HeroPortrait } from "@/components/hero-portrait";
import { Parallax } from "@/components/parallax";
import { SectionRail } from "@/components/section-rail";
import { Reveal } from "@/components/reveal";
import { SocialIcon, TechBadge } from "@/components/tech-icon";
import { getFeaturedProjects } from "@/data/projects";
import { skillPreview } from "@/data/experience";
import { site } from "@/data/site";
import { getDictionary, localisedPath, requireLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

const roleIcons = ["code", "pen", "cap"] as const;
const socialKinds = ["github", "telegram", "facebook"] as const;

export async function generateMetadata({ params }: { params: Params }) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);
  const meta = pageMetadata(locale, site.name, dict.identity.description, "/");
  // The layout's title template does not apply to the home page (same segment),
  // so set the full title explicitly.
  return { ...meta, title: `${site.name} — ${dict.identity.tagline}` };
}

export default async function HomePage({ params }: { params: Params }) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);
  const projects = getFeaturedProjects(locale);
  const github = site.socials.find((s) => s.label === "GitHub");

  return (
    <>
      {/* Hero — each line enters a beat after the one above it. Decorative
          terminal glyphs float in the margins on larger screens. */}
      <Container className="relative">
        <span aria-hidden="true" className="hero-glyph hero-glyph-1 hidden sm:block">
          {"</>"}
        </span>
        <span aria-hidden="true" className="hero-glyph hero-glyph-2 hidden sm:block">
          {"{ }"}
        </span>
        <span aria-hidden="true" className="hero-glyph hero-glyph-3 hidden sm:block">
          {"~/"}
        </span>

        <div className="grid items-center gap-10 pt-14 pb-10 sm:pt-20 lg:grid-cols-[1fr_auto] lg:gap-14">
          <div className="min-w-0">
            <Reveal
              as="p"
              variant="up"
              y={12}
              delay={60}
              duration={600}
              className="caret-blink inline-flex items-center gap-2 border border-base-800 bg-base-900/50 px-2.5 py-1 font-mono text-xs text-base-300"
            >
              <span aria-hidden="true" className="led" />
              {dict.identity.availability}
            </Reveal>

            {/* The shimmer lives on a child span: a data-reveal element owns
                the animation longhands (name/duration/delay/fill), and a
                second shorthand on the same node would leak its
                iteration-count into the reveal keyframes — the name would
                blink forever instead of revealing once. Separate nodes,
                separate animations. */}
            <Reveal
              as="h1"
              variant="up"
              y={26}
              delay={170}
              duration={850}
              className="mt-4 text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
            >
              <span className="text-gradient text-shimmer">{site.name}</span>
            </Reveal>

            <Reveal
              as="p"
              variant="up"
              y={20}
              delay={300}
              duration={750}
              className="mt-4 text-xl font-medium leading-snug tracking-tight text-balance text-base-100 sm:text-2xl"
            >
              {dict.home.headline}
            </Reveal>

            <Reveal
              as="p"
              variant="up"
              y={16}
              delay={400}
              duration={750}
              className="mt-3 max-w-prose text-base leading-relaxed text-pretty text-base-500"
            >
              {dict.identity.tagline}
            </Reveal>

            <Reveal
              as="div"
              variant="up"
              y={16}
              delay={500}
              duration={700}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <LinkButton href={localisedPath(locale, "/projects")}>
                {dict.home.viewProjects}
              </LinkButton>
              <LinkButton
                href={localisedPath(locale, "/contact")}
                variant="secondary"
              >
                {dict.home.getInTouch}
              </LinkButton>
            </Reveal>

            {/* Socials: the list itself just fades; each chip rises a beat
                after the last via .stagger and its --i index. */}
            <Reveal
              as="ul"
              variant="fade"
              duration={300}
              delay={600}
              className="stagger mt-6 flex flex-wrap items-center gap-2"
            >
              {site.socials.map((social, index) => (
                <li
                  key={social.href}
                  style={{ "--i": index } as CSSProperties}
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex items-center gap-2 border border-base-800 px-3 py-2 font-mono text-xs text-base-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
                  >
                    <SocialIcon kind={socialKinds[index]} className="size-3.5" />
                    {social.label}
                  </a>
                </li>
              ))}
            </Reveal>
          </div>

          {/* The portrait drifts a few pixels against the scroll — one of
              only two parallax uses, so depth stays a whisper. */}
          <Reveal
            as="div"
            variant="scale"
            duration={900}
            delay={200}
            className="flex justify-center lg:justify-end"
          >
            <Parallax speed={0.06}>
              <HeroPortrait />
            </Parallax>
          </Reveal>
        </div>

        {/* Honest, verifiable numbers. */}
        <Reveal
          as="dl"
          variant="up"
          y={14}
          delay={650}
          duration={750}
          className="mb-4 grid grid-cols-1 gap-6 border-t border-base-800 pt-6 sm:grid-cols-3"
        >
          {dict.home.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1.5">
              {/* dt is the term, dd the value; col-reverse shows the number
                  first without breaking the dl's term→description order. */}
              <dt className="font-mono text-xs leading-relaxed text-base-500">
                {stat.label}
              </dt>
              <dd className="text-gradient font-display text-4xl font-bold tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </Reveal>
      </Container>

      {/* What I do — the three hats, so the value is clear without scrolling far. */}
      <Container>
        <Section
          id="roles"
          title={dict.home.rolesTitle}
          kicker={dict.home.rolesKicker}
          reveal={false}
        >
          <ul className="grid gap-4 sm:grid-cols-3">
            {dict.home.roles.map((role, index) => (
              <Reveal
                as="li"
                key={role.title}
                variant="up"
                y={16}
                duration={650}
                delay={index * 90}
                className="h-full"
              >
                <div className="card card-hover flex h-full flex-col p-5">
                  <span
                    aria-hidden="true"
                    className="inline-grid size-10 place-items-center border border-base-800 bg-base-950/60 text-accent"
                  >
                    <SocialIcon kind={roleIcons[index]} className="size-4.5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold tracking-tight text-base-100">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-base-500">
                    {role.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Section>
      </Container>

      {/* Selected projects — case-study cards with visible screenshots. */}
      <Container>
        <Section
          id="projects"
          title={dict.home.selectedProjects}
          kicker="~/projects"
          reveal={false}
          action={
            <Link
              href={localisedPath(locale, "/projects")}
              className="group shrink-0 font-mono text-xs text-base-500 transition-colors hover:text-accent"
            >
              {dict.home.allProjects}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                {" "}
                →
              </span>
            </Link>
          }
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                locale={locale}
                dict={dict}
                index={index}
              />
            ))}
          </div>
        </Section>
      </Container>

      {/* Toolkit preview, grouped by discipline. */}
      <Container>
        <Section
          id="toolkit"
          title={dict.home.toolkit}
          kicker="~/toolkit"
          reveal={false}
          action={
            <Link
              href={localisedPath(locale, "/about")}
              className="group shrink-0 font-mono text-xs text-base-500 transition-colors hover:text-accent"
            >
              {dict.home.skillsMore}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                {" "}
                →
              </span>
            </Link>
          }
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {skillPreview.map((group, index) => {
              const copy = group.copy[locale];
              return (
                <Reveal
                  as="div"
                  key={copy.title}
                  variant="up"
                  y={14}
                  duration={650}
                  delay={index * 90}
                  className="h-full"
                >
                  <div className="card flex h-full flex-col p-5">
                    <h3 className="flex items-center gap-2 font-mono text-sm font-medium text-accent">
                      <span aria-hidden="true" className="prompt">
                        &gt;
                      </span>
                      {copy.title}
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {copy.skills.map((skill) => (
                        <li key={skill}>
                          <TechBadge name={skill} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Section>
      </Container>

      {/* A glowing hairline hands off from content to the closing ask. */}
      <Container>
        <Reveal variant="fade" duration={800} className="mt-2">
          <span aria-hidden="true" className="hr-glow block" />
        </Reveal>
      </Container>

      {/* Contact CTA — a terminal window asking for input. */}
      <Container>
        <Reveal variant="scale" duration={800} className="mt-6">
          <section
            id="say-hello"
            className="relative overflow-hidden border border-base-800 bg-base-900/40 px-6 py-10 text-center"
          >
            <span
              aria-hidden="true"
              className="cta-wash pointer-events-none absolute inset-0"
            />
            <div className="relative">
              <p aria-hidden="true" className="font-mono text-xs text-base-500">
                <span className="prompt">~$</span>{" "}
                <span className="text-base-700">echo &quot;hello&quot;</span>
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                {dict.home.ctaTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-base-500">
                {dict.home.ctaBody}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <LinkButton href={localisedPath(locale, "/contact")}>
                  {dict.home.contactMe}
                </LinkButton>
                {github ? (
                  <LinkButton
                    href={github.href}
                    variant="secondary"
                    external
                  >
                    GitHub
                  </LinkButton>
                ) : null}
              </div>
            </div>
          </section>
        </Reveal>
      </Container>
      {/* Wide-desktop section rail: dots tracking the viewport's centre band. */}
      <SectionRail
        label={dict.a11y.sections}
        sections={[
          { id: "roles", label: dict.home.rolesTitle },
          { id: "projects", label: dict.home.selectedProjects },
          { id: "toolkit", label: dict.home.toolkit },
          { id: "say-hello", label: dict.home.ctaTitle },
        ]}
      />
    </>
  );
}
