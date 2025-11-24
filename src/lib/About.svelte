<section id="about" class="section-container">
    <div class="section-header">
        <h2 class="section-title">About Me</h2>
        <p class="section-desc">
            Strategic UX Designer & Associate Software Engineer.
        </p>
    </div>
    <div class="bento-grid">
        <div class="bento-card large-card profile-card">
            <h3>Strategic UX Designer</h3>
            <p>
                I turn ambiguous requirements into clean, intuitive, and
                scalable interfaces. Grounded in data, driven by empathy.
            </p>
        </div>
        <div class="bento-card medium-card leadership-card">
            <div class="icon">🎓</div>
            <h3>Student Chairman</h3>
            <p>CSE Dept (2021-23)</p>
        </div>
        <div class="bento-card medium-card leadership-card">
            <div class="icon">📝</div>
            <h3>Secretary</h3>
            <p>CSE Dept (2021-23)</p>
        </div>
        <div class="bento-card wide-card skills-card">
            <h3>Skills & Tools</h3>
            <div class="tags">
                <span>Figma & XD</span>
                <span>User Research</span>
                <span>Interaction Design</span>
                <span>Prototyping</span>
                <span>SAP SD</span>
                <span>Ambiguity to Clarity</span>
                <span>Data-Driven</span>
                <span>Design Strategy</span>
            </div>
        </div>
    </div>
</section>

<style>
    .section-container {
        padding: 2rem;
    }
    .bento-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 300px);
        gap: 1.5rem;
    }

    .bento-card {
        background: var(--card-bg);
        border-radius: var(--border-radius);
        padding: 2rem;
        box-shadow: var(--shadow-sm);
        transition: var(--transition);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .bento-card:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-5px);
    }

    .large-card {
        grid-column: span 2;
    }

    .medium-card {
        grid-column: span 1;
        text-align: center;
        align-items: center;
    }

    .wide-card {
        grid-column: span 3;
    }

    .profile-card {
        background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
    }

    .icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
        margin-top: 1rem;
    }

    .tags span {
        background: var(--bg-color);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.9rem;
        color: var(--text-primary);
    }

    @media (max-width: 768px) {
        .bento-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
        }

        .large-card,
        .medium-card,
        .wide-card {
            grid-column: span 1;
        }
    }
</style>
