import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Tag } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { getAdjacentProjects, getProject, projects } from "@/data/projects";
import { getDictionary, localisedPath, requireLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  const locale = requireLocale(raw);
  const project = getProject(locale, slug);

  if (!project) return { title: "404" };

  const meta = pageMetadata(
    locale,
    project.title,
    project.summary,
    `/projects/${project.slug}`,
  );

  return { ...meta, openGraph: { ...meta.openGraph, type: "article" } };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  const locale = requireLocale(raw);
  const dict = getDictionary(locale);
  const project = getProject(locale, slug);

  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(locale, project.slug);

  return (
    <Container>
      <article className="pt-16 pb-4">
        <Reveal as="div" variant="fade" duration={500}>
          <Link
            href={localisedPath(locale, "/projects")}
            className="group inline-block font-mono text-xs text-base-500 transition-colors hover:text-accent"
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:-translate-x-1"
            >
              ←
            </span>{" "}
            {dict.project.back}
          </Link>
        </Reveal>

        <Reveal as="div" variant="up" y={20} duration={800} delay={80}>
          <div className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-wider">
            <span aria-hidden="true" className="text-base-500">
              nhel@portfolio
            </span>
            <span aria-hidden="true" className="text-base-700">
              :
            </span>
            <span className="text-accent">{dict.category[project.category]}</span>
            <span aria-hidden="true" className="text-base-700">
              ·
            </span>
            <span className="text-base-500">{project.year}</span>
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-base-500">
            {project.summary}
          </p>

          {project.links.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border border-base-800 px-4 py-2 font-mono text-sm text-base-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  <span aria-hidden="true" className="prompt">
                    &gt;
                  </span>
                  {dict.project[link.labelKey]}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          ) : null}
        </Reveal>

        <Reveal
          as="div"
          variant="up"
          y={16}
          duration={750}
          delay={200}
          className="mt-10 space-y-4"
        >
          {project.description.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="max-w-prose leading-relaxed text-base-300"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>

        {project.shots.length > 0 ? (
          <Reveal
            as="section"
            variant="up"
            y={20}
            duration={800}
            delay={140}
            className="mt-10"
          >
            <span className="flex items-center gap-3">
              <span aria-hidden="true" className="rule-in h-px w-6 bg-accent" />
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-base-500">
                <span aria-hidden="true" className="prompt">
                  ~${" "}
                </span>
                {dict.project.screenshots}
              </h2>
            </span>

            {/* One phone shot stays narrow so it does not blow up on desktop. */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {project.shots.map((shot, index) => {
                const phone = shot.height > shot.width * 1.4;
                return (
                  <Reveal
                    key={shot.src}
                    as="figure"
                    variant="scale"
                    duration={650}
                    delay={index * 90}
                    className={
                      phone
                        ? "mx-auto w-full max-w-[260px] sm:mx-0"
                        : "sm:col-span-2"
                    }
                  >
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      className="crt-image w-full border border-base-800 bg-base-900"
                      // The first screenshot is the one a visitor sees first.
                      priority={index === 0}
                    />
                  </Reveal>
                );
              })}
            </div>
          </Reveal>
        ) : null}

        {project.highlights.length > 0 ? (
          <Reveal
            as="div"
            variant="up"
            y={16}
            duration={750}
            className="mt-10"
          >
            <span className="flex items-center gap-3">
              <span aria-hidden="true" className="rule-in h-px w-6 bg-accent" />
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-base-500">
                <span aria-hidden="true" className="prompt">
                  ~${" "}
                </span>
                {dict.project.highlights}
              </h2>
            </span>
            <ul className="mt-4 max-w-prose space-y-2">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="leading-relaxed text-base-300 before:mr-2 before:text-accent before:content-['→']"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        <Reveal as="div" variant="up" y={16} duration={750} className="mt-10">
          <span className="flex items-center gap-3">
            <span aria-hidden="true" className="rule-in h-px w-6 bg-accent" />
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-base-500">
              <span aria-hidden="true" className="prompt">
                ~${" "}
              </span>
              {dict.project.builtWith}
            </h2>
          </span>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <li key={tag}>
                <Reveal
                  as="span"
                  variant="up"
                  y={8}
                  duration={450}
                  delay={index * 55}
                  className="inline-block"
                >
                  <Tag>{tag}</Tag>
                </Reveal>
              </li>
            ))}
          </ul>
        </Reveal>
      </article>

      {/* Prev / next */}
      <nav
        aria-label={dict.project.back}
        className="grid gap-4 border-t border-base-800 py-10 sm:grid-cols-2"
      >
        {prev ? (
          <Reveal variant="up" y={14} duration={600}>
            <Link
              href={localisedPath(locale, `/projects/${prev.slug}`)}
              className="group block h-full border border-base-800 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-base-900"
            >
              <span className="font-mono text-xs text-base-700">
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:-translate-x-1"
                >
                  ←
                </span>{" "}
                {dict.project.previous}
              </span>
              <span className="mt-1 block font-mono text-sm text-base-100 group-hover:text-accent">
                {prev.title}
              </span>
            </Link>
          </Reveal>
        ) : (
          <span />
        )}
        {next ? (
          <Reveal variant="up" y={14} duration={600} delay={90}>
            <Link
              href={localisedPath(locale, `/projects/${next.slug}`)}
              className="group block h-full border border-base-800 p-4 text-right transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-base-900"
            >
              <span className="font-mono text-xs text-base-700">
                {dict.project.next}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  {" "}
                  →
                </span>
              </span>
              <span className="mt-1 block font-mono text-sm text-base-100 group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          </Reveal>
        ) : null}
      </nav>
    </Container>
  );
}