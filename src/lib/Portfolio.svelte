<section id="portfolio" class="section-container" style="padding: 2rem;">
    <div class="section-header">
        <h2 class="section-title">Selected Work</h2>
    </div>
    <div class="portfolio-grid">
        <!-- Placeholder Projects -->
        <article class="project-card">
            <div class="project-image placeholder-image"></div>
            <div class="project-info">
                <h3>Case Study 1</h3>
                <p>UX Research & Strategy</p>
                <a href="/" class="link-arrow">View Project <span>→</span></a>
            </div>
        </article>
        <article class="project-card">
            <div class="project-image placeholder-image"></div>
            <div class="project-info">
                <h3>Case Study 2</h3>
                <p>Mobile App Design</p>
                <a href="/" class="link-arrow">View Project <span>→</span></a>
            </div>
        </article>
        <article class="project-card">
            <div class="project-image placeholder-image"></div>
            <div class="project-info">
                <h3>Case Study 3</h3>
                <p>Web Redesign</p>
                <a href="/" class="link-arrow">View Project <span>→</span></a>
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

    .placeholder-image {
        background: linear-gradient(
            45deg,
            #f3f3f3 25%,
            #e6e6e6 25%,
            #e6e6e6 50%,
            #f3f3f3 50%,
            #f3f3f3 75%,
            #e6e6e6 75%,
            #e6e6e6 100%
        );
        background-size: 20px 20px;
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
