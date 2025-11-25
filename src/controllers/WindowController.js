// Window Controller - Business logic for window management
import { windowStore } from '../lib/stores/windowStore.js';

export class WindowController {
    /**
     * Open a new window
     * @param {string} id - Unique window identifier
     * @param {string} title - Window title
     * @param {Component} component - Svelte component to render
     * @param {Object} props - Props to pass to component
     * @param {number} x - Initial x position
     * @param {number} y - Initial y position
     */
    static openWindow(id, title, component, props = {}, x = 100, y = 50) {
        windowStore.openWindow(id, title, component, props, x, y);
    }

    /**
     * Close a window by ID
     * @param {string} id - Window identifier
     */
    static closeWindow(id) {
        windowStore.closeWindow(id);
    }

    /**
     * Focus a window (bring to front)
     * @param {string} id - Window identifier
     */
    static focusWindow(id) {
        windowStore.focusWindow(id);
    }

    /**
     * Update window position
     * @param {string} id - Window identifier
     * @param {number} x - New x position
     * @param {number} y - New y position
     */
    static updatePosition(id, x, y) {
        windowStore.updatePosition(id, x, y);
    }

    /**
     * Minimize window
     * @param {string} id - Window identifier
     */
    static minimizeWindow(id) {
        windowStore.minimizeWindow(id);
    }

    /**
     * Open app from dock
     * @param {Object} app - App configuration object
     */
    static openApp(app) {
        const x = Math.random() * 200 + 100;
        const y = Math.random() * 100 + 50;
        this.openWindow(app.id, app.title, app.component, {}, x, y);
    }
}
