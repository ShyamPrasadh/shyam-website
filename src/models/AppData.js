// App Data Model - Dock applications configuration
import About from '../views/pages/AboutView.svelte';
import Contact from '../views/pages/ContactView.svelte';
import Experience from '../views/pages/ExperienceView.svelte';
import Hero from '../views/pages/HeroView.svelte';
import Portfolio from '../views/pages/PortfolioView.svelte';
import Resume from '../views/pages/ResumeView.svelte';

export const dockApps = [
    {
        id: "about",
        title: "About Me",
        icon: import.meta.env.BASE_URL + "icons/finder.png",
        fallback: "👤",
        color: "#FF9F0A",
        component: About,
    },
    {
        id: "experience",
        title: "Journey",
        icon: "https://raw.githubusercontent.com/homarr-labs/dashboard-icons/main/png/apple-maps.png",
        fallback: "🎓",
        color: "#30D158",
        component: Experience,
    },
    {
        id: "portfolio",
        title: "Work",
        icon: import.meta.env.BASE_URL + "icons/work.png",
        fallback: "💼",
        color: "#0A84FF",
        component: Portfolio,
    },
    {
        id: "contact",
        title: "Contact",
        icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/IMessage_logo.svg",
        fallback: "💬",
        color: "#34C759",
        component: Contact,
    },
    {
        id: "resume",
        title: "Resume",
        icon: import.meta.env.BASE_URL + "icons/pages.png",
        fallback: "📄",
        color: "#8E8E93",
        component: Resume,
    },
    {
        id: "welcome",
        title: "Welcome",
        icon: import.meta.env.BASE_URL + "icons/about-new.png",
        fallback: "👋",
        color: "#FF375F",
        component: Hero,
    },
];

export const appConfig = {
    name: "Shyam Portfolio",
    bootDelay: 2000,
    splashDelay: 500,
};
