// All static copy lives here. Edit words in this file, not in components.

export const site = {
  name: "Sudhir",
  brand: "RecruAIter",
  title: "RecruAIter — AI workflows for recruiters, built by a recruiter",
  description:
    "RecruAIter — AI workflows for recruiters, built by a recruiter. Only what survives a real search.",
  links: {
    linkedin: "https://www.linkedin.com/in/YOUR-HANDLE", // TODO: replace with your LinkedIn URL
    email: "mailto:sudhir.ticku@searce.com",
    updates: "https://www.linkedin.com/in/YOUR-HANDLE", // TODO: swap for newsletter link when you have one
  },
};

export const nav = [
  { label: "Builds", href: "/#builds" },
  { label: "Why", href: "/#why" },
  { label: "Blog", href: "/blog" },
  { label: "Learn", href: "/learn" },
  { label: "About", href: "/#about" },
  { label: "Off duty", href: "/anime" },
];

export const hero = {
  eyebrow: "Built by a recruiter. For recruiters.",
  brandPrefix: "Recru",
  brandAccent: "AI",
  brandSuffix: "ter",
  headline: "Real recruiting workflows. Battle-tested, not demo-tested.",
  subhead:
    "No JD generators. No “10x your outreach” templates. Just the automations I run on live searches — shared so you can build your own.",
  primaryCta: { label: "Explore builds", href: "#builds" },
  secondaryCta: { label: "Read the why", href: "#why" },
};

export const whoFor = {
  label: "Who this is for",
  header: "You'll feel at home here if...",
  items: [
    {
      title: "You're the curious one on the team.",
      body: "You've asked “why do we still do it this way?” more times than your manager would like. You want to build the fix, not just flag the problem.",
    },
    {
      title: "You want to be a recruiter who builds.",
      body: "Not a prompt engineer, not a developer — a recruiter who's tired of waiting for tools that get it and decided to take things into their own hands.",
    },
    {
      title: "You're early in your recruiting career.",
      body: "You're learning the craft and you want to learn it with AI in the toolkit from day one, instead of unlearning bad habits later.",
    },
  ],
  closing: "If you read that list and nodded at least once, stick around.",
};

export const why = {
  label: "Why this was created",
  header: "Because most AI recruiting tools are built for the demo, not the desk.",
  body: [
    "There's a lot of noise right now. Every week there's a new “AI-native” hiring tool — a JD generator here, an outreach bot there. They look great in a 10-minute walkthrough. Then you run them on a real search with a vague brief, a picky hiring manager and a market that's moved since last quarter, and they fall apart.",
    "This site is not that.",
    "Everything here has been through a live req. If it's on this page, I've used it on an actual hire, fixed what broke, and kept only what held up. I'll tell you where it works, where it doesn't, and what's still half-built.",
    "The goal is simple: cut the noise, share what's real, and help this community upskill on the right things.",
  ],
  pillars: [
    {
      icon: "🧪",
      title: "Tried on real searches",
      body: "Nothing here is theoretical. Every workflow has been run on a live hire.",
    },
    {
      icon: "🧭",
      title: "Process before prompts",
      body: "Fix the way you recruit first. Then let AI do the heavy lifting.",
    },
    {
      icon: "🤝",
      title: "Built for the community",
      body: "Shared openly so other recruiters can build, adapt and improve.",
    },
  ],
};

export const builds = {
  label: "Builds",
  header: "The workflows",
  intro:
    "Each one comes with what it does, what it doesn't, and how to build your own. Filter by stage.",
  cardCta: "View build →",
  comingSoon: {
    title: "More on the way.",
    body: "Webinars on building your first workflow and 1:1 coaching for recruiters who want to go deeper are coming soon.",
    cta: { label: "Get notified →", href: site.links.updates },
  },
};

export const about = {
  label: "About",
  header: "Engineer at heart. Recruiter by profession.",
  body: [
    "I'm Sudhir. I believe a company's roadmap is only as good as the people executing it — and that's the problem I've spent 7+ years solving.",
    "I've hired globally across tech and GTM, at every level, for enterprises and early-stage startups alike. Along the way I got a front-row seat to AI in hiring before it was a buzzword: as a founding hire at an AI-native recruiting startup, I helped build the product, and I saw first-hand what AI can already do for hiring — and what's still a work in progress.",
    "What I'm best at is translating a business objective into a talent strategy. What I enjoy most is building the tooling that makes that strategy actually run.",
    "This site is where the two meet.",
  ],
  short:
    "Recruiter who builds. 7+ years hiring tech & GTM globally, early hands-on experience building AI for hiring. Sharing what actually works.",
  facts: [
    "7+ years in talent acquisition",
    "Hired across tech, GTM & leadership — enterprise to seed stage",
    "Founding hire at an AI-native hiring startup",
    "Currently: building in public",
  ],
};

export const footerCta = {
  header: "Building something for your own team?",
  body: "I'd love to hear what's breaking in your process. Reach out, or follow along as new workflows drop.",
  ctas: [
    { label: "Say hi", href: site.links.email },
    { label: "Follow on LinkedIn", href: site.links.linkedin },
    { label: "Get updates", href: site.links.updates },
  ],
};
