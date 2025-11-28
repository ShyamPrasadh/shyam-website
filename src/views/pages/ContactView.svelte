<script>
    import { onMount, afterUpdate } from "svelte";
    import { fade, slide } from "svelte/transition";

    let messages = [
        {
            id: 1,
            text: "Hey there! 👋 I'm Shyam's virtual assistant.",
            sender: "shyam",
            timestamp: new Date(),
        },
        {
            id: 2,
            text: "I can tell you about his UX skills, leadership experience, or how to reach him directly. What would you like to know?",
            sender: "shyam",
            timestamp: new Date(),
        },
    ];

    let newMessage = "";
    let chatContainer;
    let isTyping = false;
    let showInfo = false;

    // Contact Details
    const contactDetails = {
        name: "Shyam Prasadh",
        mobile: "+91 98410 99104",
        email: "shyamprasadh247@gmail.com",
        linkedin: "linkedin.com/in/shyamprasadh",
        instagram: "@shyam_ux",
    };

    function scrollToBottom() {
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    afterUpdate(scrollToBottom);

    function handleSend() {
        if (!newMessage.trim()) return;

        // Add user message
        messages = [
            ...messages,
            {
                id: Date.now(),
                text: newMessage,
                sender: "user",
                timestamp: new Date(),
            },
        ];

        const userText = newMessage.toLowerCase();
        newMessage = "";
        isTyping = true;

        // Simulate typing delay
        setTimeout(() => {
            const reply = generateReply(userText);
            messages = [
                ...messages,
                {
                    id: Date.now() + 1,
                    text: reply,
                    sender: "shyam",
                    timestamp: new Date(),
                },
            ];
            isTyping = false;
        }, 1500);
    }

    function generateReply(text) {
        text = text.toLowerCase();
        if (
            text.includes("hire") ||
            text.includes("project") ||
            text.includes("freelance")
        ) {
            return "I'd love to collaborate! 🚀 Could you tell me a bit about your project requirements? Or you can email me directly at shyamprasadh247@gmail.com.";
        }
        if (text.includes("experience") || text.includes("accenture")) {
            return "I'm an Associate Software Engineer at Accenture (Feb 2024 - Present), working on SAP SD modules. I also freelance for startups! 💼";
        }
        if (text.includes("skill") || text.includes("tool")) {
            return "My toolkit includes Figma, Adobe XD, ProtoPie, HTML/CSS/JS, and Uizard. I specialize in User Research and Interaction Design. 🎨";
        }
        if (text.includes("contact") || text.includes("email")) {
            return "You can reach me at shyamprasadh247@gmail.com 📧 or connect with me on LinkedIn!";
        }
        if (text.includes("hello") || text.includes("hi")) {
            return "Hello! 👋 I'm Shyam's virtual assistant. Ask me about his work, skills, or how to hire him!";
        }
        return "I'm not sure about that, but I can tell you about my 'experience', 'skills', 'projects', or how to 'contact' me! 😊";
    }

    function handleKeydown(e) {
        if (e.key === "Enter") handleSend();
    }

    function toggleInfo() {
        showInfo = !showInfo;
    }
</script>

<div class="imessage-container">
    <!-- Sidebar -->
    <div class="sidebar">
        <div class="sidebar-header">
            <div class="search-bar">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><circle cx="11" cy="11" r="8"></circle><line
                        x1="21"
                        y1="21"
                        x2="16.65"
                        y2="16.65"
                    ></line></svg
                >
                <input type="text" placeholder="Search" />
            </div>
            <button class="compose-btn">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><path
                        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    ></path><path
                        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                    ></path></svg
                >
            </button>
        </div>
        <div class="chat-list">
            <div class="chat-item active">
                <div class="avatar">SP</div>
                <div class="chat-info">
                    <div class="chat-top">
                        <span class="chat-name">Shyam Prasadh</span>
                        <span class="chat-date">Now</span>
                    </div>
                    <div class="chat-preview">
                        {messages[messages.length - 1].text}
                    </div>
                </div>
            </div>
            <!-- Dummy Chat -->
            <div class="chat-item">
                <div class="avatar" style="background: #FF9F0A;">SJ</div>
                <div class="chat-info">
                    <div class="chat-top">
                        <span class="chat-name">Steve Jobs</span>
                        <span class="chat-date">Yesterday</span>
                    </div>
                    <div class="chat-preview">Great work on the portfolio!</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Chat Area -->
    <div class="main-chat">
        <div class="header">
            <div class="header-left">
                <span class="to-label">To:</span>
                <span class="recipient-name">Shyam Prasadh</span>
            </div>
            <button
                class="info-btn {showInfo ? 'active' : ''}"
                on:click={toggleInfo}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><circle cx="12" cy="12" r="10"></circle><line
                        x1="12"
                        y1="16"
                        x2="12"
                        y2="12"
                    ></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg
                >
            </button>
        </div>

        <div class="messages" bind:this={chatContainer}>
            <div class="timestamp">
                Today {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </div>

            {#each messages as msg (msg.id)}
                <div
                    class="message-row {msg.sender === 'user'
                        ? 'sent'
                        : 'received'}"
                >
                    {#if msg.sender === "shyam"}
                        <div class="message-avatar">SP</div>
                    {/if}
                    <div
                        class="bubble {msg.sender === 'user' ? 'blue' : 'gray'}"
                    >
                        {msg.text}
                    </div>
                </div>
            {/each}

            {#if isTyping}
                <div class="message-row received">
                    <div class="message-avatar">SP</div>
                    <div class="bubble gray typing">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            {/if}
        </div>

        <div class="input-area">
            <div class="input-wrapper">
                <input
                    type="text"
                    placeholder="iMessage"
                    bind:value={newMessage}
                    on:keydown={handleKeydown}
                />
                <button
                    class="send-btn"
                    on:click={handleSend}
                    disabled={!newMessage.trim()}
                >
                    ↑
                </button>
            </div>
        </div>

        <!-- Info Popover -->
        {#if showInfo}
            <div class="info-popover" transition:fade={{ duration: 150 }}>
                <div class="popover-header">
                    <div class="large-avatar">SP</div>
                    <h3>{contactDetails.name}</h3>
                    <p class="popover-subtitle">available</p>
                </div>

                <div class="action-row">
                    <div class="action-btn">
                        <div class="icon-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                ><path
                                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                                ></path></svg
                            >
                        </div>
                        <span>call</span>
                    </div>
                    <div class="action-btn">
                        <div class="icon-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                ><polygon points="23 7 16 12 23 17 23 7"
                                ></polygon><rect
                                    x="1"
                                    y="5"
                                    width="15"
                                    height="14"
                                    rx="2"
                                    ry="2"
                                ></rect></svg
                            >
                        </div>
                        <span>video</span>
                    </div>
                    <div class="action-btn">
                        <div class="icon-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                ><path
                                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                                ></path><polyline points="22,6 12,13 2,6"
                                ></polyline></svg
                            >
                        </div>
                        <span>mail</span>
                    </div>
                    <div class="action-btn active">
                        <div class="icon-circle active">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                ><circle cx="12" cy="12" r="10"></circle><line
                                    x1="12"
                                    y1="16"
                                    x2="12"
                                    y2="12"
                                ></line><line x1="12" y1="8" x2="12.01" y2="8"
                                ></line></svg
                            >
                        </div>
                        <span>info</span>
                    </div>
                </div>

                <div class="info-list">
                    <div class="info-item">
                        <span class="label">mobile</span>
                        <span class="value">{contactDetails.mobile}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">email</span>
                        <span class="value">{contactDetails.email}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">linkedin</span>
                        <a
                            href="https://{contactDetails.linkedin}"
                            target="_blank"
                            class="value link">{contactDetails.linkedin}</a
                        >
                    </div>
                    <div class="info-item">
                        <span class="label">instagram</span>
                        <span class="value">{contactDetails.instagram}</span>
                    </div>
                </div>

                <div class="toggle-row">
                    <span>Hide Alerts</span>
                    <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .imessage-container {
        display: flex;
        height: 100%;
        background: var(--bg-color);
        color: var(--text-primary);
        font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
            "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        overflow: hidden;
    }

    /* Sidebar */
    .sidebar {
        width: 300px;
        border-right: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
        background: rgba(var(--sidebar-bg), 0.5);
        backdrop-filter: blur(20px);
    }

    .sidebar-header {
        padding: 12px;
        display: flex;
        gap: 8px;
        align-items: center;
    }

    .search-bar {
        flex: 1;
        background: var(--card-bg); /* Use card-bg for input background */
        border-radius: 8px;
        padding: 6px 8px;
        display: flex;
        align-items: center;
        gap: 6px;
        border: 1px solid transparent;
    }

    .search-bar:focus-within {
        background: var(--bg-color);
        border-color: var(--accent-color);
    }

    .search-bar svg {
        color: var(--text-secondary);
        opacity: 0.7;
    }

    .search-bar input {
        border: none;
        background: transparent;
        width: 100%;
        font-size: 13px;
        outline: none;
        color: var(--text-primary);
        padding: 0;
    }

    .compose-btn {
        background: transparent;
        border: none;
        color: var(--accent-color);
        cursor: pointer;
        padding: 4px;
    }

    .chat-list {
        flex: 1;
        overflow-y: auto;
    }

    .chat-item {
        padding: 12px;
        display: flex;
        gap: 12px;
        cursor: pointer;
        border-radius: 8px;
        margin: 4px 8px;
    }

    .chat-item:hover {
        background: rgba(0, 0, 0, 0.05);
    }

    :global([data-theme="dark"]) .chat-item:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .chat-item.active {
        background: var(--accent-color);
        color: white;
    }

    .chat-item.active .chat-name,
    .chat-item.active .chat-date,
    .chat-item.active .chat-preview {
        color: white;
        opacity: 1;
    }

    .chat-info {
        flex: 1;
        min-width: 0;
    }

    .chat-top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
    }

    .chat-name {
        font-weight: 600;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .chat-date {
        font-size: 12px;
        color: var(--text-secondary);
    }

    .chat-preview {
        font-size: 13px;
        color: var(--text-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* Main Chat */
    .main-chat {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        background: var(--bg-color);
    }

    .header {
        height: 52px;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        background: var(--window-bg); /* Use window-bg for header */
        backdrop-filter: blur(10px);
    }

    .header-left {
        display: flex;
        gap: 6px;
        font-size: 13px;
    }

    .to-label {
        color: var(--text-secondary);
    }

    .recipient-name {
        font-weight: 600;
        color: var(--text-primary);
    }

    .info-btn {
        background: transparent;
        border: none;
        color: var(--accent-color);
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
    }

    .info-btn.active {
        background: rgba(0, 122, 255, 0.1);
    }

    .messages {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .timestamp {
        text-align: center;
        color: var(--text-secondary);
        font-size: 11px;
        margin: 10px 0;
        font-weight: 500;
    }

    .message-row {
        display: flex;
        align-items: flex-end;
        gap: 8px;
        max-width: 75%;
    }

    .message-row.sent {
        align-self: flex-end;
        flex-direction: row-reverse;
    }

    .avatar,
    .message-avatar,
    .large-avatar {
        background: #999;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
    }

    .avatar {
        width: 40px;
        height: 40px;
        font-size: 14px;
        flex-shrink: 0;
    }
    .message-avatar {
        width: 28px;
        height: 28px;
        font-size: 11px;
        flex-shrink: 0;
        background: var(--sidebar-bg);
        color: var(--text-secondary);
    }
    .large-avatar {
        width: 60px;
        height: 60px;
        font-size: 24px;
        margin-bottom: 12px;
        background: #8e8e93;
    }

    .bubble {
        padding: 8px 12px;
        border-radius: 18px;
        font-size: 15px;
        line-height: 1.4;
        position: relative;
        word-wrap: break-word;
    }

    .bubble.gray {
        background: #e9e9eb;
        color: #000;
        border-bottom-left-radius: 4px;
    }

    :global([data-theme="dark"]) .bubble.gray {
        background: #3a3a3c;
        color: #fff;
    }

    .bubble.blue {
        background: #007aff;
        color: #fff;
        border-bottom-right-radius: 4px;
    }

    .input-area {
        padding: 16px;
        background: var(--window-bg);
    }

    /* Only add extra padding when window is maximized (to clear Dock) */
    :global(.window.maximized) .input-area {
        padding-bottom: 90px;
    }

    @media (max-width: 768px) {
        /* On mobile, window is effectively always maximized/full screen */
        .input-area {
            padding-bottom: 100px;
        }
    }

    .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .input-wrapper input {
        width: 100%;
        padding: 8px 36px 8px 16px;
        border: 1px solid var(--border-color);
        border-radius: 20px;
        font-size: 15px;
        outline: none;
        background: var(--card-bg);
        color: var(--text-primary);
    }

    .input-wrapper input:focus {
        border-color: var(--text-secondary);
    }

    .send-btn {
        position: absolute;
        right: 4px;
        width: 28px;
        height: 28px;
        background: #007aff;
        color: white;
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
    }

    .send-btn:disabled {
        background: var(--text-secondary);
        opacity: 0.5;
        cursor: default;
    }

    /* Info Popover */
    .info-popover {
        position: absolute;
        top: 52px;
        right: 10px;
        width: 300px;
        background: rgba(
            30,
            30,
            30,
            0.95
        ); /* Dark background by default for popover */
        backdrop-filter: blur(20px);
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        padding: 20px;
        z-index: 100;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    :global([data-theme="light"]) .info-popover {
        background: rgba(255, 255, 255, 0.95);
        color: #000;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .popover-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }

    .popover-header h3 {
        font-size: 18px;
        font-weight: 600;
        margin: 0;
    }

    .popover-subtitle {
        font-size: 12px;
        opacity: 0.6;
        margin-top: 4px;
    }

    .action-row {
        display: flex;
        justify-content: space-around;
        margin-bottom: 24px;
    }

    .action-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        cursor: pointer;
    }

    .icon-circle {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: rgba(128, 128, 128, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--accent-color);
    }

    .icon-circle.active {
        background: var(--accent-color);
        color: white;
    }

    .action-btn span {
        font-size: 10px;
        color: var(--accent-color);
    }

    .info-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 20px;
        background: rgba(128, 128, 128, 0.1);
        border-radius: 10px;
        padding: 12px;
    }

    .info-item {
        display: flex;
        flex-direction: column;
        gap: 2px;
        border-bottom: 1px solid rgba(128, 128, 128, 0.1);
        padding-bottom: 8px;
    }

    .info-item:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .info-item .label {
        font-size: 11px;
        opacity: 0.6;
        text-transform: uppercase;
    }

    .info-item .value {
        font-size: 13px;
    }

    .info-item .link {
        color: var(--accent-color);
        text-decoration: none;
    }

    .toggle-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        padding-top: 10px;
        border-top: 1px solid rgba(128, 128, 128, 0.2);
    }

    /* Switch Toggle */
    .switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 24px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 34px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: var(--accent-color);
    }

    input:checked + .slider:before {
        transform: translateX(16px);
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
        .sidebar {
            display: none; /* Hide sidebar on mobile for now */
        }

        .info-popover {
            width: 90%;
            right: 5%;
        }
    }

    /* Typing indicator */
    .typing {
        display: flex;
        gap: 4px;
        padding: 12px 16px;
    }

    .typing span {
        width: 6px;
        height: 6px;
        background: var(--text-secondary);
        border-radius: 50%;
        animation: bounce 1.4s infinite ease-in-out both;
    }

    .typing span:nth-child(1) {
        animation-delay: -0.32s;
    }
    .typing span:nth-child(2) {
        animation-delay: -0.16s;
    }

    @keyframes bounce {
        0%,
        80%,
        100% {
            transform: scale(0);
        }
        40% {
            transform: scale(1);
        }
    }
</style>
