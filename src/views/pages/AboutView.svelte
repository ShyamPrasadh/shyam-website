<script>
    import { flip } from "svelte/animate";
    import { fade } from "svelte/transition";

    let cards = [
        {
            id: 1,
            type: "profile",
            size: "large",
            title: "The Strategist",
            content:
                "I don't just design screens; I design systems. Bridging the gap between user empathy and business viability.",
            icon: "🎯",
        },
        {
            id: 2,
            type: "trait",
            size: "medium",
            title: "Ambiguity Navigator",
            content:
                "Thriving in the unknown. I turn messy problems into clear, actionable roadmaps.",
            icon: "🧭",
        },
        {
            id: 3,
            type: "trait",
            size: "medium",
            title: "The Empath",
            content:
                "Advocate for the user. I listen, observe, and translate human needs into digital solutions.",
            icon: "❤️",
        },
        {
            id: 4,
            type: "skills",
            size: "wide",
            title: "The Toolkit",
            tags: [
                "Figma",
                "User Research",
                "Prototyping",
                "Design Systems",
                "Wireframing",
                "Usability Testing",
                "HTML/CSS/JS",
            ],
            icon: "🛠️",
        },
        {
            id: 5,
            type: "experience",
            size: "wide",
            title: "Professional Journey",
            items: [
                {
                    role: "UX Designer",
                    org: "Accenture",
                    date: "Feb 2024 – Present",
                    desc: "Enterprise UX, Stakeholder Collaboration & Design Systems",
                },
                {
                    role: "Product Designer",
                    org: "Aatral Engineering",
                    date: "Dec 2023 – Present",
                    desc: "Energy Monitoring Dashboard & Component Systems",
                },
            ],
            icon: "💼",
        },
        {
            id: 6,
            type: "education",
            size: "medium",
            title: "Education",
            content: "B.E. Computer Science\nSona College of Technology",
            sub: "2019 - 2023",
            icon: "🎓",
        },
        {
            id: 7,
            type: "certification",
            size: "medium",
            title: "Certified",
            content: "DesignBoat UI/UX School\nIntensified Course",
            sub: "2023",
            icon: "📜",
        },
        {
            id: 8,
            type: "hobby",
            size: "wide",
            title: "Beyond Design",
            content:
                "When I'm not pushing pixels, I'm likely exploring photography, gaming, or deconstructing the UX of everyday objects.",
            icon: "🎮",
        },
    ];

    let hoveringIndex = null;

    function handleDragStart(event, index) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.setData("text/plain", index);
        hoveringIndex = index;
    }

    function handleDragOver(event, index) {
        event.preventDefault();
        hoveringIndex = index;
    }

    function handleDrop(event, targetIndex) {
        event.preventDefault();
        const sourceIndex = parseInt(event.dataTransfer.getData("text/plain"));

        if (sourceIndex === targetIndex) return;

        const newCards = [...cards];
        const [movedCard] = newCards.splice(sourceIndex, 1);
        newCards.splice(targetIndex, 0, movedCard);

        cards = newCards;
        hoveringIndex = null;
    }

    function handleDragEnd() {
        hoveringIndex = null;
    }
</script>

