import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  title?: string;
  /** Small right-aligned content rendered next to the title. */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  /**
   * Wrap the children in a scroll reveal. Turn it off when the children
   * already reveal themselves (a staggered list, or cards with their own
   * Reveal), otherwise the block fades in twice.
   */
  reveal?: boolean;
}

export function Section({
  title,
  action,
  children,
  className,
  reveal = true,
}: SectionProps) {
  return (
    <section className={cn("py-12", className)}>
      {title ? (
        <Reveal
          as="div"
          variant="up"
          y={10}
          duration={600}
          className="mb-6 flex items-baseline justify-between gap-4"
        >
          <span className="flex min-w-0 flex-1 items-center gap-3">
            <span aria-hidden="true" className="rule-in h-px w-6 shrink-0 bg-accent" />
            {/* Reads as a shell command rather than a page-heading label. */}
            <h2 className="truncate font-mono text-xs uppercase tracking-[0.2em] text-base-500">
              <span aria-hidden="true" className="prompt">
                ~${" "}
              </span>
              {title}
            </h2>
            {/* Hairline that fills the rest of the row, like a ruled editor. */}
            <span
              aria-hidden="true"
              className="rule-in hidden h-px flex-1 bg-base-800 sm:block"
            />
          </span>
          {action ? <div className="shrink-0">{action}</div> : null}
        </Reveal>
      ) : null}
      {reveal ? (
        <Reveal variant="up" y={16} duration={750}>
          {children}
        </Reveal>
      ) : (
        children
      )}
    </section>
  );
}

/** Standard page wrapper: centred column with consistent gutters. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-3xl px-6", className)}>
      {children}
    </div>
  );
}

/** Page title block used at the top of each route. */
export function PageHeader({
  title,
  lede,
  path,
}: {
  title: string;
  lede?: string;
  /** Route breadcrumb shown above the title, e.g. "/projects". */
  path?: string;
}) {
  return (
    <div className="pt-16 pb-4">
      <Reveal as="div" variant="up" y={14} duration={650}>
        <p aria-hidden="true" className="font-mono text-xs text-base-700">
          <span className="prompt">nhel@portfolio</span>
          <span className="text-base-500">:</span>
          <span className="text-accent">{path ?? "~"}</span>
          <span className="text-base-500">$</span>
          <span className="caret-blink ml-0.5" />
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {title}
        </h1>
      </Reveal>
      {lede ? (
        <Reveal as="div" variant="up" y={14} duration={650} delay={110}>
          <p className="mt-3 max-w-prose text-base leading-relaxed text-base-500">
            {lede}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Pill used for tags, categories, and skills. Square, like everything else. */
export function Tag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block border border-base-800 bg-base-900/60 px-2 py-0.5 font-mono text-xs text-base-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/10 hover:text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Window chrome for a block of content: a title bar with three status LEDs and
 * a `title` label, then the body. Purely decorative — pass `title` for the
 * accessible name or leave it off for a plain framed block.
 */
export function TerminalPanel({
  title,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative border border-base-800 bg-base-900/40",
        className,
      )}
    >
      {title ? (
        <div className="flex items-center gap-3 border-b border-base-800 bg-base-950/60 px-3 py-2">
          <span aria-hidden="true" className="flex items-center gap-1.5">
            <span className="size-2 bg-accent-2/80" />
            <span className="size-2 bg-accent-3/80" />
            <span className="size-2 bg-accent/80" />
          </span>
          <span className="truncate font-mono text-xs text-base-700">
            {title}
          </span>
        </div>
      ) : null}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </div>
  );
}

/** Primary / secondary link buttons. Internal routes use next/link so the
 *  configured basePath (GitHub Pages project sites) is applied. */
export function LinkButton({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}) {
  const classes = cn(
    "group/btn sheen inline-flex items-center gap-2 border px-4 py-2 font-mono text-sm font-medium transition-all duration-300",
    "hover:-translate-y-0.5",
    variant === "primary"
      ? "border-accent bg-accent text-base-950 hover:shadow-[0_0_22px_-4px_var(--accent)]"
      : "border-base-800 text-base-300 hover:border-accent hover:bg-accent/10 hover:text-accent",
  );

  const label = (
    <>
      <span aria-hidden="true" className="prompt">
        &gt;
      </span>
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover/btn:translate-x-1"
      >
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}