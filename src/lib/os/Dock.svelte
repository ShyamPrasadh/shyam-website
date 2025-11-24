<script>
    import { windowStore } from "../stores/windowStore";

    export let apps = [];

    function handleAppClick(app) {
        windowStore.openWindow(app.id, app.title, app.component);
    }
</script>

<div class="dock-container">
    <div class="dock">
        {#each apps as app}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="dock-item" on:click={() => handleAppClick(app)}>
                <div
                    class="icon"
                    style={app.icon.startsWith("http") ||
                    app.icon.startsWith("/")
                        ? "background: none;"
                        : `background-color: ${app.color || "#ccc"}`}
                >
                    {#if app.icon.startsWith("http") || app.icon.startsWith("/")}
                        <img
                            src={app.icon}
                            alt={app.title}
                            on:error={(e) => {
                                e.target.style.display = "none";
                                e.target.nextElementSibling.style.display =
                                    "block";
                            }}
                        />
                        <span class="fallback-icon" style="display: none;"
                            >{app.fallback || "📱"}</span
                        >
                    {:else}
                        {app.icon || "📱"}
                    {/if}
                </div>
                <div class="tooltip">{app.title}</div>
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
        pointer-events: none; /* Let clicks pass through around the dock */
    }

    .dock {
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 24px;
        padding: 12px;
        display: flex;
        gap: 12px;
        pointer-events: auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        transition: width 0.2s ease;
    }

    .dock-item {
        position: relative;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        display: flex;
        flex-direction: column;
        align-items: center;
        transform-origin: bottom center;
    }

    .dock-item:hover {
        transform: scale(1.3) translateY(-15px);
        margin: 0 15px;
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
        transition: transform 0.2s;
    }

    .icon img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 14px;
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
            padding: 8px 4px;
            justify-content: space-around;
            background: var(--dock-bg);
        }

        .dock-item {
            flex: 1;
            max-width: 70px;
        }

        /* Disable hover effects on mobile */
        .dock-item:hover {
            transform: none;
            margin: 0;
        }

        .icon {
            width: 44px;
            height: 44px;
            font-size: 22px;
        }

        .tooltip {
            display: none; /* Hide tooltips on mobile */
        }
    }

    /* Tablet adjustments */
    @media (min-width: 769px) and (max-width: 1023px) {
        .icon {
            width: 48px;
            height: 48px;
        }

        .dock-item:hover {
            transform: scale(1.2) translateY(-10px);
            margin: 0 10px;
        }
    }
</style>
