import type { Dictionary } from "@/lib/i18n";

export const km: Dictionary = {
  nav: {
    home: "ទំព័រ",
    projects: "គម្មវិធី",
    about: "អំពីខ្ញុំ",
    contact: "ទាក់ទង",
  },

  theme: {
    toggleLabel: "ប្ដូរប្រភេទ",
    light: "ប្ដូរទៅប្រភេទភ្លឺ",
    dark: "ប្ដូរទៅប្រភេទងងឹត",
  },

  language: {
    label: "ភាសា",
    switchTo: "ប្ដូរទៅភាសាខ្មែរ",
  },

  a11y: {
    skipToContent: "ទៅកាន់មាតិកាភ្លេច",
  },

  identity: {
    tagline:
      "អ្នកបង្កើតសម្មាត្រ និងរបាយការរូបនា ដែលចូលចិត្តដាំងការបង្កើតជំនាញកុំព្យាករណ៍",
    description:
      "ប្រទេសនេះជារបបរបង់របស់ នហុ កុង — និសិស្សពេលណាទីបី ក្នុងវិស័យព័ត៌មានវិស័យ មុខជំនាញចំណេះកាត់ និងរូបនាសិទ្ធិ ដោយមានបទពិសោធន៍ក្នុងការបង្កើត",
    availability: "ស្វែងរកតំណាងជាមួយការណ៍ការស្តីការបង្កើតកុំព្យាករណ៍",
    location: "ភូមិស្លឹង ស្រុកស្វាយជ័យ ខេត្តបន្ទាយមានជ័យ កម្ពុជា",
  },

  home: {
    viewProjects: "មើលគម្មវិធី",
    getInTouch: "ទាក់ទង",
    selectedProjects: "គម្មវិធីជាក់សំខាន់",
    allProjects: "គម្មវិធីទាំងអស់",
    toolkit: "ឧបកប្រដ្ឋាន",
    ctaTitle: "មានអ្វីដែលត្រូវការទេ?",
    ctaBody:
      "ខ្ញុំរីករាយចិត្តនឹងពិភាក្សាជាងអ្វីៗ ដែលមានប្រយោជន៍ រួមមានការងារ។",
    contactMe: "ទាក់ទងខ្ញុំ",
  },

  projectsPage: {
    title: "គម្មវិធី",
    lede: "កម្មវិធីសម្ព័ន្ធដែលខ្ញុំបានរចនា បង្កើត និងថែទាំ ចុងក្រោយជាចម្បង។",
    empty: "មិនទាន់មានគម្មវិធីទេ។",
    addSome: "បញ្ចូលវានៅក្នុង src/data/projects.ts",
  },

  project: {
    back: "គម្មវិធីទាំងអស់",
    highlights: "ចំណុចល្អបំផុត",
    builtWith: "បានសាងជាមាន",
    screenshots: "រូបភាពអេក្រង់",
    liveSite: "ទីកន្លែងផ្ទាល់",
    source: "កូដប្រភព",
    previous: "មុន",
    next: "បន្ទាប់",
  },

  category: {
    software: "កម្មវិធី",
    networking: "បណ្ដាញ",
    design: "រូបនា",
  },

  aboutPage: {
    title: "អំពីខ្ញុំ",
    skills: "ជំនាញ",
    education: "ការសិក្សា",
    experience: "បទពិសោធន៍",
    resume: "ប្រវត្តិរូបថ្ឹក",
    downloadPdf: "ទាញយក PDF",
  },

  facts: {
    focus: "ការផ្តោតអារមន្ធ",
    focusValue: "ការបង្កើតកម្មវិធី រូបនា និងការបង្កើត",
    languages: "ភាសា",
    languagesValue: "ភាសាខ្មែរ (សត្វជាតិ) ភាសាអង់គ្លេស (កម្រិតមធ្យម)",
  },

  contactPage: {
    title: "ទាក់ទង",
    lede: "វិធីលឿនបំផុតដល់ខ្ញុំគឺតាមអ៊ីមែល។ ខ្ញុំអានទាំងអស់ ហើយជាទូទៅឆ្លើយតបក្នុងរយៈពេលពីរថ្ងៃ។",
    elsewhere: "ទីផ្សេងៗ",
    email: "អ៊ីមែល",
    phone: "លេខទូរស័ព្ទ",
    basedIn: "បន្ទាន់ជា",
    formNote:
      "ទម្រង់នេះនឹងបើកកម្មវិធីអ៊ីមែលរបស់អ្នក ដោយស្មើនឹងសារដែលបានសរសេរទុកសិន — គ្មានអ្វីត្រូវបានផ្ញើទៅម៉ែហ្វមេរ។ ចង់សរសេរដោយផ្ទាល់ជាង?",
  },

  form: {
    name: "ឈ្មោះ",
    email: "អ៊ីមែល",
    message: "សារ",
    namePlaceholder: "ឈ្មោះរបស់អ្នក",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "តើអ្នកចង់និយាយអ្វី?",
    send: "ផ្ញើសារ",
    errors: {
      nameRequired: "សូមបញ្ចូលឈ្មោះរបស់អ្នក។",
      nameTooLong: "ឈ្មោះនេះវែងពេក។",
      emailRequired: "សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែលរបស់អ្នក។",
      emailInvalid: "អាសយដ្ឋានអ៊ីមែលនេះមិនត្រឹមត្រូវទេ។",
      messageRequired: "សូមសរសេរសារ។",
      messageTooShort: "សូមសរសេរយ៉ាងតិច 10 តួអក្សរ។",
    },
  },

  footer: {
    pages: "ទំព័រ",
    elsewhere: "ទីផ្សេងៗ",
    builtWith: "បានបង្កើតដោយ Next.js និង Tailwind CSS។",
  },

  notFound: {
    title: "រកមិនឃើញទំព័រ",
    description: "ទំព័រនេះមិនមានទេ។ វាអាចត្រូវបានផ្លាស់ទី ឬតំណអាចចាស់ទុកចាស់។",
  },
};