<footer>
    <div class="footer-content">
        <p>&copy; 2024 Shyam Prasadh. Crafted with care.</p>
        <div class="social-links">
            <a href="/">LinkedIn</a>
            <a href="/">Behance</a>
            <a href="/">Twitter</a>
        </div>
    </div>
</footer>

<style>
    footer {
        padding: 2rem;
        text-align: center;
        border-top: 1px solid rgba(0, 0, 0, 0.05);
    }

    .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

    .social-links {
        display: flex;
        gap: 1.5rem;
    }

    @media (max-width: 768px) {
        .footer-content {
            flex-direction: column;
            gap: 1rem;
        }
    }
</style>
