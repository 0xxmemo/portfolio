export type ProjectCategory = "featured" | "sdk" | "tools";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  url: string;
  logo?: string;
  category: ProjectCategory;
  linkDisabled?: boolean;
}

export const showcaseSections = [
  { id: "about", label: "// About", color: "#10b981" },
  { id: "experience", label: "// Experience", color: "#059669" },
  { id: "projects", label: "// Projects", color: "#34d399" },
  { id: "tech", label: "// Tech Stack", color: "#6ee7b7" },
  { id: "awards", label: "// Awards & Grants", color: "#10b981" },
  { id: "links", label: "// Connect", color: "#059669" },
  { id: "contact", label: "// Contact", color: "#34d399" },
] as const;

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "sdk", label: "SDKs" },
  { id: "tools", label: "Tools" },
];

export const projects: Project[] = [
  {
    title: "Floor Markets",
    description:
      "Leveraged DeFi protocol — amplify token price & yield up to 20× with floor protection. No liquidations, no interest. Redeem at market price anytime.",
    tags: ["DeFi", "Leverage", "TypeScript", "Viem"],
    url: "https://www.floors.finance/",
    logo: "/logos/floors.svg",
    category: "featured",
  },
  {
    title: "Controlroom",
    description:
      "Modular operations dashboard for Inverter Network. Manage decentralized workflows, deploy modules, and monitor protocol state — all from one responsive interface.",
    tags: ["Next.js", "Full-Stack", "Dashboard", "Web3"],
    url: "https://beta.controlroom.inverter.network/",
    logo: "/logos/controlroom.ico",
    category: "featured",
  },
  {
    title: "litellmctl",
    description:
      "CLI for managing a personal LiteLLM proxy — OAuth logins for major providers, a Bun-based web gateway with dashboard and API keys, local inference (Ollama, whisper), SearXNG search, and one-command install on macOS and Linux.",
    tags: ["TypeScript", "Python", "CLI", "LiteLLM"],
    url: "https://github.com/0xxmemo/litellmctl",
    logo: "/logos/litellmctl.png",
    category: "featured",
  },
  {
    title: "Breadcrumb.cash",
    description:
      "Decentralized InfoFi platform on Base with 2,600+ followers (10× personal account). On-chain intelligence, analytics, and a Reply Agent for X/Twitter automation.",
    tags: ["InfoFi", "Base", "Analytics", "AI Agent"],
    url: "https://breadcrumb.cash",
    logo: "/logos/breadcrumb.ico",
    category: "featured",
    linkDisabled: true,
  },
  {
    title: "Levr",
    description:
      "Customizable crypto launchpad on Base & BNB Chain. Staking, DAO treasury, liquidity pools, airdrop modules. Base Builder Grant winner. Sherlock-audited.",
    tags: ["Base", "BNB", "Launchpad", "Solidity"],
    url: "https://levr.world",
    logo: "/logos/levr.ico",
    category: "featured",
    linkDisabled: true,
  },
  {
    title: "Inverter SDK",
    description:
      "Highly generic, type-safe SDK for composable blockchain interactions. Auto-generated types from on-chain module metadata. Powers Controlroom and third-party integrations.",
    tags: ["TypeScript", "SDK", "Viem", "Wagmi"],
    url: "https://github.com/InverterNetwork/sdk",
    logo: "/logos/inverter.ico",
    category: "sdk",
  },
  {
    title: "Floors SDK",
    description:
      "SDK for Floor Markets protocol — handles leveraged positions, floor price calculations, and redemption flows with full type safety.",
    tags: ["TypeScript", "SDK", "DeFi", "Ethers"],
    url: "https://github.com/InverterNetwork/floors-sdk",
    logo: "/logos/floors.svg",
    category: "sdk",
  },
  {
    title: "Levr SDK",
    description:
      "SDK for Levr launchpad protocol — staking, token launches, DAO treasury, and airdrop module interactions.",
    tags: ["TypeScript", "SDK", "Base", "Solidity"],
    url: "https://github.com/quantidexyz/levr-sdk",
    logo: "/logos/levr.ico",
    category: "sdk",
  },
  {
    title: "Oven SDK",
    description:
      "Shared SDK infrastructure layer for Quantide ecosystem. Common utilities, contract interfaces, and cross-project tooling.",
    tags: ["TypeScript", "SDK", "Monorepo", "Infra"],
    url: "https://github.com/quantidexyz/oven-sdk",
    logo: "/logos/breadcrumb.ico",
    category: "sdk",
  },
  {
    title: "Clanker SDK",
    description:
      "TypeScript SDK for Clanker token factory contracts — deploy, manage, and interact with tokenized assets on Base.",
    tags: ["TypeScript", "SDK", "Base", "Tokens"],
    url: "https://github.com/quantidexyz/clanker-sdk",
    logo: "/logos/clanker.png",
    category: "sdk",
  },
  {
    title: "cralph",
    description:
      "AI coding agent wrapper — bash loop that orchestrates Claude/GPT for autonomous coding sessions. Think Cursor but in the terminal.",
    tags: ["TypeScript", "AI", "CLI", "Agents"],
    url: "https://github.com/0xxmemo/cralph",
    logo: "/logos/ralph.png",
    category: "tools",
  },
  {
    title: "hono-sess",
    description:
      "Lightweight session middleware for Hono framework. Cookie-based sessions with pluggable stores.",
    tags: ["TypeScript", "Hono", "Middleware", "Auth"],
    url: "https://github.com/0xxmemo/hono-sess",
    logo: "/logos/hono.svg",
    category: "tools",
  },
  {
    title: "tanstack-effect",
    description:
      "Bridge between TanStack Query and Effect-TS — type-safe async data fetching with functional error handling.",
    tags: ["TypeScript", "TanStack", "Effect-TS"],
    url: "https://github.com/0xxmemo/tanstack-effect",
    logo: "/logos/tanstack.ico",
    category: "tools",
  },
  {
    title: "mongo-lead",
    description:
      "MongoDB-based leader election for distributed Node.js services. Heartbeat-driven, zero external deps.",
    tags: ["TypeScript", "MongoDB", "Distributed"],
    url: "https://github.com/0xxmemo/mongo-lead",
    logo: "/logos/mongodb.ico",
    category: "tools",
  },
  {
    title: "four-meme-cli",
    description:
      "CLI for Four.meme token platform — snipe launches, manage positions, and interact with the bonding curve from the terminal.",
    tags: ["TypeScript", "CLI", "DeFi", "BNB"],
    url: "https://github.com/0xxmemo/four-meme-cli",
    logo: "/logos/fourmeme.png",
    category: "tools",
  },
  {
    title: "geckoterm",
    description:
      "Typed GeckoTerminal API wrapper — pool analytics, OHLCV data, token prices, and trending pairs across 200+ networks.",
    tags: ["TypeScript", "API", "Analytics", "DeFi"],
    url: "https://github.com/0xxmemo/geckoterm",
    logo: "/logos/geckoterminal.png",
    category: "tools",
  },
  {
    title: "solmint",
    description:
      "Solana token minting toolkit — create SPL tokens, set metadata, and manage mint authorities from CLI or code.",
    tags: ["TypeScript", "Solana", "SPL", "CLI"],
    url: "https://github.com/0xxmemo/solmint",
    logo: "/logos/solana.png",
    category: "tools",
  },
  {
    title: "LiquidCN",
    description:
      "Liquid Glass CN with secret sauce — Apple-inspired liquid glass UI components built on shadcn/ui, Radix primitives, and Motion. Smooth, accessible, and ready for Next.js.",
    tags: ["TypeScript", "shadcn/ui", "React", "Motion"],
    url: "https://github.com/mguleryuz/liquidcn",
    logo: "/logos/liquidcn.svg",
    category: "tools",
  },
];

