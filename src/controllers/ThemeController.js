// Theme Controller - Business logic for theme management
const THEME_KEY = 'portfolio-theme';

export class ThemeController {
    /**
     * Initialize theme from localStorage or system preference
     */
    static initTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }
    }

    /**
     * Set theme
     * @param {string} theme - 'light' or 'dark'
     */
    static setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem(THEME_KEY, theme);
    }

    /**
     * Toggle between light and dark theme
     * @returns {string} New theme value
     */
    static toggleTheme() {
        const currentTheme = this.getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        return newTheme;
    }

    /**
     * Get current theme
     * @returns {string} 'light' or 'dark'
     */
    static getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    }

    /**
     * Check if dark mode is active
     * @returns {boolean}
     */
    static isDarkMode() {
        return this.getCurrentTheme() === 'dark';
    }
}
