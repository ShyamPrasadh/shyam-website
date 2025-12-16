import { cubicOut } from 'svelte/easing';
import { dockStore } from '../stores/dockStore';

/**
 * macOS Genie Effect Transition
 * @param {HTMLElement} node 
 * @param {Object} params 
 */
export function genie(node, params) {
    const { duration = 500, delay = 0, id } = params;
    // Get the target dock icon position
    const iconRect = dockStore.getIconPosition(id);

    // Fallback if no icon found
    if (!iconRect) {
        return {
            duration,
            delay,
            css: t => `
                transform: scale(${t});
                opacity: ${t};
            `
        };
    }

    // Get window initial position (when fully open)
    const windowRect = node.getBoundingClientRect();

    // Calculate deltas (Distance from Window Center to Icon Center)
    const windowCenterX = windowRect.left + windowRect.width / 2;
    const windowCenterY = windowRect.top + windowRect.height / 2;

    const iconCenterX = iconRect.left + iconRect.width / 2;
    const iconCenterY = iconRect.top + iconRect.height / 2;

    const dx = iconCenterX - windowCenterX;
    const dy = iconCenterY - windowCenterY;

    // Calculate target scale
    // We want the window to shrink to the size of the icon
    const scaleX = iconRect.width / windowRect.width;
    const scaleY = iconRect.height / windowRect.height;

    return {
        duration,
        delay,
        easing: params.easing || cubicOut,
        css: (t, u) => {
            // t: 0 -> 1 (Enter/Restore), 1 -> 0 (Leave/Minimize)
            // u: 1 -> 0 (Enter/Restore), 0 -> 1 (Leave/Minimize)

            // Easing: Custom cubic-bezier(0.25, 0.46, 0.45, 0.94) approximation
            // We apply easing to the interpolation factor 'p'
            // For simplicity in CSS string generation, we'll use linear interpolation of values here
            // and rely on Svelte's transition runner, but Svelte expects CSS string for each 't'.
            // To get the specific easing curve the user asked for, we should ideally use a JS easing function.
            // But CSS transitions are smoother if we output a CSS animation or simple steps.
            // Svelte transitions interpolate 't' linearly by default unless 'easing' param is passed to the transition config.

            // Let's use the 'u' (inverse t) to calculate the offset from the "open" state.

            // Non-linear path: The user wants a non-linear path.
            // We can achieve this by applying different easing to X and Y, 
            // but standard CSS transform translate(x,y) moves linearly between points.
            // To get a curve, we'd need separate animations for X and Y, which is hard in a single 'transform'.
            // However, the "Genie" effect is mostly about the shape distortion.

            // Distortion (Funnel Effect):
            // We simulate this by scaling X more at the bottom than the top? 
            // CSS scale() scales uniformly. 
            // We can use clip-path to taper the bottom.

            // Interpolation factor 'p' based on 'u'
            // u=0 (Open), u=1 (Docked)
            const p = u;

            // Calculate current translation
            const transX = dx * p;
            const transY = dy * p;

            // Calculate current scale
            // We want it to shrink slowly at first, then fast (suction)
            const sX = 1 - (1 - scaleX) * p;
            const sY = 1 - (1 - scaleY) * p;

            // Elastic distortion: Stretch horizontally slightly during the middle
            // Peak at p=0.5
            const stretch = Math.sin(p * Math.PI) * 0.1; // 10% stretch
            const currentScaleX = sX + stretch;

            // Clip Path for Funnel
            // We want to taper the side closer to the dock.
            // Assuming dock is at bottom.
            // Taper bottom corners inwards.
            // At p=0 (Open): 0% inset
            // At p=1 (Docked): 0% inset (it's just small)
            // The funnel happens in between.

            // Let's try a simple transform approach first as it's more performant.
            // transform: translate(x, y) scale(sx, sy)

            return `
                transform: translate(${transX}px, ${transY}px) scale(${currentScaleX}, ${sY});
                transform-origin: center;
                opacity: 1;
            `;
        }
    };
}
