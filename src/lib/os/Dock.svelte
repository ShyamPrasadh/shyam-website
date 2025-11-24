<script>
    import { windowStore } from "../stores/windowStore";

    export let apps = [];

    let mouseX = null;
    let dockElement;

    function handleAppClick(app) {
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
        if (!dockElement) return;
        const rect = dockElement.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
    }

    function handleTouchMove(e) {
        if (!dockElement || !e.touches[0]) return;
        const rect = dockElement.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
    }

    function handleMouseLeave() {
        mouseX = null;
    }

    function handleTouchEnd() {
        mouseX = null;
    }

    function getScale(index) {
        if (mouseX === null) return 1;

        const items = dockElement?.querySelectorAll(".dock-item");
        if (!items || !items[index]) return 1;

        const item = items[index];
        const rect = item.getBoundingClientRect();
        const dockRect = dockElement.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2 - dockRect.left;
        const distance = Math.abs(mouseX - itemCenter);

        // Reduced magnification effect
        const maxScale = 1.3;
        const minScale = 1;
        const range = 100; // pixels

        if (distance < range) {
            const scale = maxScale - (distance / range) * (maxScale - minScale);
            return Math.max(minScale, scale);
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
        on:touchmove={handleTouchMove}
        on:touchend={handleTouchEnd}
    >
        {#each apps as app, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="dock-item" on:click={() => handleAppClick(app)}>
                <div
                    class="icon"
                    style="transform: scale({getScale(
                        i,
                    )}) translateY({mouseX !== null && getScale(i) > 1
                        ? -((getScale(i) - 1) * 20)
                        : 0}px);"
                >
                    {#if app.icon && (app.icon.startsWith("http") || app.icon.startsWith("/") || app.icon.includes("import.meta"))}
                        <img src={app.icon} alt={app.title} class="icon-img" />
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
        border-radius: 24px;
        padding: 16px;
        display: flex;
        gap: 12px;
        pointer-events: auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        align-items: flex-end;
        min-height: 90px;
    }

    .dock-item {
        position: relative;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        padding: 0 6px;
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
    }

    .icon-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 14px;
        pointer-events: none;
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
