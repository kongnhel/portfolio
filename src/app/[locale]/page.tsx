import Link from "next/link";
import { Container, LinkButton, Section, Tag } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { HeroPortrait } from "@/components/hero-portrait";
import { Reveal } from "@/components/reveal";
import { getFeaturedProjects } from "@/data/projects";
import { skillSummary } from "@/data/experience";
import { site } from "@/data/site";
import { getDictionary, localisedPath, requireLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

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

  return (
    <>
      {/* Hero — each line enters a beat after the one above it. */}
      <Container>
        <div className="pt-20 pb-8 sm:pt-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <Reveal
              as="div"
              variant="scale"
              duration={900}
              className="flex justify-center sm:justify-start"
            >
              <HeroPortrait />
            </Reveal>

            <div className="min-w-0">
              <Reveal
                as="p"
                variant="up"
                y={12}
                delay={60}
                duration={600}
                className="caret-blink font-mono text-sm text-accent"
              >
                {dict.identity.availability}
              </Reveal>
              <Reveal
                as="h1"
                variant="up"
                y={26}
                delay={170}
                duration={850}
                className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
              >
                {site.name}
              </Reveal>
              <Reveal
                as="p"
                variant="up"
                y={18}
                delay={300}
                duration={750}
                className="mt-3 max-w-prose text-lg leading-relaxed text-base-500 text-pretty"
              >
                {dict.identity.tagline}
              </Reveal>
            </div>
          </div>

          <Reveal
            as="div"
            variant="up"
            y={16}
            delay={430}
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
        </div>
      </Container>

      {/* Selected projects */}
      <Container>
        <Section
          title={dict.home.selectedProjects}
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
          <div className="grid gap-4 sm:grid-cols-2">
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

      {/* Skills strip */}
      <Container>
        <Section title={dict.home.toolkit} reveal={false}>
          <ul className="flex flex-wrap gap-2">
            {skillSummary.map((skill, index) => (
              <li key={skill}>
                <Reveal
                  as="span"
                  variant="up"
                  y={10}
                  duration={500}
                  delay={index * 45}
                  className="inline-block"
                >
                  <Tag className="text-base-300">{skill}</Tag>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      </Container>

      {/* Contact CTA */}
      <Container>
        <Reveal variant="scale" duration={800} className="mt-12">
          <section className="relative overflow-hidden rounded border border-base-800 bg-base-900/40 px-6 py-10 text-center">
            <span
              aria-hidden="true"
              className="cta-wash pointer-events-none absolute inset-0"
            />
            <div className="relative">
              <h2 className="text-xl font-semibold tracking-tight">
                {dict.home.ctaTitle}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-base-500">
                {dict.home.ctaBody}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <LinkButton href={localisedPath(locale, "/contact")}>
                  {dict.home.contactMe}
                </LinkButton>
                {site.socials[0] ? (
                  <LinkButton
                    href={site.socials[0].href}
                    variant="secondary"
                    external
                  >
                    {site.socials[0].label}
                  </LinkButton>
                ) : null}
              </div>
            </div>
          </section>
        </Reveal>
      </Container>
    </>
  );
}
