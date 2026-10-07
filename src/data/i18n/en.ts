// This file defines the Dictionary shape. `km.ts` must match it exactly, so
// adding a key here is a compile error until it is translated.
export const en = {
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
    contact: "Contact",
  },

  theme: {
    toggleLabel: "Switch theme",
    light: "Switch to light theme",
    dark: "Switch to dark theme",
  },

  language: {
    label: "Language",
    switchTo: "Switch to Khmer",
  },

  a11y: {
    skipToContent: "Skip to content",
  },

  identity: {
    // TODO: these duplicate site.ts — keep them in sync, or move them here
    // entirely if you prefer one source.
    tagline: "Software developer and graphic designer who enjoys teaching computer skills.",
    description:
      "Portfolio of Nhel Kong — a fourth-year IT student at National Meanchey University specialising in software development and graphic design, with classroom teaching experience.",
    availability: "Seeking a computer teaching position",
    location: "Sleng Village, Svay Chek, Banteay Meanchey, Cambodia",
  },

  home: {
    viewProjects: "View projects",
    getInTouch: "Get in touch",
    selectedProjects: "Selected projects",
    allProjects: "All projects",
    toolkit: "Toolkit",
    ctaTitle: "Have something in mind?",
    ctaBody:
      "I'm happy to talk about work, collaborations, or anything else useful.",
    contactMe: "Contact me",
  },

  projectsPage: {
    title: "Projects",
    lede: "Software I have designed, built, and maintained. The most recent first.",
    empty: "No projects yet.",
    addSome: "Add them in src/data/projects.ts",
  },

  project: {
    back: "All projects",
    highlights: "Highlights",
    builtWith: "Built with",
    screenshots: "Screenshots",
    liveSite: "Live site",
    source: "Source",
    previous: "Previous",
    next: "Next",
  },

  category: {
    software: "Software",
    networking: "Networking",
    design: "Design",
  },

  aboutPage: {
    title: "About",
    skills: "Skills",
    education: "Education",
    experience: "Experience",
    resume: "Résumé",
    downloadPdf: "Download PDF",
  },

  facts: {
    focus: "Focus",
    focusValue: "Software Development, Graphic Design, Teaching",
    languages: "Languages",
    languagesValue: "Khmer (native), English (intermediate)",
  },

  contactPage: {
    title: "Contact",
    lede: "The fastest way to reach me is email. I read everything and usually reply within a couple of days.",
    elsewhere: "Elsewhere",
    email: "Email",
    phone: "Phone",
    basedIn: "Based in",
    formNote:
      "This form opens your own email client with the message pre-filled — nothing is sent to a server. Prefer to write directly?",
  },

  form: {
    name: "Name",
    email: "Email",
    message: "Message",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "What would you like to talk about?",
    send: "Send message",
    errors: {
      nameRequired: "Please enter your name.",
      nameTooLong: "That name is too long.",
      emailRequired: "Please enter your email address.",
      emailInvalid: "That doesn't look like a valid email address.",
      messageRequired: "Please enter a message.",
      messageTooShort: "Please write at least 10 characters.",
    },
  },

  footer: {
    pages: "Pages",
    elsewhere: "Elsewhere",
    builtWith: "Built with Next.js and Tailwind CSS.",
  },

  notFound: {
    title: "Page not found",
    description:
      "That page doesn't exist. It may have been moved, or the link may be out of date.",
  },
};