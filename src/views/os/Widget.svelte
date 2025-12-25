<script>
    import { onMount, onDestroy } from "svelte";
    import { windowStore } from "../../lib/stores/windowStore";

    const base = import.meta.env.BASE_URL;

    // Speech bubble messages - friendly greetings
    const greetings = [
        "Hey there! 👋",
        "Hi! Welcome!",
        "Hello friend! ✨",
        "Nice to see you!",
        "Let's explore!",
    ];

    const messages = [
        "I'm Shyam, a UX Designer",
        "Click the dock to explore!",
        "Hover over me! 😊",
        "Try dragging me around!",
        "Turning ideas into products ✨",
        "Let's design something cool!",
    ];

    // Expressions
    const expressions = {
        default: "happy.png",
        waving: "hugging.png", // Arms out = waving feel
        left: "winking.png",
        right: "grinning.png",
        top: "star_eye.png",
        bottom: "thinking.png",
        hover: "lovely.png",
        victory: "victory.png",
        happy: "happy_winking.png",
        angry: "angry.png",
    };

    let currentExpression = expressions.waving;
    let currentMessage = greetings[0];
    let messageIndex = 0;
    let showBubble = true;
    let isWaving = true;
    let isAngry = false;
    let dragStartTime = 0;
    let isGettingHeadache = false;
    let angryTimeout;
    let headacheTimeout;

    // Position state
    let posX = 85; // Start on right side (percentage)
    let posY = 40;
    let targetX = 85;
    let targetY = 40;

    // Track if windows are open
    let hasActiveWindows = false;
    let unsubscribe;

    // Cursor tracking
    let tiltX = 0;
    let tiltY = 0;

    // Animation
    let animationFrame;
    let waveInterval;
    let messageInterval;
    let moveInterval;

    // Element reference
    let widgetElement;
    let isHovering = false;
    let isDragging = false;

    // Check if on mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Subscribe to window store to know when windows are open
    function checkWindows(state) {
        // On mobile, CSS handles positioning
        if (isMobile()) return;

        const visibleWindows = state.windows.filter((w) => !w.minimized);
        hasActiveWindows = visibleWindows.length > 0;

        if (hasActiveWindows) {
            // Position on the side when windows are open
            // Check if there's more space on left or right
            const windowData = visibleWindows[0];
            if (windowData) {
                const windowCenterX =
                    windowData.x + (windowData.width || 800) / 2;
                const screenCenter = window.innerWidth / 2;

                // Go to opposite side of the window
                if (windowCenterX < screenCenter) {
                    // Window is on left, go to right
                    targetX = 88;
                    targetY = 35;
                } else {
                    // Window is on right, go to left
                    targetX = 12;
                    targetY = 35;
                }
            }
        } else {
            // No windows - float freely in center-ish area
            pickNewTarget();
        }
    }

    function handleMouseMove(e) {
        if (!widgetElement || isDragging || isAngry) return;

        const clientX = e.type.includes("touch")
            ? e.touches[0].clientX
            : e.clientX;
        const clientY = e.type.includes("touch")
            ? e.touches[0].clientY
            : e.clientY;

        const rect = widgetElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;

        // Tilt effect (max 20 degrees)
        const maxTilt = 20;
        const maxDistance = isMobile() ? 200 : 500;

        tiltY = Math.min(
            Math.max((deltaX / maxDistance) * maxTilt, -maxTilt),
            maxTilt,
        );
        tiltX = Math.min(
            Math.max(-(deltaY / maxDistance) * maxTilt, -maxTilt),
            maxTilt,
        );

        // Change expression based on cursor direction (when not waving)
        if (!isHovering && !isWaving) {
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            if (angle > -45 && angle <= 45) {
                currentExpression = expressions.right;
            } else if (angle > 45 && angle <= 135) {
                currentExpression = expressions.bottom;
            } else if (angle > -135 && angle <= -45) {
                currentExpression = expressions.top;
            } else {
                currentExpression = expressions.left;
            }
        }
    }

    function handleClick() {
        if (isAngry) return;
        currentExpression = expressions.victory;
        currentMessage = "Yay! You clicked me! 🎉";
        showBubble = true;
        isWaving = false;

        setTimeout(() => {
            currentExpression = expressions.default;
            cycleMessage();
        }, 2000);
    }

    function handleMouseEnter() {
        if (isAngry) return;
        isHovering = true;
        isWaving = false;
        currentExpression = expressions.hover;
        currentMessage = "Hey you! 💖";
        showBubble = true;
    }

    function handleMouseLeave() {
        isHovering = false;
        currentExpression = expressions.default;
        tiltX = 0;
        tiltY = 0;
    }

    function cycleMessage() {
        if (isWaving) {
            messageIndex = (messageIndex + 1) % greetings.length;
            currentMessage = greetings[messageIndex];
        } else {
            messageIndex = (messageIndex + 1) % messages.length;
            currentMessage = messages[messageIndex];
        }
    }

    function doWave() {
        if (isAngry) return;
        // Wave animation - alternate expressions
        isWaving = true;
        currentExpression = expressions.waving;
        currentMessage =
            greetings[Math.floor(Math.random() * greetings.length)];
        showBubble = true;

        setTimeout(() => {
            if (!isHovering) {
                currentExpression = expressions.happy;
            }
        }, 800);

        setTimeout(() => {
            if (!isHovering) {
                currentExpression = expressions.waving;
            }
        }, 1200);

        setTimeout(() => {
            isWaving = false;
            if (!isHovering) {
                currentExpression = expressions.default;
            }
        }, 2000);
    }

    function pickNewTarget() {
        // On mobile, CSS handles positioning
        if (isMobile()) return;
        if (hasActiveWindows) return; // Don't random move when windows open

        // Random position within bounds
        targetX = 15 + Math.random() * 70;
        targetY = 20 + Math.random() * 45;
    }

    function animate() {
        // Smooth movement towards target
        if (!isDragging && !isAngry) {
            const dx = targetX - posX;
            const dy = targetY - posY;

            // Faster movement on mobile for better feel
            const speed = isMobile() ? 0.05 : 0.02;
            posX += dx * speed;
            posY += dy * speed;

            // Clamp position
            const margin = isMobile() ? 5 : 8;
            posX = Math.max(margin, Math.min(100 - margin, posX));
            posY = Math.max(margin, Math.min(100 - margin, posY));
        }

        animationFrame = requestAnimationFrame(animate);
    }

    // Drag functionality
    let dragStartX, dragStartY;

    function startDrag(e) {
        isDragging = true;
        const clientX = e.type.includes("touch")
            ? e.touches[0].clientX
            : e.clientX;
        const clientY = e.type.includes("touch")
            ? e.touches[0].clientY
            : e.clientY;
        dragStartX = clientX - (posX / 100) * window.innerWidth;
        dragStartY = clientY - (posY / 100) * window.innerHeight;
        dragStartTime = Date.now();

        if (angryTimeout) clearTimeout(angryTimeout);
        if (headacheTimeout) clearTimeout(headacheTimeout);

        // If we start dragging again while angry, reset the headache sequence
        if (isAngry) {
            isGettingHeadache = false;
            currentMessage = "STOP IT! 😤";
            currentExpression = expressions.angry;
        }

        // Hide bubble during drag until angry
        if (!isAngry) showBubble = false;
        window.addEventListener("mousemove", onDrag);
        window.addEventListener("mouseup", stopDrag);
        window.addEventListener("touchmove", onDrag);
        window.addEventListener("touchend", stopDrag);
    }

    function onDrag(e) {
        if (!isDragging) return;
        const clientX = e.type.includes("touch")
            ? e.touches[0].clientX
            : e.clientX;
        const clientY = e.type.includes("touch")
            ? e.touches[0].clientY
            : e.clientY;

        posX = ((clientX - dragStartX) / window.innerWidth) * 100;
        posY = ((clientY - dragStartY) / window.innerHeight) * 100;

        // Trigger angry after 4 seconds of dragging
        const elapsed = Date.now() - dragStartTime;
        if (elapsed > 4000 && !isAngry) {
            isAngry = true;
            isGettingHeadache = false;
            currentExpression = expressions.angry;
            currentMessage = "STOP IT! 😤";
            showBubble = true;
            isWaving = false;
            isHovering = false;
        }

        if (isAngry && !isGettingHeadache) {
            currentExpression = expressions.angry;
            currentMessage = "STOP IT! 😤";
            showBubble = true;
        }

        posX = Math.max(8, Math.min(92, posX));
        posY = Math.max(12, Math.min(70, posY));

        targetX = posX;
        targetY = posY;
    }

    function stopDrag() {
        isDragging = false;
        window.removeEventListener("mousemove", onDrag);
        window.removeEventListener("mouseup", stopDrag);
        window.removeEventListener("touchmove", onDrag);
        window.removeEventListener("touchend", stopDrag);

        if (isAngry) {
            // Sequence: STOP IT -> Headache -> Normal
            headacheTimeout = setTimeout(() => {
                isGettingHeadache = true;
                currentMessage = "I'm getting a headache... 😵‍💫";
                currentExpression = expressions.bottom; // Thinking/dizzy look

                angryTimeout = setTimeout(() => {
                    isAngry = false;
                    isGettingHeadache = false;
                    currentExpression = expressions.default;
                    showBubble = true;
                    if (!isHovering && !isWaving) {
                        cycleMessage();
                    }
                }, 4000);
            }, 2000);
        } else {
            // Normal release - show bubble again
            showBubble = true;
        }
    }

    onMount(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleMouseMove, {
            passive: true,
        });

        // Set initial mobile position
        if (isMobile()) {
            posX = 85;
            posY = 80;
            targetX = 85;
            targetY = 80;
        }
        unsubscribe = windowStore.subscribe(checkWindows);

        // Initial wave
        setTimeout(doWave, 1000);

        // Wave periodically (every 15 seconds)
        waveInterval = setInterval(() => {
            if (!isHovering && !isDragging && !isAngry) {
                doWave();
            }
        }, 15000);

        // Cycle messages every 5 seconds
        messageInterval = setInterval(() => {
            if (!isHovering && !isWaving && !isAngry) {
                cycleMessage();
            }
        }, 5000);

        // Pick new movement target every 10 seconds (only when no windows)
        moveInterval = setInterval(() => {
            if (!hasActiveWindows && !isDragging && !isAngry) {
                pickNewTarget();
            }
        }, 10000);

        // Start animation loop
        animate();
    });

    onDestroy(() => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchmove", handleMouseMove);
        if (unsubscribe) unsubscribe();
        clearInterval(waveInterval);
        clearInterval(messageInterval);
        clearInterval(moveInterval);
        cancelAnimationFrame(animationFrame);
    });
