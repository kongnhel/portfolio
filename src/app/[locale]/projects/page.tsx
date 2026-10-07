import { Container, PageHeader } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/data/projects";
import { getDictionary, requireLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);
  return pageMetadata(
    locale,
    dict.projectsPage.title,
    dict.projectsPage.lede,
    "/projects",
  );
}

export default async function ProjectsPage({ params }: { params: Params }) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);

  const sorted = getProjects(locale).sort((a, b) => b.year - a.year);

  return (
    <Container>
      <PageHeader title={dict.projectsPage.title} lede={dict.projectsPage.lede} />

      {sorted.length > 0 ? (
          <div className="grid gap-4 pb-8 sm:grid-cols-2">
            {sorted.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                locale={locale}
                dict={dict}
                index={index}
              />
            ))}
          </div>
      ) : (
        <p className="pb-8 text-base-500">
          {dict.projectsPage.empty}{" "}
          <code className="font-mono text-sm text-accent">
            {dict.projectsPage.addSome}
          </code>
        </p>
      )}
    </Container>
  );
}