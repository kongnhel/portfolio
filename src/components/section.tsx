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
          <span className="flex items-center gap-3">
            <span aria-hidden="true" className="rule-in h-px w-6 bg-accent" />
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-base-500">
              {title}
            </h2>
          </span>
          {action}
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
}: {
  title: string;
  lede?: string;
}) {
  return (
    <div className="pt-16 pb-4">
      <Reveal as="div" variant="up" y={14} duration={650}>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
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

/** Pill used for tags, categories, and skills. */
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
        "inline-block rounded border border-base-800 px-2 py-0.5 font-mono text-xs text-base-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent",
        className,
      )}
    >
      {children}
    </span>
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
    "group/btn sheen inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-medium transition-all duration-300",
    "hover:-translate-y-0.5",
    variant === "primary"
      ? "bg-accent text-base-950 shadow-lg shadow-accent/0 hover:bg-accent/85 hover:shadow-accent/30"
      : "border border-base-800 text-base-300 hover:border-base-700 hover:text-accent",
  );

  const label = (
    <>
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
