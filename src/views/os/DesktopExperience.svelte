<script>
    import {
        skills,
        achievements,
        desktopNotes,
        systemLogs,
        socialLinks,
        workAvailability,
        featuredProject,
        currentTrack,
        weatherData,
        creativeStats,
    } from "../../models/AppData";
    import { fade, fly, scale } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { onMount, onDestroy } from "svelte";
    import { draggable } from "../../lib/actions/draggable";

    let visible = false;
    let contextMenu = { show: false, x: 0, y: 0 };
    let currentLogs = [];
    let currentTime = new Date();
    let timeInterval;
    let isPlaying = false;

    // Draggable state for widgets
    let widgetPositions = {
        achievements: { x: 0, y: 0 },
        terminal: { x: 0, y: 0 },
        weather: { x: 0, y: 0 },
        music: { x: 0, y: 0 },
        stats: { x: 0, y: 0 },
    };

    onMount(() => {
        setTimeout(() => {
            visible = true;
            startLogSimulation();
        }, 1000);

        timeInterval = setInterval(() => {
            currentTime = new Date();
        }, 1000);
    });

    onDestroy(() => {
        if (timeInterval) clearInterval(timeInterval);
    });

    function startLogSimulation() {
        let i = 0;
        const interval = setInterval(() => {
            if (i < systemLogs.length) {
                currentLogs = [...currentLogs, systemLogs[i]];
                i++;
            } else {
                clearInterval(interval);
            }
        }, 800);
    }

    function handleContextMenu(e) {
        e.preventDefault();
        contextMenu = { show: true, x: e.clientX, y: e.clientY };
    }

    function closeContextMenu() {
        contextMenu.show = false;
    }

    function togglePlay() {
        isPlaying = !isPlaying;
    }
</script>

<svelte:window on:click={closeContextMenu} />

