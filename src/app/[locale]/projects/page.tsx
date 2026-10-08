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
      <PageHeader title={dict.projectsPage.title} lede={dict.projectsPage.lede} path="~/projects" />

{sorted.length > 0 ? (
          <div className="border-t border-base-800 pb-8">
            {sorted.map((project, index) => (
              <div key={project.slug} className="border-b border-base-800">
                <ProjectCard
                  project={project}
                  locale={locale}
                  dict={dict}
                  index={index}
                />
              </div>
            ))}
          </div>
        ) : (
        <p className="pb-8 font-mono text-base-500">
          {dict.projectsPage.empty}{" "}
          <code className="text-sm text-accent">{dict.projectsPage.addSome}</code>
        </p>
      )}
    </Container>
  );
}