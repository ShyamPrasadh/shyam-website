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

export const skills = [
    { id: 'svelte', name: 'Svelte', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' },
    { id: 'react', name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { id: 'js', name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { id: 'html', name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { id: 'css', name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { id: 'figma', name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { id: 'python', name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { id: 'git', name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
];

export const achievements = [
    { id: 1, title: 'UX Design Certified', issuer: 'Google', date: '2024' },
    { id: 2, title: '10+ Projects Delivered', category: 'Creative' },
    { id: 3, title: 'Open Source Contributor', category: 'Dev' },
];

export const desktopNotes = [
    { id: 1, title: 'Current Vibe', content: 'Building immersive digital experiences with Svelte & Framer-like polish. ✨', color: '#fff9c4' },
    { id: 2, title: 'Next Goal', content: 'Mastering advanced WebGL shaders for 3D portfolios.', color: '#e1f5fe' }
];

export const systemLogs = [
    { time: '14:20:05', msg: 'Core Design System... OK' },
    { time: '14:20:06', msg: 'Animations... Fluid' },
    { time: '14:20:07', msg: 'UX Empathy Level... 100%' },
    { time: '14:20:08', msg: 'Coffee status... Refilling' }
];

export const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/shyamprasadh', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg' },
    { name: 'GitHub', url: 'https://github.com/ShyamPrasadh', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'Instagram', url: '#', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg' }
];

export const workAvailability = {
    status: 'Available for Hire',
    location: 'India',
    timezone: 'IST (UTC+5:30)'
};

export const featuredProject = {
    title: 'EcoTrack Dashboard',
    tag: 'Latest Work',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2670&auto=format&fit=crop'
};

export const currentTrack = {
    title: 'Midnight City',
    artist: 'M83',
    album: 'Hurry Up, We\'re Dreaming',
    cover: 'https://upload.wikimedia.org/wikipedia/en/0/01/M83_Hurry_Up%2C_We%27re_Dreaming.png',
    progress: 65
};

export const weatherData = {
    temp: '28°',
    condition: 'Sunny',
    location: 'Chennai, IN',
    icon: '☀️'
};

export const creativeStats = [
    { label: 'Pixel Perfection', value: 98, color: '#FF375F' },
    { label: 'Logic Flow', value: 92, color: '#30D158' },
    { label: 'Caffeine Level', value: 75, color: '#FF9F0A' }
];

export const appConfig = {
    name: "Shyam Portfolio",
    bootDelay: 2000,
    splashDelay: 500,
};