</script>

<div
    class="widget-container"
    class:waving={isWaving}
    bind:this={widgetElement}
    style="left: {posX}%; top: {posY}%;"
>
    <!-- Speech Bubble -->
    {#if showBubble}
        <div class="speech-bubble" class:wave-bubble={isWaving}>
            <p>{currentMessage}</p>
            <div class="bubble-tail"></div>
        </div>
    {/if}

    <!-- Main Memoji -->
    <div
        class="memoji-avatar"
        class:wave-animation={isWaving}
        class:angry-state={isAngry}
        role="button"
        tabindex="0"
        style="transform: perspective(600px) rotateX({tiltX}deg) rotateY({tiltY}deg);"
        on:mouseenter={handleMouseEnter}
        on:mouseleave={handleMouseLeave}
        on:click={handleClick}
        on:keydown={(e) => e.key === "Enter" && handleClick()}
        on:mousedown={startDrag}
        on:touchstart={startDrag}
    >
        <img
            src="{base}memojis/{currentExpression}"
            alt="Shyam's Memoji"
            class="memoji-img"
            draggable="false"
        />

        <!-- Glow effect -->
        <div class="memoji-glow" class:angry-glow={isAngry}></div>
    </div>
</div>

<style>
    .widget-container {
        position: absolute;
        transform: translate(-50%, -50%);
        z-index: 25;
        display: flex;
        flex-direction: column;
        align-items: center;
        pointer-events: none;
        /* Removed CSS transitions as they conflict with JS-driven dragging and animation */
    }

    /* Speech Bubble */
    .speech-bubble {
        position: relative;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 24px;
        padding: 14px 22px;
        margin-bottom: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        animation: bubbleFadeIn 0.5s ease-out;
        pointer-events: auto;
        max-width: 220px;
    }

    .speech-bubble.wave-bubble {
        animation: bubbleBounce 0.6s ease-out;
    }

    .speech-bubble p {
        margin: 0;
        font-size: 17px;
        font-weight: 600;
        color: #1d1d1f;
        text-align: center;
        line-height: 1.4;
    }

    .bubble-tail {
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 14px solid transparent;
        border-right: 14px solid transparent;
        border-top: 14px solid rgba(255, 255, 255, 0.95);
    }

    @keyframes bubbleFadeIn {
        from {
            opacity: 0;
            transform: translateY(10px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes bubbleBounce {
        0% {
            transform: scale(0.8);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }

    /* Main Memoji - BIGGER */
    .memoji-avatar {
        position: relative;
        width: 200px;
        height: 200px;
        background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.95),
            rgba(255, 255, 255, 0.8)
        );
        backdrop-filter: blur(30px);
        -webkit-backdrop-filter: blur(30px);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: grab;
        transition:
            transform 0.15s ease-out,
            box-shadow 0.3s ease;
        box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.2),
            0 0 0 2px rgba(255, 255, 255, 0.6) inset;
        pointer-events: auto;
        user-select: none;
    }

    /* Wave animation on the avatar */
    .memoji-avatar.wave-animation {
        animation: waveMotion 0.8s ease-in-out 3;
    }

    @keyframes waveMotion {
        0%,
        100% {
            transform: perspective(600px) rotate(0deg);
        }
        25% {
            transform: perspective(600px) rotate(10deg) translateY(-5px);
        }
        75% {
            transform: perspective(600px) rotate(-10deg) translateY(-5px);
        }
    }

    .memoji-avatar:hover {
        box-shadow:
            0 25px 70px rgba(0, 0, 0, 0.25),
            0 0 0 3px rgba(255, 255, 255, 0.7) inset,
            0 0 50px rgba(103, 126, 234, 0.3);
    }

    .memoji-avatar:active {
        cursor: grabbing;
        transform: scale(0.95) !important;
    }

    .memoji-avatar.angry-state {
        box-shadow:
            0 20px 60px rgba(255, 0, 0, 0.3),
            0 0 0 2px rgba(255, 100, 100, 0.6) inset !important;
        animation: shake 0.1s ease-in-out infinite;
    }

    @keyframes shake {
        0%,
        100% {
            transform: perspective(600px) translateX(0);
        }
        25% {
            transform: perspective(600px) translateX(-2px);
        }
        75% {
            transform: perspective(600px) translateX(2px);
        }
    }

    .memoji-img {
        width: 88%;
        height: 88%;
        object-fit: contain;
        pointer-events: none;
        filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.12));
    }

    /* Glow effect behind memoji */
    .memoji-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 250%;
        height: 250%;
        background: radial-gradient(
            circle,
            rgba(103, 126, 234, 0.2) 0%,
            rgba(118, 75, 162, 0.12) 25%,
            transparent 60%
        );
        pointer-events: none;
        z-index: -1;
        animation: glowPulse 3s ease-in-out infinite;
    }

    .memoji-glow.angry-glow {
        background: radial-gradient(
            circle,
            rgba(255, 0, 0, 0.4) 0%,
            rgba(255, 0, 0, 0.2) 25%,
            transparent 60%
        );
        animation: none; /* Stop pulsing when angry */
    }

    @keyframes glowPulse {
        0%,
        100% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.15);
        }
    }

    /* Floating shadow */
    .widget-container::before {
        content: "";
        position: absolute;
        bottom: -35px;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 25px;
        background: radial-gradient(
            ellipse,
            rgba(0, 0, 0, 0.18),
            transparent 70%
        );
        border-radius: 50%;
        animation: shadowPulse 3s ease-in-out infinite;
    }

    @keyframes shadowPulse {
        0%,
        100% {
            transform: translateX(-50%) scale(1);
            opacity: 0.6;
        }
        50% {
            transform: translateX(-50%) scale(0.75);
            opacity: 0.35;
        }
    }

    /* Waving container bounce */
    .widget-container.waving {
        animation: containerBounce 0.8s ease-in-out 2;
    }

    @keyframes containerBounce {
        0%,
        100% {
            transform: translate(-50%, -50%);
        }
        50% {
            transform: translate(-50%, -55%);
        }
    }

    /* Mobile Responsive - Smaller widget for mobile */
    @media (max-width: 768px) {
        .widget-container {
            /* Remove fixed positioning to allow dragging */
            z-index: 50;
        }

        .widget-container::before {
            /* Hide the shadow on mobile */
            display: none;
        }

        .memoji-avatar {
            width: 80px;
            height: 80px;
            box-shadow:
                0 10px 30px rgba(0, 0, 0, 0.2),
                0 0 0 2px rgba(255, 255, 255, 0.5) inset;
        }

        .memoji-glow {
            width: 180%;
            height: 180%;
        }

        .speech-bubble {
            max-width: 160px;
            padding: 10px 14px;
            margin-bottom: 10px;
            border-radius: 18px;
        }

        .speech-bubble p {
            font-size: 13px;
        }

        .bubble-tail {
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid rgba(255, 255, 255, 0.95);
            bottom: -10px;
        }
    }

    /* Tablet adjustments */
    @media (min-width: 769px) and (max-width: 1023px) {
        .memoji-avatar {
            width: 160px;
            height: 160px;
        }

        .speech-bubble {
            max-width: 180px;
            padding: 12px 18px;
        }

        .speech-bubble p {
            font-size: 15px;
        }
    }
</style>
