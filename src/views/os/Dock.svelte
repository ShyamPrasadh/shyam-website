<script>
    import { windowStore } from "../../lib/stores/windowStore";
    import { createEventDispatcher, onMount } from "svelte";
    import { spring } from "svelte/motion";

    export let apps = [];

    const dispatch = createEventDispatcher();
    let mouseX = null;
    let dockElement;
    let dockRect;
    let touchTimeout = null;

    // Optimization: Update rect on resize
    onMount(() => {
        const updateRect = () => {
            if (dockElement) dockRect = dockElement.getBoundingClientRect();
        };
        updateRect();
        window.addEventListener("resize", updateRect);
        return () => {
            window.removeEventListener("resize", updateRect);
            if (touchTimeout) clearTimeout(touchTimeout);
        };
    });

    function handleAppClick(app) {
        // Reset mouseX on click to prevent stuck magnification
        mouseX = null;

        // Clear any pending timeout
        if (touchTimeout) {
            clearTimeout(touchTimeout);
            touchTimeout = null;
        }

        windowStore.openWindow(
            app.id,
            app.title,
            app.component,
            {},
            Math.random() * 200 + 100,
            Math.random() * 100 + 50,
        );
    }

    function handleMouseMove(e) {
        if (!dockRect) return;
        mouseX = e.clientX - dockRect.left;
    }

    function handleTouchMove(e) {
        if (!dockRect || !e.touches[0]) return;

        // Clear any existing timeout
        if (touchTimeout) clearTimeout(touchTimeout);

        mouseX = e.touches[0].clientX - dockRect.left;

        // Auto-reset after 300ms of no touch movement
        touchTimeout = setTimeout(() => {
            mouseX = null;
            touchTimeout = null;
        }, 300);
    }

    function handleMouseLeave() {
        mouseX = null;
    }

    function handleTouchEnd() {
        // Clear timeout and reset immediately on touch end
        if (touchTimeout) {
            clearTimeout(touchTimeout);
            touchTimeout = null;
        }
        mouseX = null;
    }

    // Optimized scale calculation
    function getScale(index) {
        if (mouseX === null || !dockRect) return 1;

        // Calculate center based on index and fixed width to avoid layout thrashing
        // Assuming 56px icon + 12px gap + 16px padding
        const itemWidth = 68;
        const itemCenter = index * itemWidth + itemWidth / 2 + 16;

        const distance = Math.abs(mouseX - itemCenter);

        // Smooth magnification
        const maxScale = 1.4;
        const minScale = 1;
        const range = 140;

        if (distance < range) {
            // Cubic easing for smoother feel
            const normalized = 1 - distance / range;
            const ease = normalized * normalized * (3 - 2 * normalized);
            return minScale + (maxScale - minScale) * ease;
        }

        return minScale;
    }
</script>

<div class="dock-container">
    <div
        class="dock"
        bind:this={dockElement}
        on:mousemove={handleMouseMove}
        on:mouseleave={handleMouseLeave}
        on:touchmove|nonpassive={handleTouchMove}
        on:touchend={handleTouchEnd}
        role="toolbar"
        aria-label="Applications Dock"
        tabindex="0"
    >
        {#each apps as app, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="dock-item"
                on:click={() => handleAppClick(app)}
                role="button"
                tabindex="0"
            >
                <div
                    class="icon"
                    style="transform: scale({getScale(
                        i,
                    )}) translateY({mouseX !== null && getScale(i) > 1
                        ? -((getScale(i) - 1) * 30)
                        : 0}px);"
                >
                    {#if app.icon && (app.icon.startsWith("http") || app.icon.startsWith("/") || app.icon.includes("import.meta"))}
                        <img
                            src={app.icon}
                            alt={app.title}
                            class="icon-img"
                            data-app-id={app.id}
                        />
                    {:else}
                        <span class="fallback-icon"
                            >{app.icon || app.fallback}</span
                        >
                    {/if}
                </div>
                <span class="tooltip">{app.title}</span>
            </div>
        {/each}
    </div>
</div>

<style>
    .dock-container {
        position: fixed;
        bottom: 20px;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        z-index: 9000;
        pointer-events: none;
    }

    .dock {
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        padding: 6px; /* reduced padding for a smaller dock */
        display: flex;
        gap: 14px; /* added extra space between icons */
        pointer-events: auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        align-items: flex-end;
        min-height: 64px; /* reduced height while keeping icons at 56px */
    }

    .dock-item {
        position: relative;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        padding: 0;
    }

    .icon {
        width: 56px;
        height: 56px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        color: white;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        transition: transform 0.2s cubic-bezier(0.33, 1, 0.68, 1);
        will-change: transform;
        transform-origin: bottom center;
        padding: 2px; /* minimal padding */
        overflow: hidden; /* prevent scaled images from overflowing */
    }

    .icon-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 10px;
        pointer-events: none;
        transform: scale(
            1.15
        ); /* scale up to compensate for internal padding in images */
    }

    /* Specific adjustments for icons that need to be smaller */
    .icon-img[data-app-id="experience"],
    .icon-img[data-app-id="portfolio"],
    .icon-img[data-app-id="contact"] {
        transform: scale(
            1.05
        ); /* smaller scale for Journey, Work, and Contact */
        padding: 3px; /* add padding to create visual space */
    }

    .fallback-icon {
        font-size: 28px;
    }

    .tooltip {
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 4px 12px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s;
    }

    .dock-item:hover .tooltip {
        opacity: 1;
    }

    /* Mobile Responsive Styles */
    @media (max-width: 768px) {
        .dock-container {
            bottom: 0;
        }

        .dock {
            width: 100%;
            border-radius: 0;
            border: none;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            padding: 12px 4px;
            justify-content: space-around;
            background: var(--dock-bg);
            min-height: 70px;
            gap: 4px;
        }

        .dock-item {
            flex: 1;
            max-width: 70px;
            padding: 0 2px;
        }

        .icon {
            width: 48px;
            height: 48px;
            font-size: 24px;
        }

        .tooltip {
            display: none;
        }
    }

    /* Tablet adjustments */
    @media (min-width: 769px) and (max-width: 1023px) {
        .icon {
            width: 48px;
            height: 48px;
        }
    }
</style>
