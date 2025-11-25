<script>
    import { onMount, createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";

    const dispatch = createEventDispatcher();
    let visible = true;
    let currentIndex = 0;

    const uxTerms = [
        { text: "Research", emoji: "🔍" },
        { text: "Empathize", emoji: "❤️" },
        { text: "Define", emoji: "🎯" },
        { text: "Ideate", emoji: "💡" },
        { text: "Wireframe", emoji: "📐" },
        { text: "Prototype", emoji: "🔨" },
        { text: "Test", emoji: "🧪" },
        { text: "Iterate", emoji: "🔄" },
        { text: "Design", emoji: "🎨" },
        { text: "Deliver", emoji: "🚀" },
    ];

    onMount(() => {
        // Cycle through UX design process terms
        let i = 0;
        const interval = setInterval(() => {
            currentIndex = i % uxTerms.length;
            i++;
        }, 200);

        // After 2.5 seconds, fade out
        setTimeout(() => {
            clearInterval(interval);

            visible = false;
            setTimeout(() => {
                dispatch("complete");
            }, 1000);
        }, 2500);
    });
</script>

{#if visible}
    <div class="boot-screen" out:fade={{ duration: 1000 }}>
        <div class="content">
            <div class="emoji">{uxTerms[currentIndex].emoji}</div>
            <div class="hello-text">{uxTerms[currentIndex].text}</div>
        </div>
    </div>
{/if}

<style>
    .boot-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #000;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .emoji {
        font-size: 80px;
        margin-bottom: 20px;
        animation: fadeIn 0.2s ease-in-out;
    }

    .hello-text {
        font-size: 48px;
        font-weight: 500;
        font-style: italic;
        font-family:
            "SF Pro Display",
            -apple-system,
            sans-serif;
        letter-spacing: 0px;
        animation: fadeIn 0.2s ease-in-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0.5;
            transform: translateY(5px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
