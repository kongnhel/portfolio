import { Container, PageHeader, Section } from "@/components/section";
import { ProfilePhoto } from "@/components/profile-photo";
import { Timeline } from "@/components/timeline";
import { Reveal } from "@/components/reveal";
import { SocialIcon, TechBadge } from "@/components/tech-icon";
import {
  about,
  education,
  experience,
  resolveEntry,
  skillGroups,
} from "@/data/experience";
import { site } from "@/data/site";
import { getDictionary, requireLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);
  return pageMetadata(
    locale,
    dict.aboutPage.title,
    about.bio[locale][0],
    "/about",
  );
}

export default async function AboutPage({ params }: { params: Params }) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);

  return (
    <Container>
      <PageHeader title={dict.aboutPage.title} path="~/about" />

      {/* Bio */}
      <Section reveal={false}>
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-10">
          <div className="shrink-0">
            <ProfilePhoto size={144} ring />
          </div>

          <div className="max-w-prose space-y-4 text-base leading-relaxed text-base-300">
            {about.bio[locale].map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <dl className="mt-10 grid gap-4 border-t border-base-800 pt-8 sm:grid-cols-2">
          {about.facts.map((fact, index) => (
            <Reveal
              as="div"
              key={fact.key}
              variant="up"
              y={14}
              duration={650}
              delay={index * 90}
              className="h-full"
            >
              <div className="card card-hover h-full p-4">
                <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-base-500">
                  <SocialIcon
                    kind={index === 0 ? "code" : "braces"}
                    className="size-3.5 text-accent"
                  />
                  <span aria-hidden="true" className="prompt">
                    #
                  </span>
                  {dict.facts[fact.key]}
                </dt>
                <dd className="mt-2 text-sm text-base-300">
                  {fact.value[locale]}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* Skills — grouped, with consistent technology glyphs. */}
      <Section title={dict.aboutPage.skills} kicker="~/skills" id="skills">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const copy = group.copy[locale];
            return (
              <Reveal
                key={copy.title}
                variant="up"
                y={16}
                duration={650}
                delay={index * 80}
                className="h-full"
              >
                <div className="card card-hover flex h-full flex-col p-5">
                  <h3 className="flex items-center gap-2 font-mono text-sm font-medium text-accent">
                    <span aria-hidden="true" className="prompt">
                      &gt;
                    </span>
                    {copy.title}
                  </h3>
                  <ul className="mt-3.5 flex flex-wrap gap-1.5">
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

      {/* Education */}
      <Section title={dict.aboutPage.education} kicker="~/education" reveal={false}>
        <Timeline entries={education.map((e) => resolveEntry(e, locale))} />
      </Section>

      {/* Experience */}
      {experience.length > 0 ? (
        <Section title={dict.aboutPage.experience} kicker="~/experience" reveal={false}>
          <Timeline entries={experience.map((e) => resolveEntry(e, locale))} />
        </Section>
      ) : null}

      {/* Résumé */}
      {site.resumeUrl ? (
        <Section title={dict.aboutPage.resume} kicker="~/resume">
          <a
            href={site.resumeUrl}
            className="inline-flex items-center gap-2 border border-base-800 px-4 py-2 font-mono text-sm text-base-300 transition-colors hover:border-accent hover:text-accent"
          >
            <span aria-hidden="true">&gt; </span>
            {dict.aboutPage.downloadPdf} ↓
          </a>
        </Section>
      ) : null}
    </Container>
  );
}
