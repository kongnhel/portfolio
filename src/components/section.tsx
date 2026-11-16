import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  /** Display heading for the section. */
  title?: string;
  /** Terminal kicker shown above the title, e.g. "~/projects". */
  kicker?: string;
  /** Small right-aligned content rendered next to the title. */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
  /**
   * Wrap the children in a scroll reveal. Turn it off when the children
   * already reveal themselves (a staggered list, or cards with their own
   * Reveal), otherwise the block fades in twice.
   */
  reveal?: boolean;
}

export function Section({
  title,
  kicker,
  action,
  children,
  className,
  id,
  reveal = true,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-14 sm:py-16", className)}>
      {title ? (
        <Reveal
          as="div"
          variant="up"
          y={12}
          duration={650}
          className="mb-8"
        >
          <div className="flex items-end justify-between gap-4">
            <span className="min-w-0">
              {kicker ? (
                <p className="font-mono text-xs text-base-500">
                  <span aria-hidden="true" className="prompt">
                    ~${" "}
                  </span>
                  <span className="text-base-700">{kicker}</span>
                </p>
              ) : null}
              {/* Reads as a shell command rather than a page-heading label.
                  Fluid so it grows with the viewport instead of stepping. */}
              <h2 className="mt-1.5 truncate text-[clamp(1.5rem,1.25rem+0.8vw,1.875rem)] font-bold tracking-tight text-balance text-base-100">
                {title}
              </h2>
            </span>
            {action ? <div className="shrink-0">{action}</div> : null}
          </div>
          {/* Hairline that fills the rest of the row, like a ruled editor. */}
          <span
            aria-hidden="true"
            className="rule-in mt-4 block h-px bg-base-800"
          />
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
    <div className={cn("mx-auto w-full max-w-4xl px-5 sm:px-6 2xl:max-w-5xl", className)}>
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
  /** Route breadcrumb shown above the title, e.g. "~/projects". */
  path?: string;
}) {
  return (
    <div className="pt-16 pb-6 sm:pt-20">
      <Reveal as="div" variant="up" y={14} duration={650}>
        <p aria-hidden="true" className="font-mono text-xs text-base-500">
          <span className="prompt">nhel@portfolio</span>
          <span className="text-base-700">:</span>
          <span className="text-accent">{path ?? "~"}</span>
          <span className="text-base-700">$</span>
          <span className="caret-blink ml-0.5" />
        </p>
        <h1 className="mt-3 text-[clamp(2.25rem,1.9rem+1.5vw,3rem)] font-bold tracking-tight text-balance">
          {title}
        </h1>
      </Reveal>
      {lede ? (
        <Reveal as="div" variant="up" y={14} duration={650} delay={110}>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-pretty text-base-500">
            {lede}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Pill used for tags, categories, and skills without a known glyph. */
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
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
}) {
  const classes = cn(
    // Full-width and 44px tall on phones (comfortable thumb targets), back to
    // the compact inline pill from SM up.
    "group/btn sheen inline-flex w-full items-center justify-center gap-2 border px-4 py-3 font-mono text-sm font-medium transition-all duration-300 sm:w-auto sm:justify-start sm:py-2.5",
    // Press: settle the lift and give a whisper of scale so taps feel physical.
    "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]",
    variant === "primary"
      ? "btn-accent border-accent bg-accent text-base-950 hover:shadow-[0_0_22px_-4px_var(--accent)]"
      : "btn-fill border-base-800 text-base-300 hover:border-accent hover:text-accent",
    className,
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
