<script>
    import { onMount, onDestroy } from "svelte";
    import { WindowController } from "../../controllers/WindowController";
    import { NavigationController } from "../../controllers/NavigationController";

    function openWorkPage() {
        NavigationController.navigateToApp("portfolio");
    }

    // Typing effect logic
    const lines = [
        "Hi, I'm Shyam Prasadh. A UX Researcher & Design Strategist passionate about creating intuitive experiences.",
        "Turning complex problems into simple solutions.",
        "Bridging the gap between user needs and business goals.",
        "Crafting digital products that people love to use.",
    ];

    let currentLineIndex = 0;
    let currentText = "";
    let isDeleting = false;
    let typingSpeed = 50;
    let deleteSpeed = 30;
    let pauseTime = 2000;
    let timeoutId;

    function type() {
        const fullText = lines[currentLineIndex];

        if (isDeleting) {
            currentText = fullText.substring(0, currentText.length - 1);
        } else {
            currentText = fullText.substring(0, currentText.length + 1);
        }

        let typeSpeed = isDeleting ? deleteSpeed : typingSpeed;

        if (!isDeleting && currentText === fullText) {
            typeSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && currentText === "") {
            isDeleting = false;
            currentLineIndex = (currentLineIndex + 1) % lines.length;
            typeSpeed = 500;
        }

        timeoutId = setTimeout(type, typeSpeed);
    }

    onMount(() => {
        type();
    });

    onDestroy(() => {
        clearTimeout(timeoutId);
    });
</script>

<section id="hero" class="hero-section">
    <div class="hero-content fade-in">
        <h1 class="hero-title">
            Designing with <span class="gradient-text">Empathy.</span><br
            />Leading with <span class="gradient-text">Purpose.</span>
        </h1>
        <p class="hero-subtitle">
            {currentText}<span class="cursor">|</span>
        </p>
        <div class="hero-actions">
            <button class="primary-button" on:click={openWorkPage}>
                View My Work
            </button>
        </div>
    </div>
</section>

<style>
    .hero-section {
        height: 100%;
        min-height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 2rem;
    }

    .hero-content {
        max-width: 800px;
    }

    .hero-title {
        font-size: 3rem;
        line-height: 1.2;
        margin-bottom: 1rem;
    }

    .gradient-text {
        background: linear-gradient(
            135deg,
            #667eea 0%,
            #764ba2 50%,
            #f093fb 100%
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 700;
        display: inline-block;
    }

    .hero-subtitle {
        margin: 1.5rem 0 2.5rem;
        font-size: 1.5rem;
        font-weight: 400;
        min-height: 3.6em; /* Reserve space for 2 lines of text to prevent layout shift */
    }

    .cursor {
        display: inline-block;
        width: 2px;
        background-color: currentColor;
        margin-left: 2px;
        animation: blink 1s step-end infinite;
    }

    @keyframes blink {
        from,
        to {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }

    .hero-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }

    .primary-button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none; /* removed black stroke */
        padding: 14px 32px;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 50px; /* fully rounded pill shape */
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    .primary-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }

    /* Animation classes handled globally or via observer */
    .fade-in {
        animation: fadeIn 1s ease-out forwards;
        opacity: 0;
        transform: translateY(20px);
    }

    @keyframes fadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Mobile Responsive Styles */
    @media (max-width: 768px) {
        .hero-title {
            font-size: 2rem; /* smaller on mobile */
            line-height: 1.3;
        }

        .hero-subtitle {
            font-size: 1.1rem;
            min-height: 4.4em; /* Adjust reserved space for mobile */
        }

        .primary-button {
            font-size: 1rem;
            padding: 12px 24px;
        }
    }

    @media (max-width: 480px) {
        .hero-title {
            font-size: 1.5rem; /* even smaller on very small screens */
        }

        .hero-subtitle {
            font-size: 1rem;
        }
    }
</style>
