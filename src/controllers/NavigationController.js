// Navigation Controller - Business logic for app navigation
import { WindowController } from './WindowController.js';
import { dockApps } from '../models/AppData.js';

export class NavigationController {
    /**
     * Navigate to a specific app by ID
     * @param {string} appId - App identifier
     */
    static navigateToApp(appId) {
        const app = dockApps.find(a => a.id === appId);
        if (app) {
            WindowController.openApp(app);
        } else {
            console.warn(`App with ID "${appId}" not found`);
        }
    }

    /**
     * Get app by ID
     * @param {string} appId - App identifier
     * @returns {Object|null} App configuration or null
     */
    static getApp(appId) {
        return dockApps.find(a => a.id === appId) || null;
    }

    /**
     * Get all apps
     * @returns {Array} Array of app configurations
     */
    static getAllApps() {
        return dockApps;
    }

    /**
     * Open welcome screen on app launch
     */
    static openWelcomeScreen() {
        this.navigateToApp('welcome');
    }
}
