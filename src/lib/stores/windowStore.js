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
                // If minimized, restore it and minimize others
                if (existingWindow.minimized) {
                    return {
                        ...state,
                        windows: state.windows.map(w =>
                            w.id === id
                                ? { ...w, minimized: false, zIndex: state.zIndexCounter + 1 }
                                : { ...w, minimized: true } // minimize all other windows
                        ),
                        activeWindowId: id,
                        zIndexCounter: state.zIndexCounter + 1
                    };
                }
                // Just focus it and minimize others
                return {
                    ...state,
                    activeWindowId: id,
                    zIndexCounter: state.zIndexCounter + 1,
                    windows: state.windows.map(w =>
                        w.id === id
                            ? { ...w, zIndex: state.zIndexCounter + 1 }
                            : { ...w, minimized: true } // minimize all other windows
                    )
                };
            }

            // Create new window and minimize all others
            // Randomize initial position slightly for "stacking" feel
            const randomOffset = Math.floor(Math.random() * 50);

            // Check maximize preference
            const shouldMaximize = typeof localStorage !== 'undefined' && localStorage.getItem('maximizeWindows') === 'true';

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
                maximized: shouldMaximize
            };

            return {
                ...state,
                windows: [
                    ...state.windows.map(w => ({ ...w, minimized: true })), // minimize all existing windows
                    newWindow
                ],
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
        })),

        toggleMaximizeMode: (enabled) => update(state => {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('maximizeWindows', enabled.toString());
            }

            return {
                ...state,
                windows: state.windows.map(w => ({
                    ...w,
                    maximized: enabled
                }))
            };
        })
    };
}

export const windowStore = createWindowStore();