{#if visible}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="desktop-experience"
        in:fade={{ duration: 1000 }}
        on:contextmenu={handleContextMenu}
    >
        <!-- RIGHT PANEL: ANALYTICS & STATUS -->
        <div class="side-panel right">
            <!-- Weather Widget -->
            <div
                class="widget weather-widget"
                use:draggable={{
                    onDrag: ({ dx, dy }) => {
                        widgetPositions.weather.x += dx;
                        widgetPositions.weather.y += dy;
                    },
                }}
                style="transform: translate({widgetPositions.weather
                    .x}px, {widgetPositions.weather.y}px)"
                in:fly={{ x: 50, duration: 1000, delay: 400 }}
            >
                <div class="weather-main">
                    <span class="weather-icon">{weatherData.icon}</span>
                    <div class="weather-temp">
                        <span class="temp">{weatherData.temp}</span>
                        <span class="city">{weatherData.location}</span>
                    </div>
                </div>
                <div class="weather-details">{weatherData.condition} Today</div>
            </div>

            <!-- Achievements Widget -->
            <div
                class="widget achievements-widget"
                use:draggable={{
                    onDrag: ({ dx, dy }) => {
                        widgetPositions.achievements.x += dx;
                        widgetPositions.achievements.y += dy;
                    },
                }}
                style="transform: translate({widgetPositions.achievements
                    .x}px, {widgetPositions.achievements.y}px)"
                in:fly={{ x: 50, duration: 1000, delay: 500 }}
            >
                <div class="widget-header">
                    <div class="header-icon-container">🏆</div>
                    <div class="header-text">
                        <h3>Achievements</h3>
                        <span class="status-badge">Professional</span>
                    </div>
                </div>
                <div class="achievements-list">
                    {#each achievements as achievement}
                        <div class="achievement-item">
                            <div class="dot active"></div>
                            <div class="info">
                                <span class="name">{achievement.title}</span>
                                <span class="sub"
                                    >{achievement.issuer ||
                                        achievement.category}</span
                                >
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Creative Stats Widget -->
            <div
                class="widget stats-widget"
                use:draggable={{
                    onDrag: ({ dx, dy }) => {
                        widgetPositions.stats.x += dx;
                        widgetPositions.stats.y += dy;
                    },
                }}
                style="transform: translate({widgetPositions.stats
                    .x}px, {widgetPositions.stats.y}px)"
                in:fly={{ x: 50, duration: 1000, delay: 600 }}
            >
                <div class="widget-header">
                    <div class="header-icon-container">📊</div>
                    <h3>System Load</h3>
                </div>
                <div class="stats-list">
                    {#each creativeStats as stat}
                        <div class="stat-item">
                            <div class="stat-info">
                                <span>{stat.label}</span>
                                <span>{stat.value}%</span>
                            </div>
                            <div class="stat-bar-bg">
                                <div
                                    class="stat-bar-fill"
                                    style="width: {stat.value}%; background: {stat.color}"
                                ></div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- System Log -->
            <div
                class="widget terminal-widget"
                use:draggable={{
                    onDrag: ({ dx, dy }) => {
                        widgetPositions.terminal.x += dx;
                        widgetPositions.terminal.y += dy;
                    },
                }}
                style="transform: translate({widgetPositions.terminal
                    .x}px, {widgetPositions.terminal.y}px)"
                in:fly={{ x: 50, duration: 1000, delay: 700 }}
            >
                <div class="terminal-header">
                    <div class="controls">
                        <span class="r"></span><span class="y"></span><span
                            class="g"
                        ></span>
                    </div>
                    <span class="title">kernel_activity.sh</span>
                </div>
                <div class="terminal-body">
                    {#each currentLogs as log}
                        <div class="log-line">
                            <span class="time">[{log.time}]</span>
                            {log.msg}
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <!-- LEFT PANEL: WORKSPACE -->
        <div class="side-panel left">
            <!-- Workspace Icons -->
            <div class="desktop-grid">
                {#each skills as skill, i}
                    <div
                        class="desktop-icon"
                        in:scale={{ delay: 400 + i * 50 }}
                        style="--float-delay: {i * 0.4}s"
                    >
                        <div class="icon-blob floating">
                            <img src={skill.icon} alt={skill.name} />
                        </div>
                        <span class="label">{skill.name}</span>
                    </div>
                {/each}

                <div class="desktop-icon trash" in:scale={{ delay: 1000 }}>
                    <div class="icon-blob">🗑️</div>
                    <span class="label">Trash</span>
                </div>
            </div>

            <!-- Music Player Widget -->
            <div
                class="widget music-widget"
                use:draggable={{
                    onDrag: ({ dx, dy }) => {
                        widgetPositions.music.x += dx;
                        widgetPositions.music.y += dy;
                    },
                }}
                style="transform: translate({widgetPositions.music
                    .x}px, {widgetPositions.music.y}px)"
                in:fly={{ y: 50, duration: 1000, delay: 1100 }}
            >
                <div class="music-player">
                    <div
                        class="album-art"
                        style="background-image: url({currentTrack.cover})"
                    >
                        {#if isPlaying}
                            <div class="music-wave">
                                <span></span><span></span><span></span>
                            </div>
                        {/if}
                    </div>
                    <div class="track-info">
                        <span class="title">{currentTrack.title}</span>
                        <span class="artist">{currentTrack.artist}</span>
                        <div class="progress-container">
                            <div
                                class="progress-bar"
                                style="width: {currentTrack.progress}%"
                            ></div>
                        </div>
                        <div class="playback-controls">
                            <button class="control-btn small">⏮</button>
                            <button
                                class="control-btn play"
                                on:click={togglePlay}
                                >{isPlaying ? "⏸" : "▶️"}</button
                            >
                            <button class="control-btn small">⏭</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Featured Card -->
            <div
                class="featured-card"
                in:fly={{ y: 50, duration: 1000, delay: 1300 }}
            >
                <div
                    class="card-image"
                    style="background-image: url({featuredProject.image})"
                >
                    <div class="tag">Next Big Thing</div>
                </div>
                <div class="card-content">
                    <h4>{featuredProject.title}</h4>
                    <div class="action-row">
                        <button class="btn primary">View Project</button>
                        <button class="btn secondary">Share</button>
                    </div>
                </div>
            </div>

            <!-- Availability & Status -->
            <div
                class="widget status-widget"
                in:fly={{ y: 50, duration: 1000, delay: 1500 }}
            >
                <div class="status-top">
                    <div class="live-dot pulse"></div>
                    <span class="status-text">{workAvailability.status}</span>
                </div>
                <div class="status-bottom">
                    <div class="status-cell">
                        <span class="cell-label">LOCAL TIME</span>
                        <span class="cell-value"
                            >{currentTime.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                            })}</span
                        >
                    </div>
                    <div class="status-cell">
                        <span class="cell-label">LOCATION</span>
                        <span class="cell-value"
                            >{workAvailability.location}</span
                        >
                    </div>
                </div>
            </div>

            <!-- Social Bar -->
            <div class="social-actions" in:fade={{ delay: 1800 }}>
                {#each socialLinks as link, i}
                    <a
                        href={link.url}
                        target="_blank"
                        class="social-btn"
                        in:scale={{ delay: 1900 + i * 100 }}
                    >
                        <img src={link.icon} alt={link.name} />
                    </a>
                {/each}
            </div>
        </div>

        <!-- CENTER: NOTES & SEARCH -->
        <div class="desktop-center">
            <div class="notes-layer">
                {#each desktopNotes as note, i}
                    <div
                        class="desktop-note"
                        style="--bg: {note.color}; --rot: {i % 2 === 0
                            ? '-4deg'
                            : '5deg'}"
                        in:fly={{ y: 100, delay: 2000 + i * 200 }}
                    >
                        <div class="tape"></div>
                        <h4>{note.title}</h4>
                        <p>{note.content}</p>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Right Click Menu -->
        {#if contextMenu.show}
            <div
                class="context-menu"
                style="top: {contextMenu.y}px; left: {contextMenu.x}px"
                transition:scale={{ duration: 150 }}
            >
                <div class="menu-group">
                    <button>Customize Desktop</button>
                    <button>Organize Widgets</button>
                </div>
                <div class="menu-divider"></div>
                <div class="menu-group">
                    <button>New Sticky Note</button>
                    <button>Clear Activity Log</button>
                </div>
                <div class="menu-divider"></div>
                <button class="hire-btn">Hire for Project</button>
            </div>
        {/if}
    </div>
{/if}

<style>
    .desktop-experience {
        position: absolute;
        top: 35px;
        left: 0;
        right: 0;
        bottom: 85px;
        pointer-events: none;
        display: flex;
        justify-content: space-between;
        padding: 30px;
        z-index: 5;
    }

    .side-panel {
        display: flex;
        flex-direction: column;
        gap: 20px;
        pointer-events: auto;
    }
    .side-panel.right {
        width: 280px;
        align-items: flex-end;
    }
    .side-panel.left {
        width: 400px;
    }

    /* Widget High-End Aesthetics */
    .widget {
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(30px);
        -webkit-backdrop-filter: blur(30px);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 22px;
        padding: 20px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        width: 100%;
        cursor: grab;
    }
    .widget:active {
        cursor: grabbing;
        z-index: 100;
    }

    /* Weather */
    .weather-widget {
        padding: 18px;
        width: 220px;
    }
    .weather-main {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 5px;
    }
    .weather-icon {
        font-size: 32px;
        filter: drop-shadow(0 0 10px rgba(255, 159, 10, 0.5));
    }
    .weather-temp {
        display: flex;
        flex-direction: column;
    }
    .temp {
        font-size: 24px;
        font-weight: 800;
        color: white;
    }
    .city {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.5);
        font-weight: 700;
        text-transform: uppercase;
    }
    .weather-details {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.7);
        font-weight: 600;
    }

    /* Achievements */
    .widget-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 18px;
    }
    .header-icon-container {
        width: 34px;
        height: 34px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .header-text h3 {
        margin: 0;
        font-size: 14px;
        font-weight: 700;
        color: white;
    }
    .status-badge {
        font-size: 8px;
        color: #0a84ff;
        text-transform: uppercase;
        font-weight: 800;
    }
    .achievements-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .achievement-item {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #0a84ff;
        box-shadow: 0 0 8px #0a84ff;
    }
    .info .name {
        display: block;
        font-size: 12px;
        font-weight: 600;
        color: white;
        line-height: 1.2;
    }
    .info .sub {
        font-size: 9px;
        color: rgba(255, 255, 255, 0.4);
    }

    /* Stats */
    .stats-widget {
        width: 240px;
    }
    .stats-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .stat-info {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        color: white;
        font-weight: 700;
        margin-bottom: 4px;
    }
    .stat-bar-bg {
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        overflow: hidden;
    }
    .stat-bar-fill {
        height: 100%;
        border-radius: 10px;
        transition: width 0.5s ease-out;
    }

    /* Terminal */
    .terminal-widget {
        background: rgba(0, 0, 0, 0.6);
        border-radius: 14px;
        padding: 12px;
        font-family: "JetBrains Mono", monospace;
        width: 280px;
    }
    .terminal-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
        padding-bottom: 6px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .controls {
        display: flex;
        gap: 4px;
    }
    .controls span {
        width: 7px;
        height: 7px;
        border-radius: 50%;
    }
    .r {
        background: #ff5f56;
    }
    .y {
        background: #ffbd2e;
    }
    .g {
        background: #27c93f;
    }
    .terminal-header .title {
        font-size: 9px;
        color: #666;
        font-weight: 700;
    }
    .terminal-body {
        font-size: 10px;
        color: #27c93f;
        line-height: 1.4;
        max-height: 100px;
        overflow: hidden;
    }
    .log-line .time {
        color: #555;
        margin-right: 5px;
    }

    /* Music Player */
    .music-widget {
        width: 320px;
        padding: 15px;
    }
    .music-player {
        display: flex;
        gap: 15px;
    }
    .album-art {
        width: 80px;
        height: 80px;
        border-radius: 12px;
        background-size: cover;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
        position: relative;
    }
    .music-wave {
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 2px;
    }
    .music-wave span {
        width: 3px;
        height: 10px;
        background: white;
        animation: wave 0.8s infinite;
    }
    .music-wave span:nth-child(2) {
        animation-delay: 0.2s;
    }
    .music-wave span:nth-child(3) {
        animation-delay: 0.4s;
    }
    @keyframes wave {
        0%,
        100% {
            height: 5px;
        }
        50% {
            height: 15px;
        }
    }
    .track-info {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    .track-info .title {
        color: white;
        font-weight: 700;
        font-size: 15px;
        margin-bottom: 2px;
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    }
    .track-info .artist {
        color: rgba(255, 255, 255, 0.5);
        font-size: 11px;
        font-weight: 600;
        margin-bottom: 10px;
    }
    .progress-container {
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        margin-bottom: 12px;
    }
    .progress-bar {
        height: 100%;
        background: white;
        border-radius: 2px;
    }
    .playback-controls {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    .control-btn {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        opacity: 0.7;
        transition: 0.2s;
    }
    .control-btn:hover {
        opacity: 1;
        transform: scale(1.1);
    }
    .control-btn.play {
        font-size: 20px;
    }

    /* Desktop Grid */
    .desktop-grid {
        display: grid;
        grid-template-columns: repeat(4, 80px);
        gap: 15px;
        margin-bottom: 30px;
    }
    .desktop-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: 0.2s;
        padding: 10px;
        border-radius: 12px;
    }
    .desktop-icon:hover {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
    }
    .icon-blob {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .desktop-icon:hover .icon-blob {
        transform: scale(1.1) translateY(-5px);
    }
    .icon-blob img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .floating {
        animation: float-icon 5s ease-in-out infinite;
        animation-delay: var(--float-delay);
    }
    @keyframes float-icon {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-8px);
        }
    }
    .label {
        color: white;
        font-size: 11px;
        font-weight: 600;
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
        text-align: center;
    }

    /* Status Bar */
    .status-widget {
        width: 280px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .status-top {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .live-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #30d158;
    }
    .pulse {
        animation: status-pulse 1.5s infinite;
    }
    @keyframes status-pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(48, 209, 88, 0.4);
        }
        70% {
            box-shadow: 0 0 0 12px rgba(48, 209, 88, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(48, 209, 88, 0);
        }
    }
    .status-text {
        color: white;
        font-weight: 700;
        font-size: 13px;
        letter-spacing: -0.2px;
    }
    .status-bottom {
        display: flex;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 12px;
    }
    .status-cell {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
    .cell-label {
        font-size: 8px;
        color: rgba(255, 255, 255, 0.4);
        font-weight: 800;
        text-transform: uppercase;
    }
    .cell-value {
        font-size: 12px;
        color: white;
        font-weight: 700;
        font-family: "JetBrains Mono", monospace;
    }

    /* Featured Project */
    .featured-card {
        width: 320px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(30px);
        margin-bottom: 20px;
    }
    .card-image {
        height: 120px;
        background-size: cover;
        background-position: center;
        padding: 15px;
    }
    .tag {
        background: #0a84ff;
        color: white;
        font-size: 9px;
        font-weight: 800;
        padding: 4px 10px;
        border-radius: 5px;
        display: inline-block;
        text-transform: uppercase;
    }
    .card-content {
        padding: 18px;
    }
    .card-content h4 {
        color: white;
        font-size: 16px;
        margin: 0 0 15px 0;
    }
    .action-row {
        display: flex;
        gap: 10px;
    }
    .btn {
        padding: 8px 15px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        border: none;
        transition: 0.2s;
    }
    .btn.primary {
        background: white;
        color: black;
    }
    .btn.secondary {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .btn:hover {
        transform: translateY(-2px);
        filter: brightness(1.1);
    }

    /* Sticky Notes Layer */
    .desktop-center {
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 0;
    }
    .notes-layer {
        display: flex;
        gap: 40px;
    }
    .desktop-note {
        width: 180px;
        height: 180px;
        background: var(--bg);
        padding: 25px;
        rotate: var(--rot);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        position: relative;
        transition: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        cursor: pointer;
    }
    .desktop-note:hover {
        rotate: 0deg;
        scale: 1.1;
        z-index: 50;
    }
    .tape {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        width: 45px;
        height: 22px;
        background: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(5px);
    }
    .desktop-note h4 {
        margin: 0 0 12px 0;
        font-size: 15px;
        color: #111;
        font-weight: 800;
        border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
        padding-bottom: 5px;
    }
    .desktop-note p {
        margin: 0;
        font-size: 12px;
        line-height: 1.5;
        color: #333;
        font-weight: 600;
    }

    /* Social Icons Box */
    .social-actions {
        display: flex;
        gap: 15px;
        background: rgba(255, 255, 255, 0.05);
        padding: 12px 25px;
        border-radius: 40px;
        width: fit-content;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .social-btn img {
        width: 22px;
        height: 22px;
        transition: 0.3s;
    }
    .social-btn:hover img {
        transform: translateY(-3px) scale(1.2);
        filter: drop-shadow(0 0 10px white);
    }

    /* Context Menu */
    .context-menu {
        position: fixed;
        width: 220px;
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 12px;
        padding: 7px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        z-index: 1000;
        pointer-events: auto;
    }
    .menu-group {
        display: flex;
        flex-direction: column;
    }
    .menu-group button {
        background: none;
        border: none;
        padding: 8px 12px;
        text-align: left;
        font-size: 13px;
        border-radius: 6px;
        cursor: pointer;
        transition: 0.2s;
    }
    .menu-group button:hover {
        background: #0a84ff;
        color: white;
    }
    .menu-divider {
        height: 1px;
        background: rgba(0, 0, 0, 0.1);
        margin: 6px 0;
    }
    .hire-btn {
        width: 100%;
        border: none;
        background: #0a84ff;
        color: white;
        padding: 10px;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
        margin-top: 5px;
    }

    @media (max-width: 1400px) {
        .notes-layer {
            display: none;
        }
        .desktop-center {
            display: none;
        }
    }
</style>
