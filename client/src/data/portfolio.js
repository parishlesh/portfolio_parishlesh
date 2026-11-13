// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: "Parishlesh",
  role: "Full-stack software developer",
  location: "Gurugram, India",
  email: "parishleshfulvanshi@gmail.com",
  phone: "+91 86839 66014",
  resume: "/resumefile/Parishlesh_Resume.pdf",
  intro:
    "Two years shipping enterprise web apps in React, Next.js and Node.js: training platforms for 2,000+ employees, AI-proctored exams over WebRTC, and tender workflows from bid to contract.",
  socials: [
    { label: "GitHub", href: "https://github.com/parishlesh" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/parishlesh-fulvanshi-a74048232/" },
    { label: "X", href: "https://x.com/_parishlesh" },
    { label: "Instagram", href: "https://www.instagram.com/_parishlesh/" },
  ],
};

export const experience = [
  {
    company: "Rosmerta Technology Limited",
    title: "Software Development Engineer I",
    period: "Aug 2024 — Present",
    place: "Gurugram",
    // skills used at this job (drives the "used in production" note in the skills filter)
    stack: ["React", "Next.js", "TypeScript", "JavaScript", "Redux", "Tailwind CSS", "Node.js", "Express", "MongoDB", "JWT", "REST APIs", "Socket.IO", "WebRTC", "Cron jobs", "Git", "Postman", "Lovable"],
    work: [
      {
        name: "ADTC-Shikshan",
        what: "Training & evaluation management system",
        metrics: ["70% less manual scheduling", "60%+ fewer malpractice incidents", "30% faster dashboards"],
        points: [
          "Architected end to end: module-completion tracking, eligibility checks and session booking across multiple ADTC centres.",
          "Cron-based slot engine that auto-assigns trainers and centres by availability rules; slot utilisation up 40%.",
          "AI-proctored exams over WebRTC: multi-face and forbidden-object detection, fullscreen enforcement, tab-switch monitoring.",
          "25+ REST APIs with role-based JWT auth; Redux state and API caching tuned for faster dashboards.",
        ],
      },
      {
        name: "Internal LMS",
        what: "E-learning platform for 2,000+ employees",
        metrics: ["2,000+ employees", "100% induction compliance", "45% higher completion"],
        points: [
          "Induction, mandatory compliance training and module-based certification.",
          "Admin, trainer and employee dashboards in React and Redux over 20+ REST APIs.",
          "Node.js and MongoDB services for content delivery and progress tracking; report generation 35% faster.",
        ],
      },
      {
        name: "TMS",
        what: "Enterprise tender management system",
        metrics: ["Tender to contract", "Role-based approvals"],
        points: [
          "React modules covering the full tender lifecycle: assignment, synopsis, bid preparation, evaluation and contract signing.",
          "Decision Gate and Action Queue approval screens, with tabs that lock and unlock by tender status.",
          "Bid preparation with document versioning, S3-linked storage, drag-and-drop ordering and PDF consolidation.",
        ],
      },
      {
        name: "Rosmerta website",
        what: "Corporate site, built with React and Lovable",
        metrics: ["AI-assisted build"],
        live: "https://rosmertagroupwebview.lovable.app",
        points: [
          "Responsive company, product and service pages, refined iteratively with AI-assisted development.",
        ],
      },
    ],
  },
  {
    company: "Guru Jambheshwar University of Science & Technology",
    title: "B.Tech, Information Technology",
    period: "2020 — 2024",
    place: "Hisar",
    points: [
      "Coders Club contributor, media team coordinator for the Training & Placement Cell, and fortnightly GD champion.",
    ],
  },
];

// `live`: deployed URL (leave "" to hide the button). `repo`: source code.
// `stack` keys must match names in `skills` below so hover-highlighting works.
export const projects = [
  {
    name: "VibeLink",
    featured: true,
    tagline: "End-to-end encrypted, real-time chat",
    description:
      "Messages are encrypted on the sender's device and only decrypted by the recipient. The server stores ciphertext, never plain text. Includes key backup and recovery so a lost device doesn't mean lost history.",
    highlights: [
      "E2E encryption with secure key handling",
      "Encrypted key backup & recovery",
      "JWT auth, OTP verification, session versioning",
      "Password reset / change flows",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT"],
    live: "",
    repo: "https://github.com/parishlesh",
  },
  {
    name: "Job Tracker",
    tagline: "MERN app for running a job search",
    description:
      "Tracks applications from first contact to offer, with status pipelines and notes per role.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    live: "",
    repo: "https://github.com/parishlesh/job-tracker",
  },
  {
    name: "RoomRover",
    tagline: "Full-stack apartment hunting with a map",
    description:
      "Real-time listings you can filter by location, price and amenities, shown on Google Maps, with saved searches and in-app messaging.",
    stack: ["React", "Node.js", "MongoDB", "Google Maps API"],
    live: "",
    repo: "https://github.com/parishlesh",
  },
  {
    name: "Adopt a Pet",
    tagline: "Pet adoption web app",
    description:
      "A web app that connects people with pets looking for a home.",
    stack: ["React"],
    live: "",
    repo: "https://github.com/parishlesh",
  },
  {
    name: "Voice to Text",
    tagline: "Transcribe audio straight out of video files",
    description:
      "A Python tool that pulls the audio track out of a video with ffmpeg and turns it into text.",
    stack: ["Python", "ffmpeg"],
    live: "",
    repo: "https://github.com/parishlesh",
  },
  {
    name: "This portfolio",
    tagline: "The site you're on",
    description:
      "React and Tailwind front end with a Node, Express and MongoDB API that stores contact messages.",
    stack: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    live: "",
    repo: "https://github.com/parishlesh/portfolio_parishlesh",
  },
];

export const skills = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Redux", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs", "JWT"] },
  { group: "Real-time", items: ["Socket.IO", "WebRTC", "Cron jobs"] },
  { group: "Tooling", items: ["Git", "Postman", "Figma", "Lovable", "Google Maps API", "Python", "ffmpeg"] },
];
