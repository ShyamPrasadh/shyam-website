import { writable } from 'svelte/store';

function createWindowStore() {
    const { subscribe, update } = writable({
        windows: [],
        activeWindowId: null,
        zIndexCounter: 100
    });

    return {
        subscribe,
        openWindow: (id, title, component, props = {}) => update(state => {
            const existingWindow = state.windows.find(w => w.id === id);
            if (existingWindow) {
                // If minimized, restore it
                if (existingWindow.minimized) {
                    return {
                        ...state,
                        windows: state.windows.map(w => w.id === id ? { ...w, minimized: false, zIndex: state.zIndexCounter + 1 } : w),
                        activeWindowId: id,
                        zIndexCounter: state.zIndexCounter + 1
                    };
                }
                // Just focus it
                return {
                    ...state,
                    activeWindowId: id,
                    zIndexCounter: state.zIndexCounter + 1,
                    windows: state.windows.map(w => w.id === id ? { ...w, zIndex: state.zIndexCounter + 1 } : w)
                };
            }

            // Create new window
            // Randomize initial position slightly for "stacking" feel
            const randomOffset = Math.floor(Math.random() * 50);

            const newWindow = {
                id,
                title,
                component,
                props,
                x: 100 + randomOffset,
                y: 50 + randomOffset,
                width: 800,
                height: 600,
                zIndex: state.zIndexCounter + 1,
                minimized: false,
                maximized: false
            };

            return {
                ...state,
                windows: [...state.windows, newWindow],
                activeWindowId: id,
                zIndexCounter: state.zIndexCounter + 1
            };
        }),

        closeWindow: (id) => update(state => ({
            ...state,
            windows: state.windows.filter(w => w.id !== id),
            activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
        })),

        focusWindow: (id) => update(state => ({
            ...state,
            activeWindowId: id,
            zIndexCounter: state.zIndexCounter + 1,
            windows: state.windows.map(w => w.id === id ? { ...w, zIndex: state.zIndexCounter + 1 } : w)
        })),

        minimizeWindow: (id) => update(state => ({
            ...state,
            windows: state.windows.map(w => w.id === id ? { ...w, minimized: true } : w),
            activeWindowId: null
        })),

        toggleMaximize: (id) => update(state => ({
            ...state,
            windows: state.windows.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w),
            activeWindowId: id,
            zIndexCounter: state.zIndexCounter + 1
        })),

        updateWindowPosition: (id, x, y) => update(state => ({
            ...state,
            windows: state.windows.map(w => w.id === id ? { ...w, x, y } : w)
        }))
    };
}

export const windowStore = createWindowStore();
