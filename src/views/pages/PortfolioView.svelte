<script>
    const thriftzUxImage = import.meta.env.BASE_URL + "images/thriftz-ux.jpg";
    const thriftzAndroidImage =
        import.meta.env.BASE_URL + "images/thriftz-android.jpg";
    const aatralImage = import.meta.env.BASE_URL + "images/aatral.jpg";
</script>

<section
    id="portfolio"
    class="section-container"
    style="padding: 2rem; padding-bottom: 40px;"
>
    <div class="section-header">
        <h2 class="section-title"><span class="gradient-text">Work</span></h2>
    </div>
    <div class="portfolio-grid">
        <!-- Thriftz – UX Case Study -->
        <a
            href="https://www.behance.net/gallery/213911073/UX-CASE-STUDY-THRIFTZ"
            class="project-card-link"
            target="_blank"
            rel="noopener"
        >
            <article class="project-card">
                <div
                    class="project-image"
                    style="background-image: url('{thriftzUxImage}');"
                ></div>
                <div class="overlay"></div>
                <div class="project-info">
                    <h3>Thriftz – UX Case Study</h3>
                    <p>
                        Comprehensive UX research, strategy, and design for a
                        sustainable thrift marketplace.
                    </p>
                    <span class="preview-label">Preview <span>→</span></span>
                </div>
            </article>
        </a>

        <!-- Thriftz – Android Presentation -->
        <a
            href="https://www.behance.net/gallery/218032031/THRIFTZ-ANDROID-PRESENTATION"
            class="project-card-link"
            target="_blank"
            rel="noopener"
        >
            <article class="project-card">
                <div
                    class="project-image"
                    style="background-image: url('{thriftzAndroidImage}');"
                ></div>
                <div class="overlay"></div>
                <div class="project-info">
                    <h3>Thriftz – Android Presentation</h3>
                    <p>
                        High‑fidelity Android UI presentation showcasing the
                        final design system and interactions.
                    </p>
                    <span class="preview-label">Preview <span>→</span></span>
                </div>
            </article>
        </a>

        <!-- Aatral – Energy Dashboard -->
        <a
            href="https://aatral-eta.vercel.app"
            class="project-card-link"
            target="_blank"
            rel="noopener"
        >
            <article class="project-card">
                <div
                    class="project-image"
                    style="background-image: url('{aatralImage}');"
                ></div>
                <div class="overlay"></div>
                <div class="project-info">
                    <h3>Aatral – Energy Dashboard</h3>
                    <p>
                        Real-time energy monitoring dashboard for smart
                        buildings with CO2 tracking and power usage analytics.
                    </p>
                    <span class="preview-label">Preview <span>→</span></span>
                </div>
            </article>
        </a>
    </div>
</section>

<style>
    .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        align-items: stretch; /* Ensures all grid items stretch to same height */
    }

    .project-card-link {
        text-decoration: none;
        color: inherit;
        display: block;
        height: 100%; /* Makes link take full height of grid cell */
    }

    .project-card {
        background: var(--card-bg);
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--shadow-sm);
        transition: var(--transition);
        cursor: pointer;
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%; /* Ensures card fills the link container */
        min-height: 460px; /* Fixed minimum height for consistency */
    }

    .project-card:hover {
        box-shadow: var(--shadow-lg);
        transform: scale(1.02);
    }

    .project-image {
        height: 250px;
        flex-shrink: 0; /* Prevents image from shrinking */
        background-color: #eee;
        background-size: cover;
        background-position: center;
    }

    .overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.2);
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
    }

    .project-card:hover .overlay {
        opacity: 1;
    }

    .project-info {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1; /* Takes remaining space */
        min-height: 210px; /* Fixed minimum height for text content */
    }

    .project-info h3 {
        margin: 0 0 0.75rem 0;
        line-height: 1.4;
    }

    .project-info p {
        margin: 0;
        flex-grow: 1; /* Pushes preview label to bottom */
        line-height: 1.6;
    }

    .preview-label {
        display: inline-block;
        margin-top: 1rem;
        color: var(--accent-color);
        font-weight: 500;
    }

    .preview-label span {
        transition: transform 0.2s;
        display: inline-block;
    }

    .project-card:hover .preview-label span {
        transform: translateX(4px);
    }
</style>
