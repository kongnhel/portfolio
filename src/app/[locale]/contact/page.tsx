import { Container, PageHeader } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/data/site";
import { getDictionary, requireLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);
  return pageMetadata(
    locale,
    dict.contactPage.title,
    dict.contactPage.lede,
    "/contact",
  );
}

export default async function ContactPage({ params }: { params: Params }) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);

  return (
    <Container>
      <PageHeader title={dict.contactPage.title} lede={dict.contactPage.lede} path="~/contact" />

      <div className="grid gap-12 pb-8 sm:grid-cols-[1fr_2fr]">
        {/* Direct details */}
        <Reveal as="div" variant="up" y={18} duration={750}>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-base-500">
            <span aria-hidden="true" className="prompt">
              ~${" "}
            </span>
            {dict.contactPage.elsewhere}
          </h2>

          <ul className="mt-4 space-y-3">
            <li>
              <span className="block font-mono text-xs uppercase tracking-wider text-base-700">
                {dict.contactPage.email}
              </span>
              <a
                href={`mailto:${site.email}`}
                className="font-mono text-sm break-all text-accent hover:underline"
              >
                {site.email}
              </a>
            </li>

            {site.phone ? (
              <li>
                <span className="block font-mono text-xs uppercase tracking-wider text-base-700">
                  {dict.contactPage.phone}
                </span>
                <a
                  href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                  className="font-mono text-sm text-accent hover:underline"
                >
                  {site.phone}
                </a>
              </li>
            ) : null}

            {site.socials.map((social) => (
              <li key={social.href}>
                <span className="block font-mono text-xs uppercase tracking-wider text-base-700">
                  {social.label}
                </span>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm break-all text-accent hover:underline"
                >
                  {social.href.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </li>
            ))}

            <li>
              <span className="block font-mono text-xs uppercase tracking-wider text-base-700">
                {dict.contactPage.basedIn}
              </span>
              <span className="text-sm text-base-300">
                {dict.identity.location}
              </span>
            </li>
          </ul>

          {dict.identity.availability ? (
            <p className="mt-6 inline-flex max-w-full items-start gap-2 border border-base-800 px-2.5 py-1 font-mono text-xs text-base-500">
              <span aria-hidden="true" className="led mt-1 shrink-0" />
              {dict.identity.availability}
            </p>
          ) : null}
        </Reveal>

        {/* Validated mailto form */}
        <Reveal as="div" variant="up" y={18} duration={750} delay={120}>
          <ContactForm dict={dict} />
        </Reveal>
      </div>
    </Container>
  );
}