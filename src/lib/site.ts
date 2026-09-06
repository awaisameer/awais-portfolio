/**
 * Single place for every personal detail used across the site.
 * Edit this file to update the whole portfolio.
 */

export const siteConfig = {
  name: "Awais Ameer",
  firstName: "Awais",
  role: "Software Developer",
  headline: "Software Developer | Full Stack .NET, React & Java",
  description:
    "Awais Ameer is a software developer in Lahore, Pakistan building full stack web applications with React, .NET Core, Angular and Java.",
  location: "Lahore, Pakistan",
  email: "awais.ameer181@gmail.com",
  phone: "+92 314 430 8633",
  phoneHref: "tel:+923144308633",
  linkedin: "https://www.linkedin.com/in/awaisameer",
  currentCompany: "Pakistan Air Force",
  year: 2026,
} as const;

export const portrait = {
  src: "/awais.webp",
  hoverSrc: "/awais_wave.webp",
  alt: "Portrait of Awais Ameer",
} as const;