export interface Experience {
  title: string;
  company: string;
  url?: string;
  period: string;
  description: string;
  tags: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    title: "Fullstack Lead",
    company: "Floor Markets",
    url: "https://www.floors.finance/",
    period: "2024 — Present",
    description:
      "Building a leveraged DeFi protocol where users amplify token price & yield up to 20× — with built-in floor protection. No liquidations, no interest. Architecting the Floors SDK, frontend, and smart contract integrations.",
    tags: ["TypeScript", "Next.js", "Viem", "DeFi", "SDK"],
    logo: "/logos/floors.svg",
  },
  {
    title: "Fullstack Lead",
    company: "Inverter Network",
    url: "https://inverter.network",
    period: "Sept 2023 — 2024",
    description:
      "Architected the Inverter SDK — a highly generic, type-safe toolkit for composable blockchain interactions. Built Controlroom, a modular dashboard for managing decentralized workflows. Shipped architecture diagrams, internal docs, and developer tooling.",
    tags: ["TypeScript", "Next.js", "SDK Design", "Web3", "Wagmi"],
    logo: "/logos/inverter.ico",
  },
  {
    title: "Founding Engineer",
    company: "Crossify",
    period: "2022 — 2023",
    description:
      "First engineer hire. Architected and shipped a cross-chain crypto payment gateway end-to-end — backend (Node.js, Express, Ethers), frontend (Next.js SSR), Docker/AWS deployment. Handled multi-chain transaction routing in production.",
    tags: ["React", "Solidity", "Node.js", "AWS", "Docker"],
    logo: "/logos/crossify.png",
  },
  {
    title: "Frontend Intern",
    company: "Getir",
    period: "2019 — 2020",
    description:
      "Built consumer-facing UI at one of Turkey's fastest-growing unicorn startups (valued at $11.8B at peak). Worked on high-traffic web apps serving millions of users across React and Angular.",
    tags: ["React", "Angular", "JavaScript", "UI/UX"],
    logo: "/logos/getir.png",
  },
];

