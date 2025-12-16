import { writable } from 'svelte/store';

function createDockStore() {
    const { subscribe, update } = writable({});

    return {
        subscribe,
        updateIconPosition: (id, rect) => update(positions => ({
            ...positions,
            [id]: rect
        })),
        getIconPosition: (id) => {
            let pos;
            subscribe(p => pos = p[id])();
            return pos;
        }
    };
}

export const dockStore = createDockStore();
