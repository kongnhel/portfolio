import { Container, LinkButton, PageHeader, Section } from "@/components/section";
import { Timeline } from "@/components/timeline";
import { Reveal } from "@/components/reveal";
import { SocialIcon } from "@/components/tech-icon";
import { education, experience, resolveEntry } from "@/data/experience";
import { getDictionary, localisedPath, requireLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

/** Icon per "what I bring" card, matching the home page's role list order. */
const roleIcons = ["code", "pen", "cap"] as const;

export async function generateMetadata({ params }: { params: Params }) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);
  return pageMetadata(
    locale,
    dict.experiencePage.title,
    dict.experiencePage.lede,
    "/experience",
  );
}

export default async function ExperiencePage({ params }: { params: Params }) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);

  return (
    <Container>
      <PageHeader
        title={dict.experiencePage.title}
        lede={dict.experiencePage.lede}
        path="~/experience"
      />

      {/* Work — the same timeline the About page uses, newest first. */}
      <Section
        title={dict.experiencePage.work}
        kicker="~/work"
        id="work"
        reveal={false}
      >
        <Timeline entries={experience.map((e) => resolveEntry(e, locale))} />
      </Section>

      {/* Education */}
      <Section
        title={dict.experiencePage.education}
        kicker="~/education"
        id="education"
        reveal={false}
      >
        <Timeline entries={education.map((e) => resolveEntry(e, locale))} />
      </Section>

      {/* What I bring — the three hats, same cards as the home page. */}
      <Section
        title={dict.experiencePage.focusTitle}
        kicker={dict.experiencePage.focusKicker}
        id="focus"
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

      {/* Closing CTA: from the timeline to the proof. */}
      <Section title={dict.experiencePage.ctaTitle} kicker="~/next" reveal={false}>
        <Reveal variant="up" y={14} duration={650} className="max-w-prose">
          <p className="mb-6 text-base leading-relaxed text-base-300">
            {dict.experiencePage.ctaBody}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <LinkButton href={localisedPath(locale, "/projects")}>
              {dict.home.viewProjects}
            </LinkButton>
            <LinkButton
              href={localisedPath(locale, "/contact")}
              variant="secondary"
            >
              {dict.home.getInTouch}
            </LinkButton>
          </div>
        </Reveal>
      </Section>
    </Container>
  );
}