export const awards = [
  {
    title: "ETH Global Istanbul",
    subtitle: "Hackathon Winner — Scroll, ChainLink, Safe, ENS",
    logo: "/logos/ethglobal.png",
  },
  {
    title: "Solana Demo Day",
    subtitle: "Winner — Superteam",
    logo: "/logos/solana-award.png",
  },
  {
    title: "Solana Turkey Grant",
    subtitle: "Grant Recipient — Superteam",
    logo: "/logos/solana-award.png",
  },
  {
    title: "Base Builder Grant",
    subtitle: "Levr — Coinbase Base Ecosystem",
    logo: "/logos/base.png",
  },
];

export const techRow1 = [
  "TypeScript",
  "Python",
  "React",
  "Next.js",
  "Astro",
  "Node.js",
  "Solidity",
  "Viem",
  "Wagmi",
  "Ethers.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Vector DBs",
];
export const techRow2 = [
  "GraphQL",
  "tRPC",
  "Prisma",
  "Docker",
  "AWS",
  "Vercel",
  "Hardhat",
  "Foundry",
  "The Graph",
  "IPFS",
];

export const socialLinks = [
  { name: "Twitter / X", url: "https://x.com/0xxmemo", color: "hover:text-white", icon: "twitter" },
  { name: "GitHub", url: "https://github.com/0xxmemo", color: "hover:text-white", icon: "github" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mehmet-guleryuz-9a7381206/",
    color: "hover:text-blue-400",
    icon: "linkedin",
  },
  { name: "Telegram", url: "https://t.me/x0memo", color: "hover:text-sky-400", icon: "telegram" },
  { name: "Medium", url: "https://medium.com/@0xxmemo", color: "hover:text-white", icon: "medium" },
  { name: "Zora", url: "https://zora.co/@0xmemo", color: "hover:text-white", icon: "zora" },
] as const;

export function colorForLetter(letter: string): string {
  const colors = [
    "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "bg-emerald-600/20 text-emerald-300 border-emerald-600/30",
    "bg-emerald-700/20 text-emerald-200 border-emerald-700/30",
    "bg-emerald-400/20 text-emerald-400 border-emerald-400/30",
  ];
  return colors[letter.charCodeAt(0) % colors.length] ?? colors[0];
}
