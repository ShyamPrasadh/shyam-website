<script>
    import { onMount, onDestroy, createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let time = "";
    let interval;

    onMount(() => {
        updateTime();
        interval = setInterval(updateTime, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    function updateTime() {
        const now = new Date();
        time = now
            .toLocaleTimeString("en-US", {
                weekday: "short",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
            .replace(/ AM| PM/, "");
    }
</script>

<div class="menu-bar">
    <div class="left">
        <div class="apple-logo"></div>
        <div class="menu-item font-bold">Shyam Portfolio</div>
        <div class="menu-item">File</div>
        <div class="menu-item">Edit</div>
        <div class="menu-item">View</div>
        <div class="menu-item">Window</div>
        <div class="menu-item">Help</div>
    </div>
    <div class="right">
        <div class="menu-item icon">🔋</div>
        <div class="menu-item icon">wifi</div>
        <div class="menu-item icon">🔍</div>
        <div
            class="menu-item icon"
            on:click={() => dispatch("toggleControlCenter")}
        >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
        </div>
        <div class="menu-item time">{time}</div>
    </div>
</div>

<style>
    .menu-bar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 30px;
        background: rgba(255, 255, 255, 0.3); /* Transparent glass */
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        font-size: 13px;
        color: #1d1d1f;
        z-index: 9999;
        user-select: none;
    }

    .left,
    .right {
        display: flex;
        gap: 20px;
        align-items: center;
    }

    .menu-item {
        cursor: default;
        opacity: 0.9;
    }

    .menu-item:hover {
        opacity: 1;
    }

    .apple-logo {
        font-size: 16px;
        margin-right: 4px;
    }

    .font-bold {
        font-weight: 600;
    }

    .icon {
        font-family: "Material Symbols Outlined", sans-serif;
        font-size: 16px;
    }

    /* Mobile Responsive Styles */
    @media (max-width: 768px) {
        .menu-bar {
            padding: 0 12px;
        }

        .left .menu-item:not(.font-bold) {
            display: none; /* Hide menu items on mobile */
        }

        .right .menu-item:not(.icon):not(.time) {
            display: none; /* Hide non-essential items */
        }

        .right {
            gap: 12px;
        }
    }

    :global([data-theme="dark"]) .menu-bar {
        background: rgba(30, 30, 30, 0.6);
        color: #e8e8e8;
    }
</style>
