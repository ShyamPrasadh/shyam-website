<script>
    import { onMount } from "svelte";
    import { fade, slide } from "svelte/transition";

    export let visible = false;

    let isDarkMode = false;
    let wifiOn = true;
    let bluetoothOn = true;

    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    }

    function toggleWifi() {
        wifiOn = !wifiOn;
    }

    function toggleBluetooth() {
        bluetoothOn = !bluetoothOn;
    }
</script>

{#if visible}
    <div class="control-center" transition:fade={{ duration: 200 }}>
        <div class="cc-grid">
            <!-- Connectivity Module -->
            <div class="cc-module connectivity">
                <div class="cc-row" on:click={toggleWifi} class:active={wifiOn}>
                    <div class="cc-icon-circle">
                        <svg
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            fill="currentColor"
                            ><path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                            /></svg
                        >
                        <!-- Using generic icons for now, can replace with SF Symbols SVGs later -->
                        <span style="font-size: 14px;">Wi-Fi</span>
                    </div>
                    <div class="status-text">
                        {wifiOn ? "Home Network" : "Off"}
                    </div>
                </div>
                <div
                    class="cc-row"
                    on:click={toggleBluetooth}
                    class:active={bluetoothOn}
                >
                    <div class="cc-icon-circle">
                        <span style="font-size: 14px;">BT</span>
                    </div>
                    <div class="status-text">{bluetoothOn ? "On" : "Off"}</div>
                </div>
            </div>

            <!-- Display & Sound -->
            <div class="cc-module sliders">
                <div class="slider-container">
                    <div class="slider-icon">☀️</div>
                    <div class="slider-bar">
                        <div class="slider-fill" style="width: 80%;"></div>
                    </div>
                </div>
                <div class="slider-container">
                    <div class="slider-icon">🔊</div>
                    <div class="slider-bar">
                        <div class="slider-fill" style="width: 60%;"></div>
                    </div>
                </div>
            </div>

            <!-- Dark Mode Toggle -->
            <div
                class="cc-module dark-mode"
                on:click={toggleDarkMode}
                class:active={isDarkMode}
            >
                <div class="cc-icon-circle">
                    {isDarkMode ? "🌙" : "☀️"}
                </div>
                <div class="module-label">Dark Mode</div>
                <div class="status-text">{isDarkMode ? "On" : "Off"}</div>
            </div>
        </div>
    </div>
{/if}

<style>
    .control-center {
        position: fixed;
        top: 32px; /* Below menu bar */
        right: 10px;
        width: 320px;
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 18px;
        padding: 12px;
        box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.2),
            0 8px 40px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        color: #000;
    }

    :global([data-theme="dark"]) .control-center {
        background: rgba(30, 30, 30, 0.6);
        color: #fff;
        box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 8px 40px rgba(0, 0, 0, 0.5);
    }

    .cc-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }

    .cc-module {
        background: rgba(255, 255, 255, 0.5);
        border-radius: 14px;
        padding: 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        transition: all 0.2s;
    }

    :global([data-theme="dark"]) .cc-module {
        background: rgba(60, 60, 60, 0.5);
    }

    .connectivity {
        grid-column: span 2;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .cc-row {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }

    .cc-icon-circle {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
    }

    .cc-row.active .cc-icon-circle,
    .dark-mode.active .cc-icon-circle {
        background: var(--accent-color);
        color: white;
    }

    .status-text {
        font-size: 13px;
        font-weight: 500;
    }

    .sliders {
        grid-column: span 2;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .slider-container {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .slider-bar {
        flex: 1;
        height: 24px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        overflow: hidden;
        position: relative;
    }

    :global([data-theme="dark"]) .slider-bar {
        background: rgba(255, 255, 255, 0.1);
    }

    .slider-fill {
        height: 100%;
        background: white;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    }

    .dark-mode {
        grid-column: span 2;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }

    .module-label {
        flex: 1;
        font-weight: 600;
        font-size: 14px;
    }
</style>
