"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";
import type { Dictionary } from "@/lib/i18n";

interface Fields {
  name: string;
  email: string;
  message: string;
}

type Errors = Partial<Record<keyof Fields, string>>;

const MIN_MESSAGE = 10;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(fields: Fields, dict: Dictionary): Errors {
  const errors: Errors = {};
  const e = dict.form.errors;

  if (!fields.name.trim()) {
    errors.name = e.nameRequired;
  } else if (fields.name.trim().length > 100) {
    errors.name = e.nameTooLong;
  }

  const email = fields.email.trim();
  if (!email) {
    errors.email = e.emailRequired;
  } else if (!EMAIL_RE.test(email)) {
    errors.email = e.emailInvalid;
  }

  const message = fields.message.trim();
  if (!message) {
    errors.message = e.messageRequired;
  } else if (message.length < MIN_MESSAGE) {
    errors.message = e.messageTooShort;
  }

  return errors;
}

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});

  function update(key: keyof Fields, value: string) {
    const next = { ...fields, [key]: value };
    setFields(next);
    // Re-validate a field only once it has been blurred, so errors do not
    // appear while the visitor is still typing their first character.
    if (touched[key]) {
      setErrors(validate(next, dict));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(fields, dict);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first invalid field for keyboard and screen readers.
      const firstInvalid = (Object.keys(nextErrors) as (keyof Fields)[])[0];
      document.getElementById(`field-${firstInvalid}`)?.focus();
      return;
    }

    const subject = encodeURIComponent(
      `Portfolio enquiry from ${fields.name.trim()}`,
    );
    const body = encodeURIComponent(
      `${fields.message.trim()}\n\n—\n${fields.name.trim()}\n${fields.email.trim()}`,
    );

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  const inputClass =
    "field w-full border border-base-800 bg-base-900 px-3 py-2 font-mono text-sm text-base-100 placeholder:text-base-700";
  const errorClass = "border-red-400/60 shake";

  function fieldProps(key: keyof Fields) {
    return {
      id: `field-${key}`,
      name: key,
      value: fields[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        update(key, e.target.value),
      onBlur: () => {
        setTouched((t) => ({ ...t, [key]: true }));
        setErrors(validate(fields, dict));
      },
      "aria-invalid": Boolean(errors[key]) || undefined,
      "aria-describedby": errors[key] ? `error-${key}` : undefined,
      className: `${inputClass} ${errors[key] ? errorClass : ""}`,
    };
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="field-name"
            className="mb-1.5 block font-mono text-xs text-base-500"
          >
            <span aria-hidden="true" className="prompt">
              &gt;{" "}
            </span>
            {dict.form.name}
          </label>
          <input
            type="text"
            autoComplete="name"
            placeholder={dict.form.namePlaceholder}
            {...fieldProps("name")}
          />
          {errors.name ? (
            <p
              id="error-name"
              className="error-in mt-1.5 font-mono text-xs text-red-400"
            >
              <span aria-hidden="true">! </span>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="field-email"
            className="mb-1.5 block font-mono text-xs text-base-500"
          >
            <span aria-hidden="true" className="prompt">
              &gt;{" "}
            </span>
            {dict.form.email}
          </label>
          <input
            type="email"
            autoComplete="email"
            placeholder={dict.form.emailPlaceholder}
            {...fieldProps("email")}
          />
          {errors.email ? (
            <p
              id="error-email"
              className="error-in mt-1.5 font-mono text-xs text-red-400"
            >
              <span aria-hidden="true">! </span>
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor="field-message"
          className="mb-1.5 block font-mono text-xs text-base-500"
        >
          <span aria-hidden="true" className="prompt">
            &gt;{" "}
          </span>
          {dict.form.message}
        </label>
        <textarea
          rows={6}
          placeholder={dict.form.messagePlaceholder}
          {...fieldProps("message")}
        />
        {errors.message ? (
          <p
            id="error-message"
            className="error-in mt-1.5 font-mono text-xs text-red-400"
          >
            <span aria-hidden="true">! </span>
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="sheen inline-flex items-center gap-1 border border-accent bg-accent px-4 py-2.5 font-mono text-sm font-medium text-base-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_22px_-4px_var(--accent)]"
      >
        <span aria-hidden="true">&gt; </span>
        {dict.form.send}
      </button>

      <p className="font-mono text-xs leading-relaxed text-base-700">
        {dict.contactPage.formNote}{" "}
        <a href={`mailto:${site.email}`} className="text-accent hover:underline">
          {site.email}
        </a>
      </p>
    </form>
  );
}