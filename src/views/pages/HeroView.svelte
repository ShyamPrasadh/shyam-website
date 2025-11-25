<section id="hero" class="hero-section">
    <div class="hero-content fade-in">
        <h1 class="hero-title">
            Designing with <span class="gradient-text">Empathy.</span><br
            />Leading with <span class="gradient-text">Purpose.</span>
        </h1>
        <p class="hero-subtitle">
            Hi, I'm Shyam Prasadh. A UX Researcher & Design Strategist
            passionate about creating intuitive experiences.
        </p>
        <div class="hero-actions">
            <button
                class="primary-button"
                on:click={() =>
                    document.getElementById("portfolio")?.scrollIntoView()}
                >View My Work</button
            >
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

    .hero-subtitle {
        margin: 1.5rem 0 2.5rem;
        font-size: 1.5rem;
        font-weight: 400;
    }

    .hero-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
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
</style>
