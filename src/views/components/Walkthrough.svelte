<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { fade, fly } from "svelte/transition";

    const dispatch = createEventDispatcher();

    export let active = false;

    let currentStep = 0;
    let highlightRect = { top: 0, left: 0, width: 0, height: 0 };
    let showWalkthrough = false;
    let tooltipPosition = "bottom"; // "top" or "bottom" relative to target

    const steps = [
        {
            title: "Welcome! 👋",
            description:
                "Welcome to my interactive OS portfolio. I'm excited to show you around!",
            target: null, // Center
        },
        {
            title: "System Menu",
            description:
                "Access system settings, themes, and global status from the top menu bar.",
            target: ".menu-bar",
        },
        {
            title: "Interactive Assistant",
            description:
                "That's me! I'll help you navigate. Try hovering, clicking, or even dragging me around!",
            target: ".widget-container",
        },
        {
            title: "Application Dock",
            description:
                "Launch my projects, experience, and contact info from here. Just like a real Mac!",
            target: ".dock",
        },
        {
            title: "Control Center",
            description:
                "Switch between Light and Dark mode, or adjust system volume and brightness.",
            target: ".control-center-toggle",
        },
        {
            title: "Ready to Explore!",
            description:
                "You're all set! Feel free to explore and have fun with the interface.",
            target: null,
        },
    ];

    $: if (active && !showWalkthrough) {
        startWalkthrough();
    }

    function startWalkthrough() {
        showWalkthrough = true;
        currentStep = 0;
        updateHighlight();
    }

    function nextStep() {
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateHighlight();
        } else {
            closeWalkthrough();
        }
    }

    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            updateHighlight();
        }
    }

    function closeWalkthrough() {
        showWalkthrough = false;
        dispatch("complete");
    }

    function updateHighlight() {
        const step = steps[currentStep];
        if (step.target) {
            const el = document.querySelector(step.target);
            if (el) {
                const rect = el.getBoundingClientRect();
                highlightRect = {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                };

                // Smart positioning: if target is in bottom half, show tooltip above
                const centerY = rect.top + rect.height / 2;
                tooltipPosition =
                    centerY > window.innerHeight / 2 ? "top" : "bottom";
            }
        } else {
            highlightRect = { top: 0, left: 0, width: 0, height: 0 };
            tooltipPosition = "bottom";
        }
    }

    // Update highlight on window resize
    onMount(() => {
        const handleResize = () => {
            if (showWalkthrough) updateHighlight();
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });
</script>

{#if showWalkthrough}
    <div class="walkthrough-overlay" transition:fade={{ duration: 300 }}>
        <!-- Dark Overlay with hole -->
        <div
            class="mask"
            style="
            clip-path: polygon(
                0% 0%, 0% 100%, 
                {highlightRect.left}px 100%, 
                {highlightRect.left}px {highlightRect.top}px, 
                {highlightRect.left +
                highlightRect.width}px {highlightRect.top}px, 
                {highlightRect.left +
                highlightRect.width}px {highlightRect.top +
                highlightRect.height}px, 
                {highlightRect.left}px {highlightRect.top +
                highlightRect.height}px, 
                {highlightRect.left}px 100%, 
                100% 100%, 100% 0%
            );
        "
        ></div>

        <!-- Pulse Highlight -->
        {#if steps[currentStep].target}
            <div
                class="highlight-pulse"
                style="
                    top: {highlightRect.top}px; 
                    left: {highlightRect.left}px; 
                    width: {highlightRect.width}px; 
                    height: {highlightRect.height}px;
                "
            ></div>
        {/if}

        <!-- Tooltip -->
        <div
            class="tooltip-container"
            class:centered={!steps[currentStep].target}
            class:is-top={tooltipPosition === "top"}
            style={steps[currentStep].target
                ? `${
                      tooltipPosition === "bottom"
                          ? `top: ${highlightRect.top + highlightRect.height + 20}px;`
                          : `top: ${highlightRect.top - 20}px; transform: translate(-50%, -100%);`
                  } left: ${highlightRect.left + highlightRect.width / 2}px;`
                : ""}
            in:fly={{
                y: tooltipPosition === "bottom" ? 20 : -20,
                duration: 450,
            }}
        >
            {#if steps[currentStep].target && tooltipPosition === "bottom"}
                <div class="arrow up"></div>
            {/if}
            <div class="tooltip">
                <div class="step-indicator">
                    Step {currentStep + 1} of {steps.length}
                </div>
                <h3>{steps[currentStep].title}</h3>
                <p>{steps[currentStep].description}</p>
                <div class="actions">
                    <button class="skip" on:click={closeWalkthrough}
                        >Skip</button
                    >
                    <div class="nav">
                        {#if currentStep > 0}
                            <button class="back" on:click={prevStep}
                                >Back</button
                            >
                        {/if}
                        <button class="next" on:click={nextStep}>
                            {currentStep === steps.length - 1
                                ? "Finish"
                                : "Next"}
                        </button>
                    </div>
                </div>
            </div>
            {#if steps[currentStep].target && tooltipPosition === "top"}
                <div class="arrow down"></div>
            {/if}
        </div>
    </div>
{/if}

<style>
    .walkthrough-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10001;
        pointer-events: auto;
    }

    .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(2px);
        transition: clip-path 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .highlight-pulse {
        position: absolute;
        border: 2px solid #0071e3;
        border-radius: 12px;
        box-shadow: 0 0 0 0 rgba(0, 113, 227, 0.4);
        animation: pulse-ring 1.5s infinite;
        pointer-events: none;
        transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
        z-index: 10002;
    }

    @keyframes pulse-ring {
        0% {
            box-shadow: 0 0 0 0 rgba(0, 113, 227, 0.4);
        }
        70% {
            box-shadow: 0 0 0 15px rgba(0, 113, 227, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(0, 113, 227, 0);
        }
    }

    .tooltip-container {
        position: absolute;
        transform: translateX(-50%);
        z-index: 10002;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 320px;
        transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .tooltip-container.centered {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .tooltip {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 24px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        width: 100%;
        color: #1d1d1f;
        border: 1px solid rgba(255, 255, 255, 0.5);
    }

    .step-indicator {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #86868b;
        margin-bottom: 8px;
    }

    h3 {
        margin: 0 0 10px 0;
        font-size: 22px;
        font-weight: 700;
        letter-spacing: -0.5px;
    }

    p {
        margin: 0 0 24px 0;
        font-size: 15px;
        line-height: 1.5;
        color: #424245;
    }

    .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav {
        display: flex;
        gap: 10px;
    }

    button {
        border: none;
        padding: 8px 16px;
        border-radius: 980px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
    }

    .skip {
        background: transparent;
        color: #86868b;
        padding-left: 0;
    }

    .skip:hover {
        color: #1d1d1f;
    }

    .back {
        background: rgba(0, 0, 0, 0.05);
        color: #1d1d1f;
    }

    .back:hover {
        background: rgba(0, 0, 0, 0.1);
    }

    .next {
        background: #0071e3;
        color: white;
        padding: 8px 24px;
    }

    .next:hover {
        background: #0077ed;
        transform: scale(1.02);
    }

    .next:active {
        transform: scale(0.98);
    }

    .arrow {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .arrow.up {
        border-bottom: 10px solid rgba(255, 255, 255, 0.95);
        margin-bottom: -1px;
    }

    .arrow.down {
        border-top: 10px solid rgba(255, 255, 255, 0.95);
        margin-top: -1px;
    }

    /* Adjust tooltip position if it's too low */
    @media (max-height: 700px) {
        .tooltip-container:not(.centered) {
            top: auto !important;
            bottom: 100px;
        }
        .arrow {
            display: none;
        }
    }
</style>
