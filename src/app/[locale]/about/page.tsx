import { Container, PageHeader, Section, Tag } from "@/components/section";
import { ProfilePhoto } from "@/components/profile-photo";
import { Timeline } from "@/components/timeline";
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
      <PageHeader title={dict.aboutPage.title} />

      {/* Bio */}
      <Section>
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-10">
          <div className="shrink-0">
            <ProfilePhoto size={128} />
          </div>

          <div className="max-w-prose space-y-4 leading-relaxed text-base-300">
            {about.bio[locale].map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-base-800 pt-6 sm:grid-cols-2">
          {about.facts.map((fact) => (
            <div key={fact.key}>
              <dt className="font-mono text-xs uppercase tracking-wider text-base-700">
                {dict.facts[fact.key]}
              </dt>
              <dd className="mt-1 text-sm text-base-300">{fact.value[locale]}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Skills */}
      <Section title={dict.aboutPage.skills}>
        <div className="grid gap-8 sm:grid-cols-2">
          {skillGroups.map((group) => {
            const copy = group.copy[locale];
            return (
              <div key={copy.title}>
                <h3 className="text-sm font-medium text-base-100">
                  {copy.title}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {copy.skills.map((skill) => (
                    <li key={skill}>
                      <Tag className="text-base-300">{skill}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Education */}
      <Section title={dict.aboutPage.education} reveal={false}>
        <Timeline entries={education.map((e) => resolveEntry(e, locale))} />
      </Section>

      {/* Experience */}
      {experience.length > 0 ? (
        <Section title={dict.aboutPage.experience} reveal={false}>
          <Timeline entries={experience.map((e) => resolveEntry(e, locale))} />
        </Section>
      ) : null}

      {/* Résumé */}
      {site.resumeUrl ? (
        <Section title={dict.aboutPage.resume}>
          <a
            href={site.resumeUrl}
            className="inline-flex items-center gap-2 rounded border border-base-800 px-4 py-2 text-sm text-base-300 transition-colors hover:border-base-700 hover:text-accent"
          >
            {dict.aboutPage.downloadPdf} ↓
          </a>
        </Section>
      ) : null}
    </Container>
  );
}