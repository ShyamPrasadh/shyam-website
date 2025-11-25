<script>
    import { draggable } from "../../lib/actions/draggable";
    import { windowStore } from "../../lib/stores/windowStore";
    import { fade, scale } from "svelte/transition";

    export let id;
    export let title;
    export let x = 100;
    export let y = 50;
    export let zIndex = 100;
    export let width = 800;
    export let height = 600;
    export let minimized = false;
    export let maximized = false;

    let windowElement;

    function handleDrag({ dx, dy }) {
        if (maximized) return; // Can't drag when maximized
        x += dx;
        y += dy;
        windowStore.updateWindowPosition(id, x, y);
    }

    function handleFocus() {
        windowStore.focusWindow(id);
    }

    function handleClose() {
        windowStore.closeWindow(id);
    }

    function handleMinimize() {
        windowStore.minimizeWindow(id);
    }

    function handleMaximize() {
        windowStore.toggleMaximize(id);
    }

    $: {
        console.log(`[Window ${id}] Maximize prop: ${maximized}`);
    }
</script>

{#if !minimized}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="window {maximized ? 'maximized' : ''}"
        style="left: {x}px; top: {y}px; z-index: {zIndex}; width: {width}px; height: {height}px;"
        use:draggable={{
            handle: ".title-bar",
            onDrag: handleDrag,
            onDragStart: handleFocus,
        }}
        on:mousedown={handleFocus}
        transition:scale={{ duration: 200, start: 0.95, opacity: 0 }}
        bind:this={windowElement}
    >
        <div class="title-bar" on:dblclick={handleMaximize}>
            <div class="window-controls">
                <button
                    class="control close"
                    on:click|stopPropagation={handleClose}
                ></button>
                <button
                    class="control minimize"
                    on:click|stopPropagation={handleMinimize}
                ></button>
                <button
                    class="control maximize"
                    on:click|stopPropagation={handleMaximize}
                ></button>
            </div>
            <div class="title">{title}</div>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
{/if}

<style>
    .window {
        position: absolute;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 12px;
        box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        min-width: 300px;
        min-height: 200px;
        transition:
            width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
            height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
            top 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
            left 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
            border-radius 0.3s;
    }

    .window.maximized {
        border-radius: 0;
        width: 100% !important;
        height: calc(100% - 30px) !important; /* Full height minus menu bar */
        top: 30px !important; /* Below menu bar */
        left: 0 !important;
    }

    .title-bar {
        height: 38px;
        background: linear-gradient(to bottom, #f6f6f6, #e8e8e8);
        border-bottom: 1px solid #d1d1d1;
        display: flex;
        align-items: center;
        padding: 0 12px;
        user-select: none;
        flex-shrink: 0;
    }

    .window-controls {
        display: flex;
        gap: 8px;
        margin-right: 12px;
    }

    .control {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: none;
        padding: 0;
        cursor: pointer;
        position: relative;
    }

    .control:hover::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 8px;
        color: rgba(0, 0, 0, 0.5);
        font-weight: bold;
    }

    .close {
        background: #ff5f56;
        border: 1px solid #e0443e;
    }
    .close:hover::after {
        content: "×";
    }

    .minimize {
        background: #ffbd2e;
        border: 1px solid #dea123;
    }
    .minimize:hover::after {
        content: "−";
    }

    .maximize {
        background: #27c93f;
        border: 1px solid #1aab29;
    }
    .maximize:hover::after {
        content: "+";
    }

    .title {
        flex: 1;
        text-align: center;
        font-size: 13px;
        color: #4d4d4d;
        font-weight: 500;
        margin-right: 52px; /* Balance controls width */
    }

    .content {
        flex: 1;
        overflow: auto;
        position: relative;
        background: #fff;
    }

    /* Mobile Responsive Styles */
    @media (max-width: 768px) {
        .window {
            position: fixed !important;
            top: 30px !important;
            left: 0 !important;
            width: 100% !important;
            height: calc(100vh - 30px - 60px) !important;
            border-radius: 0;
            min-width: unset;
            min-height: unset;
        }

        .window.maximized {
            height: calc(100vh - 30px - 60px) !important;
        }

        .title-bar {
            height: 44px;
        }

        .control {
            width: 14px;
            height: 14px;
        }

        .title {
            font-size: 14px;
        }
    }

    :global([data-theme="dark"]) .window {
        background: var(--window-bg);
    }

    :global([data-theme="dark"]) .title-bar {
        background: linear-gradient(to bottom, #2d2d2d, #1f1f1f);
        border-bottom: 1px solid #000;
    }

    :global([data-theme="dark"]) .title {
        color: #e8e8e8;
    }

    :global([data-theme="dark"]) .content {
        background: var(--card-bg);
    }
</style>
