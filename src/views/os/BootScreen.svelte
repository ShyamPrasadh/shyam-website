<script>
    import { onMount, createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";

    const dispatch = createEventDispatcher();
    let visible = true;
    let text = "hello";

    const languages = [
        "hello",
        "hola",
        "bonjour",
        "guten tag",
        "ciao",
        "olá",
        "namaste",
        "salaam",
        "konnichiwa",
        "hallo",
    ];

    onMount(() => {
        // Cycle through "hello" in different languages
        let i = 0;
        const interval = setInterval(() => {
            text = languages[i % languages.length];
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
            <div class="logo"></div>
            <div class="hello-text">{text}</div>
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

    .logo {
        font-size: 80px;
        margin-bottom: 20px;
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
