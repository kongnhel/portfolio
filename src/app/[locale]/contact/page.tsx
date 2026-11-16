import { Container, PageHeader, TerminalPanel } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { Reveal } from "@/components/reveal";
import { SocialIcon } from "@/components/tech-icon";
import { site } from "@/data/site";
import { getDictionary, requireLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

const socialKinds: Record<string, "github" | "telegram" | "facebook"> = {
  GitHub: "github",
  Telegram: "telegram",
  Facebook: "facebook",
};

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

  const channels: {
    key: string;
    label: string;
    value: string;
    icon: "mail" | "phone" | "github" | "telegram" | "facebook" | "pin";
    href?: string;
    external?: boolean;
  }[] = [
    {
      key: "email",
      label: dict.contactPage.email,
      value: site.email,
      icon: "mail",
      href: `mailto:${site.email}`,
    },
    ...(site.phone
      ? [
          {
            key: "phone",
            label: dict.contactPage.phone,
            value: site.phone,
            icon: "phone" as const,
            href: `tel:${site.phone.replace(/[^\d+]/g, "")}`,
          },
        ]
      : []),
    ...site.socials.map((social) => ({
      key: social.label,
      label: social.label,
      value: social.href.replace(/^https?:\/\/(www\.)?/, ""),
      icon: socialKinds[social.label] ?? ("pin" as const),
      href: social.href,
      external: true,
    })),
    {
      key: "location",
      label: dict.contactPage.basedIn,
      value: dict.identity.location,
      icon: "pin" as const,
    },
  ];

  return (
    <Container>
      <PageHeader title={dict.contactPage.title} lede={dict.contactPage.lede} path="~/contact" />

      <div className="grid gap-10 pb-10 lg:grid-cols-[2fr_3fr] lg:gap-12">
        {/* Direct channels */}
        <Reveal as="div" variant="up" y={18} duration={750}>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-base-500">
            <span aria-hidden="true" className="prompt">
              ~${" "}
            </span>
            {dict.contactPage.channels}
          </h2>

          <ul className="mt-5 space-y-3">
            {channels.map((channel, index) => {
              const body = (
                <>
                  <span
                    aria-hidden="true"
                    className="inline-grid size-9 shrink-0 place-items-center border border-base-800 bg-base-950/60 text-accent"
                  >
                    <SocialIcon kind={channel.icon} className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-xs uppercase tracking-wider text-base-700">
                      {channel.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-base-100 break-words">
                      {channel.value}
                    </span>
                  </span>
                  {channel.external || channel.href ? (
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-base-700 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    >
                      ↗
                    </span>
                  ) : null}
                </>
              );

              const rowClass =
                "card card-hover group flex items-center gap-3.5 p-3.5";

              return (
                <li key={channel.key}>
                  <Reveal
                    variant="up"
                    y={12}
                    duration={600}
                    delay={index * 70}
                    className="h-full"
                  >
                    {channel.href ? (
                      <a
                        href={channel.href}
                        {...(channel.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className={rowClass}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={rowClass}>{body}</div>
                    )}
                    {channel.key === "email" ? (
                      <div className="mt-2 pl-1">
                        <CopyEmail
                          email={site.email}
                          label={dict.contactPage.copyEmail}
                          copiedLabel={dict.contactPage.copied}
                          failedLabel={dict.contactPage.copyFailed}
                        />
                      </div>
                    ) : null}
                  </Reveal>
                </li>
              );
            })}
          </ul>

          {dict.identity.availability ? (
            <Reveal variant="up" y={12} duration={650} delay={200}>
              <p className="mt-6 inline-flex max-w-full items-start gap-2 border border-base-800 bg-base-900/40 px-3 py-2 font-mono text-xs leading-relaxed text-base-500">
                <span aria-hidden="true" className="led mt-1 shrink-0" />
                {dict.identity.availability}
              </p>
            </Reveal>
          ) : null}
        </Reveal>

        {/* Validated mailto form, framed as a terminal window. */}
        <Reveal as="div" variant="up" y={18} duration={750} delay={120}>
          <TerminalPanel
            title="nhel@portfolio: ~/contact — new message"
            bodyClassName="p-5 sm:p-6"
          >
            <ContactForm dict={dict} />
          </TerminalPanel>
        </Reveal>
      </div>
    </Container>
  );
}
