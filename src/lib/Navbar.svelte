<script>
    // Script logic if needed (e.g. mobile menu toggle)
</script>

<nav class="navbar">
    <div class="nav-content">
        <a href="/" class="logo">Shyam.</a>
        <div class="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#portfolio">Work</a>
            <a href="#contact" class="cta-button">Contact</a>
        </div>
    </div>
</nav>

<style>
    /* Styles are global in app.css for now to maintain consistency */
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: var(--nav-height);
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        z-index: 1000;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nav-content {
        width: 90%;
        max-width: 1200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        font-weight: 600;
        font-size: 1.2rem;
        color: var(--text-primary);
    }

    .nav-links {
        display: flex;
        gap: 2rem;
        align-items: center;
    }

    .nav-links a {
        font-size: 0.8rem;
        color: var(--text-primary);
        opacity: 0.8;
        transition: opacity 0.2s;
    }

    .nav-links a:hover {
        opacity: 1;
    }

    .cta-button {
        background: var(--text-primary);
        color: white !important;
        padding: 0.4rem 1rem;
        border-radius: 980px;
        opacity: 1 !important;
    }
</style>
