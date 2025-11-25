<script>
    import { draggable } from "../../lib/actions/draggable";

    // Using emojis for now, could be replaced with images
    const skills = [
        { icon: "🔍", label: "Research", color: "#FF375F" },
        { icon: "🎨", label: "Design", color: "#0A84FF" },
        { icon: "🧠", label: "Strategy", color: "#BF5AF2" },
        { icon: "🗣️", label: "People", color: "#30D158" },
        { icon: "⚡", label: "Leadership", color: "#FF9F0A" },
    ];
</script>

<div class="widget-container" use:draggable={{ handle: ".memoji-center" }}>
    <div class="orbit-system">
        <!-- Central Memoji -->
        <div class="memoji-center">
            <span class="memoji">👨‍💻</span>
            <div class="pulse"></div>
        </div>

        <!-- Orbiting Skills -->
        <div class="orbit-ring">
            {#each skills as skill, i}
                <div
                    class="orbit-item"
                    style="--angle: {i *
                        (360 / skills.length)}deg; --color: {skill.color}"
                >
                    <div class="skill-icon" style="background: {skill.color}">
                        {skill.icon}
                    </div>
                    <span class="skill-label">{skill.label}</span>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .widget-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 20; /* Above icons, below windows */
    }

    .orbit-system {
        position: relative;
        width: 300px;
        height: 300px;
    }

    /* Central Memoji */
    .memoji-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        z-index: 2;
        cursor: grab;
    }

    .memoji-center:active {
        cursor: grabbing;
    }

    .pulse {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.5);
        animation: pulse 2s infinite;
        pointer-events: none;
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(1.5);
            opacity: 0;
        }
    }

    /* Orbit Ring */
    .orbit-ring {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        animation: rotate 20s linear infinite;
    }

    .widget-container:hover .orbit-ring {
        animation-play-state: paused;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    /* Orbit Items */
    .orbit-item {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 60px;
        height: 60px;
        margin-left: -30px;
        margin-top: -30px;
        transform: rotate(var(--angle)) translate(140px)
            rotate(calc(-1 * var(--angle))); /* Counter-rotate to keep upright */
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        transition: transform 0.3s;
    }

    .skill-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: white;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        transition: transform 0.2s;
    }

    .orbit-item:hover .skill-icon {
        transform: scale(1.2);
    }

    .skill-label {
        font-size: 12px;
        font-weight: 600;
        color: #1d1d1f;
        background: rgba(255, 255, 255, 0.8);
        padding: 2px 6px;
        border-radius: 10px;
        opacity: 0;
        transition: opacity 0.2s;
    }

    .orbit-item:hover .skill-label {
        opacity: 1;
    }

    /* Mobile Responsive Styles */
    @media (max-width: 768px) {
        .widget-container {
            display: none; /* Hide widget on mobile */
        }
    }

    /* Tablet - smaller widget */
    @media (min-width: 769px) and (max-width: 1023px) {
        .widget-container {
            width: 300px;
            height: 300px;
        }

        .orbit-system {
            width: 200px;
            height: 200px;
        }

        .memoji-center {
            width: 70px;
            height: 70px;
            font-size: 35px;
        }

        .orbit-item {
            transform: rotate(var(--angle)) translate(100px)
                rotate(calc(-1 * var(--angle)));
        }

        .skill-icon {
            width: 40px;
            height: 40px;
            font-size: 20px;
        }
    }
</style>