<section id="about" class="section-container">
    <div class="section-header">
        <h2 class="section-title">
            <span class="gradient-text">About Me</span>
        </h2>
        <p class="section-desc">
            Drag & drop the boxes to explore my character.
        </p>
    </div>

    <div class="bento-grid">
        {#each cards as card, index (card.id)}
            <div
                class="bento-card {card.size}-card {hoveringIndex === index
                    ? 'hovering'
                    : ''}"
                draggable="true"
                role="listitem"
                on:dragstart={(e) => handleDragStart(e, index)}
                on:dragover={(e) => handleDragOver(e, index)}
                on:drop={(e) => handleDrop(e, index)}
                on:dragend={handleDragEnd}
                animate:flip={{ duration: 300 }}
                in:fade={{ duration: 300 }}
            >
                <div class="card-icon">{card.icon}</div>
                <div class="card-content">
                    <h3>{card.title}</h3>

                    {#if card.type === "skills"}
                        <div class="tags">
                            {#each card.tags as tag}
                                <span>{tag}</span>
                            {/each}
                        </div>
                    {:else if card.type === "experience"}
                        <ul class="experience-list">
                            {#each card.items as item}
                                <li>
                                    <strong>{item.role}</strong>
                                    <span class="org">{item.org}</span>
                                    <span class="date">{item.date}</span>
                                </li>
                            {/each}
                        </ul>
                    {:else}
                        <p class="text-content">{card.content}</p>
                        {#if card.sub}
                            <p class="sub-text">{card.sub}</p>
                        {/if}
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</section>

<style>
    .section-container {
        padding: 2rem;
        color: var(--text-color);
        background: var(--bg-color);
        height: 100%;
        overflow-y: auto;
        /* Hide scrollbar for cleaner look */
        scrollbar-width: none;
    }
    .section-container::-webkit-scrollbar {
        display: none;
    }

    .section-header {
        margin-bottom: 2rem;
        text-align: center;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
    }

    /* .section-title is now global in app.css */

    .section-desc {
        font-size: 1.1rem;
        color: var(--text-secondary);
        opacity: 0.8;
    }

    .bento-grid {
        display: grid;
        grid-template-columns: repeat(1, 1fr); /* Mobile default */
        gap: 1.5rem;
        max-width: 1400px; /* Wider max-width for "full screen" feel */
        margin: 0 auto;
        padding-bottom: 4rem;
        grid-auto-flow: dense; /* Fills gaps automatically */
    }

    /* Desktop Grid Layout - 4 Columns for better mixing */
    @media (min-width: 1024px) {
        .bento-grid {
            grid-template-columns: repeat(4, 1fr);
            /* Use minmax for rows to allow expansion if content is too long */
            grid-auto-rows: minmax(280px, auto);
        }

        /* Spans */
        .large-card {
            grid-column: span 2;
            grid-row: span 1;
        }
        .wide-card {
            grid-column: span 2;
            grid-row: span 1;
        } /* Changed to 2 to fit side-by-side */
        .medium-card {
            grid-column: span 1;
            grid-row: span 1;
        }
        .tall-card {
            grid-column: span 1;
            grid-row: span 2;
        }

        /* Specific overrides for visual balance if needed */
        .experience-card {
            grid-column: span 2;
            grid-row: span 2;
        } /* Make experience prominent */
        .skills-card {
            grid-column: span 2;
        }
    }

    .bento-card {
        background: var(--card-bg);
        border-radius: 28px; /* Softer corners */
        padding: 2rem;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
        border: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Align to top to prevent weird spacing */
        cursor: grab;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        position: relative;
        overflow: hidden; /* Keep content inside */
    }

    .bento-card:active {
        cursor: grabbing;
        transform: scale(0.98);
    }

    .bento-card.hovering {
        border: 2px dashed var(--accent-color);
        background: rgba(var(--accent-rgb), 0.05);
    }

    .bento-card:hover {
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        transform: translateY(-4px);
        z-index: 10;
        border-color: var(--accent-color);
    }

    .card-icon {
        font-size: 2.5rem;
        margin-bottom: 1.5rem; /* More space below icon */
        background: var(--sidebar-bg);
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        flex-shrink: 0; /* Prevent icon from shrinking */
    }

    .card-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0; /* Prevent flex child overflow */
    }

    .card-content h3 {
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: var(--text-color);
        letter-spacing: -0.01em;
        line-height: 1.2;
    }

    .text-content {
        font-size: 1.05rem;
        line-height: 1.6;
        color: var(--text-secondary);
        white-space: normal; /* Allow text to wrap naturally */
    }

    .sub-text {
        font-size: 0.9rem;
        color: var(--text-secondary);
        opacity: 0.7;
        margin-top: auto; /* Push to bottom */
        padding-top: 1rem;
    }

    /* Tags for Skills */
    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
    }

    .tags span {
        background: var(--sidebar-bg);
        padding: 0.5rem 1rem;
        border-radius: 10px;
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--text-color);
        border: 1px solid var(--border-color);
        transition: all 0.2s;
        white-space: nowrap; /* Keep tags on one line if possible */
    }

    .tags span:hover {
        background: var(--accent-color);
        color: white;
        border-color: var(--accent-color);
        transform: translateY(-2px);
    }

    /* Experience List */
    .experience-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .experience-list li {
        display: flex;
        flex-direction: column;
        padding-left: 1rem;
        border-left: 2px solid var(--border-color);
    }

    .experience-list strong {
        color: var(--text-color);
        font-size: 1.1rem;
        margin-bottom: 0.2rem;
    }

    .experience-list .org {
        color: var(--accent-color);
        font-weight: 600;
        font-size: 0.95rem;
        margin-bottom: 0.2rem;
    }

    .experience-list .date {
        font-size: 0.85rem;
        color: var(--text-secondary);
        opacity: 0.8;
    }

    /* Mobile Responsive */
    @media (max-width: 1023px) {
        .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: auto;
        }

        .large-card,
        .wide-card,
        .experience-card {
            grid-column: span 2;
        }
    }

    @media (max-width: 600px) {
        .bento-grid {
            grid-template-columns: 1fr;
        }

        .large-card,
        .wide-card,
        .medium-card,
        .tall-card,
        .experience-card {
            grid-column: span 1;
        }

        .section-title {
            font-size: 2.2rem;
        }
    }
</style>
