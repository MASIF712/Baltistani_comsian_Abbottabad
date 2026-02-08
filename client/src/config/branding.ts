// Dynamic branding configuration - easily customizable
export const branding = {
  // Organization Info
  organization: {
    name: "Baltistan Comsian",
    subtitle: "Abbottabad Community",
    tagline: "Connecting students from the majestic Gilgit-Baltistan region at COMSATS University Abbottabad.",
  },

  // Logo and Images
  logos: {
    light: "/logo-light.svg", // Light mode logo
    dark: "/logo-dark.svg",   // Dark mode logo
    fallback: "BC",           // Letter-based fallback icon
  },

  // Colors - Tailwind theme colors
  colors: {
    primary: "hsl(var(--primary))",
    accent: "hsl(var(--accent))",
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
  },

  // Navigation items for public pages
  navigation: {
    home: { label: "Home", path: "/" },
    directory: { label: "Directory", path: "/directory" },
    about: { label: "About", path: "/about" },
  },

  // Community features/highlights
  features: [
    {
      id: "connect",
      icon: "Users",
      title: "Connect",
      description: "Meet and connect with fellow students from Baltistan studying at COMSATS University Abbottabad.",
    },
    {
      id: "culture",
      icon: "Mountain",
      title: "Celebrate Culture",
      description: "Celebrate the rich heritage and traditions of the Baltistan region and Balti people.",
    },
    {
      id: "grow",
      icon: "BookOpen",
      title: "Grow Together",
      description: "Support academic excellence and professional development within our community.",
    },
  ],

  // Footer information
  footer: {
    copyright: `© 2026 Baltistan Comsian Abbottabad. All rights reserved.`,
    tagline: "Celebrating the spirit of Baltistan at COMSATS University Abbottabad",
  },

  // SEO and Meta
  seo: {
    title: "Baltistan Comsian Abbottabad",
    description: "Connecting students from Baltistan at COMSATS University Abbottabad",
    keywords: ["Baltistan", "COMSATS", "Community", "Students", "Abbottabad"],
  },
};
