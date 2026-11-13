// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: "Parishlesh",
  role: "Full stack developer",
  location: "Gurugram, India",
  email: "parishleshfulvanshi@gmail.com",
  phone: "+91 86839 66014",
  resume: "/resumefile/PARISHLESH updated (4).pdf",
  intro:
    "I build real-time web apps end to end — React and Next.js on the front, Node, Express and MongoDB behind it, with Socket.IO and WebRTC when things need to move live.",
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
    title: "Full Stack Developer",
    period: "2024 — Present",
    place: "Gurugram",
    stack: ["React", "Next.js", "TypeScript", "JavaScript", "Redux", "Tailwind CSS", "Node.js", "Express", "MongoDB", "JWT", "Socket.IO", "WebRTC", "Git"],
    points: [
      "Ship production features across React / Next.js frontends and Node.js + Express APIs.",
      "Build real-time flows with Socket.IO and WebRTC.",
      "Manage app state with Redux and keep the codebase typed with TypeScript.",
    ],
  },
  {
    company: "Guru Jambheshwar University of Science & Technology",
    title: "B.Tech, Information Technology",
    period: "2020 — 2024",
    place: "Hisar",
    points: [
      "Coders Club contributor; media team coordinator for the Training & Placement Cell.",
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
    tagline: "Apartment hunting with a map",
    description:
      "Filter listings by location, price and amenities, see them on an interactive map, save searches and message landlords in-app.",
    stack: ["React", "JavaScript", "Tailwind CSS"],
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
  { group: "Backend", items: ["Node.js", "Express", "MongoDB", "JWT"] },
  { group: "Real-time", items: ["Socket.IO", "WebRTC"] },
  { group: "Tooling", items: ["Git", "Figma", "Python", "ffmpeg"] },
];
