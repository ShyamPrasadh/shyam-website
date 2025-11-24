<script>
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";

    const dispatch = createEventDispatcher();

    function handleStart() {
        // Schedule audio to play in 2.5 seconds (when boot animation completes)
        setTimeout(() => {
            // Use Vite's base URL to handle both local and production paths
            const audioPath =
                import.meta.env.BASE_URL + "sounds/mac-startup.mp3";
            const audio = new Audio(audioPath);
            audio.volume = 0.7;
            audio.play().catch((err) => {
                console.error(
                    "Audio playback failed:",
                    err,
                    "Path:",
                    audioPath,
                );
            });
        }, 2500);

        dispatch("start");
    }
</script>

<div class="splash-screen" transition:fade={{ duration: 300 }}>
    <div class="content">
        <div class="apple-logo">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
                <path
                    d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                />
            </svg>
        </div>
        <h1>Shyam's Portfolio</h1>
        <button class="start-button" on:click={handleStart}>
            Press to Start
        </button>
        <p class="hint">Click to enable sound</p>
    </div>
</div>

<style>
    .splash-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        text-align: center;
    }

    .apple-logo {
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 0.8;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
        }
    }

    h1 {
        font-size: 48px;
        font-weight: 300;
        letter-spacing: -1px;
        margin: 0;
    }

    .start-button {
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(255, 255, 255, 0.3);
        color: white;
        padding: 16px 48px;
        font-size: 18px;
        font-weight: 500;
        border-radius: 980px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }

    .start-button:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.5);
        transform: scale(1.05);
    }

    .start-button:active {
        transform: scale(0.98);
    }

    .hint {
        font-size: 14px;
        opacity: 0.6;
        margin: 0;
    }
</style>
