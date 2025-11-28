<script>
    import { fly, fade } from "svelte/transition";
    import { spring } from "svelte/motion";
    import { onMount } from "svelte";

    let mounted = false;
    let visibleItems = [];

    onMount(() => {
        mounted = true;
        // Trigger animations sequentially
        const timer = setInterval(() => {
            if (visibleItems.length < journeyItems.length) {
                visibleItems = [...visibleItems, visibleItems.length];
            } else {
                clearInterval(timer);
            }
        }, 200);

        return () => clearInterval(timer);
    });

    const journeyItems = [
        {
            id: 1,
            type: "work",
            role: "UX Designer",
            org: "Accenture",
            location: "Bengaluru",
            date: "Feb 2024 - Present",
            desc: "Leading enterprise UX initiatives, collaborating with stakeholders, and building scalable design systems.",
            tags: ["Figma", "Design Systems", "Enterprise UX"],
            icon: "briefcase",
            color: "blue",
        },
        {
            id: 2,
            type: "work",
            role: "Product Designer",
            org: "Aatral Engineering",
            location: "Remote",
            date: "Dec 2023 - Present",
            desc: "Designed an end-to-end energy monitoring dashboard. Simplified complex data into intuitive visualizations.",
            tags: ["Dashboard", "Data Viz", "Prototyping"],
            icon: "pen-tool",
            color: "purple",
        },
        {
            id: 3,
            type: "education",
            role: "Intensified UI/UX",
            org: "DesignBoat School",
            location: "Bengaluru",
            date: "June 2023 - Nov 2023",
            desc: "Mastered the end-to-end design process: Research, IA, Wireframing, and Visual Design.",
            tags: ["User Research", "IA", "UI Design"],
            icon: "book",
            color: "orange",
        },
        {
            id: 4,
            type: "leadership",
            role: "Student Chair",
            org: "Dept of CSE",
            location: "Sona College",
            date: "2022 - 2023",
            desc: "Led a 100-member team to organize a national symposium with 1,000+ participants.",
            tags: ["Leadership", "Management", "Event"],
            icon: "users",
            color: "green",
        },
        {
            id: 5,
            type: "education",
            role: "B.E. Computer Science",
            org: "Sona College",
            location: "Salem",
            date: "2019 - 2023",
            desc: "Graduated with a focus on software engineering fundamentals and leadership.",
            tags: ["Engineering", "Development"],
            icon: "graduation-cap",
            color: "gray",
        },
    ];

    function getIcon(name) {
        const icons = {
            briefcase: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
            "pen-tool": `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>`,
            book: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
            users: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
            "graduation-cap": `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 0 6-1 6-1v-7"></path><rect x="18" y="10" width="4" height="8"></rect></svg>`,
        };
        return icons[name] || "";
    }

    // 3D Tilt Action
    function tilt(node, { max = 10, scale = 1.05, glare = true } = {}) {
        // Check if mobile/touch device
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (isMobile) return; // Disable tilt on mobile

        const content = node.querySelector(".card-content-wrapper");
        const glareEl = node.querySelector(".glare");

        function transform(x, y) {
            const rect = node.getBoundingClientRect();
            const calcX =
                (-(y - rect.y - rect.height / 2) / (rect.height / 2)) * max;
            const calcY =
                ((x - rect.x - rect.width / 2) / (rect.width / 2)) * max;

            if (content) {
                content.style.transform = `rotateX(${calcX}deg) rotateY(${calcY}deg) scale(${scale})`;
            }

            if (glareEl) {
                const percentageX = ((x - rect.x) / rect.width) * 100;
                const percentageY = ((y - rect.y) / rect.height) * 100;
                glareEl.style.background = `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;
                glareEl.style.opacity = "1";
            }
        }

        function reset() {
            if (content) {
                content.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
            }
            if (glareEl) {
                glareEl.style.opacity = "0";
            }
        }

        function onMouseMove(e) {
            window.requestAnimationFrame(() => transform(e.clientX, e.clientY));
        }

        node.addEventListener("mousemove", onMouseMove);
        node.addEventListener("mouseleave", reset);

        return {
            destroy() {
                node.removeEventListener("mousemove", onMouseMove);
                node.removeEventListener("mouseleave", reset);
            },
        };
    }
</script>

<section id="journey" class="ios-journey">
    <div class="header">
        <h2 class="title" in:fade={{ duration: 800 }}>Journey</h2>
        <p class="subtitle" in:fade={{ duration: 800, delay: 200 }}>
            A timeline of growth & impact
        </p>
    </div>

    <div class="timeline-container">
        <!-- Central Line with gradient animation -->
        <div class="line-container">
            <div class="line-bg"></div>
            <div
                class="line-fill"
                style="height: {visibleItems.length * 20}%"
            ></div>
        </div>

        {#each journeyItems as item, i (item.id)}
            {#if visibleItems.includes(i)}
                <div
                    class="journey-card-wrapper {i % 2 === 0
                        ? 'left'
                        : 'right'}"
                    in:fly={{ y: 50, duration: 800, delay: 0 }}
                >
                    <!-- Dot on the line -->
                    <div class="timeline-dot-wrapper">
                        <div class="timeline-dot {item.color}">
                            <div class="dot-pulse"></div>
                        </div>
                    </div>

                    <!-- The 3D Card -->
                    <div
                        class="card-perspective"
                        use:tilt={{ max: 8, scale: 1.02 }}
                    >
                        <div
                            class="ios-card {item.color}-theme card-content-wrapper"
                        >
                            <div class="glare"></div>

                            <div class="card-header">
                                <div class="icon-box {item.color}">
                                    {@html getIcon(item.icon)}
                                </div>
                                <div class="header-text">
                                    <h3>{item.role}</h3>
                                    <span class="org">{item.org}</span>
                                </div>
                                <span class="date-badge">{item.date}</span>
                            </div>

                            <div class="card-body">
                                <p>{item.desc}</p>
                            </div>

                            {#if item.tags}
                                <div class="card-footer">
                                    {#each item.tags as tag}
                                        <span class="tag">{tag}</span>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
</section>

<style>
    .ios-journey {
        padding: 40px 20px;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden; /* Prevent horizontal scroll from tilt */
        color: #1d1d1f;
        background: transparent;
        scrollbar-width: none;
        perspective: 1000px;
    }
    .ios-journey::-webkit-scrollbar {
        display: none;
    }

    .header {
        text-align: center;
        margin-bottom: 60px;
        position: relative;
        z-index: 10;
    }

    .title {
        font-size: 48px;
        font-weight: 800;
        letter-spacing: -0.03em;
        margin-bottom: 8px;
        background: linear-gradient(135deg, #1d1d1f 0%, #434343 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .subtitle {
        font-size: 18px;
        color: #86868b;
        font-weight: 500;
    }

    .timeline-container {
        max-width: 900px;
        margin: 0 auto;
        position: relative;
        padding-bottom: 100px;
    }

    /* Central Line */
    .line-container {
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 4px;
        transform: translateX(-50%);
        z-index: 0;
    }

    .line-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 4px;
    }

    .line-fill {
        position: absolute;
        top: 0;
        width: 100%;
        background: linear-gradient(to bottom, #007aff, #af52de, #ff9500);
        border-radius: 4px;
        transition: height 1s ease-out;
        box-shadow: 0 0 15px rgba(0, 122, 255, 0.3);
    }

    .journey-card-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-bottom: 60px;
        width: 100%;
        z-index: 1;
    }

    /* Dot Styles */
    .timeline-dot-wrapper {
        position: absolute;
        left: 50%;
        top: 30px;
        transform: translateX(-50%);
        z-index: 2;
    }

    .timeline-dot {
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        box-shadow:
            0 0 0 4px rgba(255, 255, 255, 0.5),
            0 4px 10px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .dot-pulse {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: currentColor;
        animation: pulse 2s infinite;
    }

    .timeline-dot.blue {
        color: #007aff;
    }
    .timeline-dot.purple {
        color: #af52de;
    }
    .timeline-dot.orange {
        color: #ff9500;
    }
    .timeline-dot.green {
        color: #34c759;
    }
    .timeline-dot.gray {
        color: #8e8e93;
    }

    @keyframes pulse {
        0% {
            transform: scale(0.8);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }

    /* 3D Perspective Wrapper */
    .card-perspective {
        width: 45%;
        perspective: 1000px;
        transform-style: preserve-3d;
    }

    .left .card-perspective {
        margin-right: auto;
    }

    .right .card-perspective {
        margin-left: auto;
    }

    /* Card Styling */
    .ios-card {
        background: rgba(255, 255, 255, 0.65);
        backdrop-filter: blur(25px) saturate(180%);
        -webkit-backdrop-filter: blur(25px) saturate(180%);
        border-radius: 24px;
        padding: 24px;
        box-shadow:
            0 10px 40px -10px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.5) inset;
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: transform 0.1s ease-out; /* Fast response for tilt */
        position: relative;
        overflow: hidden;
        transform-style: preserve-3d;
    }

    /* Glare Effect */
    .glare {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 24px;
        z-index: 10;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
        mix-blend-mode: overlay;
    }

    /* Card Content */
    .card-header {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        margin-bottom: 16px;
        position: relative;
        z-index: 2;
        transform: translateZ(20px); /* Parallax depth */
    }

    .icon-box {
        width: 48px;
        height: 48px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: white;
        box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.2);
    }

    .icon-box.blue {
        background: linear-gradient(135deg, #007aff, #00c6ff);
    }
    .icon-box.purple {
        background: linear-gradient(135deg, #af52de, #ff2d55);
    }
    .icon-box.orange {
        background: linear-gradient(135deg, #ff9500, #ffcc00);
    }
    .icon-box.green {
        background: linear-gradient(135deg, #34c759, #30d158);
    }
    .icon-box.gray {
        background: linear-gradient(135deg, #8e8e93, #c7c7cc);
    }

    .header-text {
        flex: 1;
    }

    .header-text h3 {
        font-size: 19px;
        font-weight: 700;
        margin: 0 0 2px 0;
        color: #1d1d1f;
        letter-spacing: -0.01em;
    }

    .header-text .org {
        font-size: 15px;
        color: #86868b;
        font-weight: 500;
    }

    .date-badge {
        font-size: 12px;
        font-weight: 600;
        background: rgba(0, 0, 0, 0.04);
        padding: 6px 12px;
        border-radius: 100px;
        color: #6e6e73;
        white-space: nowrap;
        border: 1px solid rgba(0, 0, 0, 0.02);
    }

    .card-body {
        transform: translateZ(10px);
        margin-bottom: 16px;
    }

    .card-body p {
        font-size: 15px;
        line-height: 1.6;
        color: #424245;
        margin: 0;
    }

    .card-footer {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        transform: translateZ(15px);
    }

    .tag {
        font-size: 12px;
        font-weight: 600;
        color: #1d1d1f;
        background: rgba(255, 255, 255, 0.5);
        padding: 4px 10px;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.05);
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
        .ios-journey {
            padding: 20px 16px;
        }

        .header {
            margin-bottom: 40px;
        }

        .title {
            font-size: 32px;
        }

        .line-container {
            left: 20px;
            transform: none;
        }

        .timeline-dot-wrapper {
            left: 20px;
            transform: translateX(-50%);
        }

        .journey-card-wrapper {
            justify-content: flex-end;
            margin-bottom: 40px;
        }

        .card-perspective {
            width: calc(100% - 50px);
            margin-left: 50px !important;
            margin-right: 0 !important;
        }

        .ios-card {
            padding: 20px;
            /* Reset 3D transforms for mobile */
            transform: none !important;
        }

        .card-header {
            flex-direction: column;
            gap: 12px;
            transform: none !important;
        }

        .icon-box {
            width: 40px;
            height: 40px;
        }

        .date-badge {
            align-self: flex-start;
        }

        .card-body,
        .card-footer {
            transform: none !important;
        }
    }
</style>
