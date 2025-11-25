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
        <!-- Additional Details from Resume -->
        <div class="bento-card wide-card education-card">
            <h3>Education</h3>
            <ul>
                <li>
                    <strong>DesignBoat</strong> – Intensified UI/UX Design Course
                    (Jun 2023 – Nov 2023)
                </li>
                <li>
                    <strong>Sona College of Technology</strong> – B.E. Computer Science
                    (Aug 2019 – May 2023)
                </li>
            </ul>
        </div>
        <div class="bento-card wide-card certifications-card">
            <h3>Certifications</h3>
            <ul>
                <li>
                    DesignBoat UI/UX School – Intensified UI/UX Design Course
                    (Dec 2023)
                </li>
                <li>Google UX Design (Jun 2025)</li>
            </ul>
        </div>
        <div class="bento-card wide-card experience-card">
            <h3>Professional Experience</h3>
            <ul>
                <li>
                    <strong>Associate Software Engineer, Accenture</strong> (Feb
                    2024 – Present) – UX research, wireframes, high‑fidelity prototypes.
                </li>
                <li>
                    <strong>Freelance Designer</strong> (Dec 2023 – Present) – End‑to‑end
                    UX/UI for startups.
                </li>
            </ul>
        </div>
        <div class="bento-card wide-card projects-card">
            <h3>Projects</h3>
            <ul>
                <li>
                    Thriftz – Luxury Pre‑owned Store (Aug 2024) – Full product
                    design across iOS, Android, Web.
                </li>
                <li>Additional projects detailed in Resume.</li>
            </ul>
        </div>
    </div>
</section>

<style>
    .section-container {
        padding: 2rem;
        color: var(--text-color);
        background: var(--bg-color);
        min-height: 100%;
        transition:
            background 0.3s,
            color 0.3s;
    }

    .section-header {
        margin-bottom: 2rem;
        text-align: center;
    }

    .section-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        background: linear-gradient(
            135deg,
            var(--accent-color) 0%,
            #00c6ff 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .section-desc {
        font-size: 1.2rem;
        color: var(--text-secondary);
    }

    .bento-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 300px);
        gap: 1.5rem;
    }

    .bento-card {
        background: var(--card-bg);
        border-radius: 24px;
        padding: 2rem;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
        transition:
            transform 0.2s,
            box-shadow 0.2s;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border: 1px solid var(--border-color);
    }

    .bento-card:hover {
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
        transform: translateY(-5px);
    }

    .large-card {
        grid-column: span 2;
    }

    .medium-card {
        grid-column: span 1;
        align-items: center;
        text-align: center;
    }

    .wide-card {
        grid-column: span 3;
    }

    /* Profile Card Specifics */
    .profile-card h3 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
        color: var(--text-color);
    }

    .profile-card p {
        font-size: 1.1rem;
        line-height: 1.6;
        color: var(--text-secondary);
    }

    /* Leadership Card Specifics */
    .leadership-card h3 {
        font-size: 1.2rem;
        margin: 0.5rem 0;
        color: var(--text-color);
    }

    .leadership-card p {
        color: var(--text-secondary);
    }

    .icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    /* Skills Card Specifics */
    .skills-card h3 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        color: var(--text-color);
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
    }

    .tags span {
        background: var(--sidebar-bg);
        padding: 0.6rem 1.2rem;
        border-radius: 12px;
        font-size: 0.95rem;
        color: var(--text-color);
        border: 1px solid var(--border-color);
        transition: background 0.2s;
    }

    .tags span:hover {
        background: var(--accent-color);
        color: white;
        border-color: var(--accent-color);
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

        .section-title {
            font-size: 2rem;
        }
    }
</style>
