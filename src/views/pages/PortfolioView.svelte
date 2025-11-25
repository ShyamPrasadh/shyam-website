<section id="portfolio" class="section-container" style="padding: 2rem;">
    <div class="section-header">
        <h2 class="section-title">Work</h2>
    </div>
    <div class="portfolio-grid">
        <!-- Placeholder Projects -->
        <article class="project-card">
            <div
                class="project-image"
                style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/fs/5c8c0c213911073.60e6e5c9c5f5c.jpg'); background-size: cover; background-position: center;"
            ></div>
            <div class="project-info">
                <h3>Thriftz – UX Case Study</h3>
                <p>
                    Comprehensive UX research, strategy, and design for a
                    sustainable thrift marketplace.
                </p>
                <a
                    href="https://www.behance.net/gallery/213911073/UX-CASE-STUDY-THRIFTZ"
                    class="link-arrow"
                    target="_blank"
                    rel="noopener">View Project <span>→</span></a
                >
            </div>
        </article>
        <article class="project-card">
            <div
                class="project-image"
                style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/fs/5c8c0c218032031.60e6e5c9c5f5c.jpg'); background-size: cover; background-position: center;"
            ></div>
            <div class="project-info">
                <h3>Thriftz – Android Presentation</h3>
                <p>
                    High‑fidelity Android UI presentation showcasing the final
                    design system and interactions.
                </p>
                <a
                    href="https://www.behance.net/gallery/218032031/THRIFTZ-ANDROID-PRESENTATION"
                    class="link-arrow"
                    target="_blank"
                    rel="noopener">View Project <span>→</span></a
                >
            </div>
        </article>
    </div>
</section>

<style>
    .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    .project-card {
        background: var(--card-bg);
        border-radius: var(--border-radius);
        overflow: hidden;
        box-shadow: var(--shadow-sm);
        transition: var(--transition);
        cursor: pointer;
    }

    .project-card:hover {
        box-shadow: var(--shadow-lg);
        transform: scale(1.02);
    }

    .project-image {
        height: 250px;
        background-color: #eee;
        background-size: cover;
        background-position: center;
    }

    .project-info {
        padding: 2rem;
    }

    .link-arrow {
        display: inline-block;
        margin-top: 1rem;
        color: var(--accent-color);
        font-weight: 500;
    }

    .link-arrow span {
        transition: transform 0.2s;
        display: inline-block;
    }

    .project-card:hover .link-arrow span {
        transform: translateX(4px);
    }
</style>
