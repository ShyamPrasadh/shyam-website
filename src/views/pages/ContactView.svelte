<script>
    import { onMount, afterUpdate } from "svelte";

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

        // Hiring / Project Request Flow
        if (
            text.includes("hire") ||
            text.includes("project") ||
            text.includes("freelance") ||
            text.includes("work with")
        ) {
            return "I'd love to collaborate! 🚀 Could you tell me a bit about your project requirements? Or you can email me directly at shyamprasadh247@gmail.com.";
        }

        // Resume / Experience
        if (
            text.includes("experience") ||
            text.includes("accenture") ||
            text.includes("sap")
        ) {
            return "I'm an Associate Software Engineer at Accenture (Feb 2024 - Present), working on SAP SD modules (Order Management, Pricing, Billing). I also freelance for startups, delivering end-to-end UX/UI solutions! 💼";
        }

        // Skills
        if (
            text.includes("skill") ||
            text.includes("tool") ||
            text.includes("stack")
        ) {
            return "My toolkit includes Figma, Adobe XD, ProtoPie, HTML/CSS/JS, and Uizard. I specialize in User Research, Wireframing, Prototyping, and Interaction Design. 🎨";
        }

        // Projects
        if (text.includes("thriftz") || text.includes("project")) {
            return "One of my key projects is 'Thriftz' - a luxury pre-owned store. I handled the end-to-end product design for iOS, Android, and Web, focusing on trust and price clarity. 🛍️";
        }

        // Education
        if (
            text.includes("education") ||
            text.includes("college") ||
            text.includes("degree")
        ) {
            return "I hold a B.E. in Computer Science from Sona College of Technology (2019-2023) and completed an intensified UI/UX Design course at DesignBoat. 🎓";
        }

        // Contact
        if (
            text.includes("contact") ||
            text.includes("email") ||
            text.includes("linkedin") ||
            text.includes("reach")
        ) {
            return "You can reach me at shyamprasadh247@gmail.com 📧 or connect with me on LinkedIn!";
        }

        // Greetings
        if (
            text.includes("hello") ||
            text.includes("hi") ||
            text.includes("hey")
        ) {
            return "Hello! 👋 I'm Shyam's virtual assistant. I can tell you about his work, skills, projects, or how to hire him!";
        }

        // Default
        return "I'm not sure about that, but I can tell you about my 'experience', 'skills', 'projects', or how to 'contact' me! 😊";
    }

    function handleKeydown(e) {
        if (e.key === "Enter") handleSend();
    }
</script>

<div class="imessage-container">
    <div class="header">
        <div class="avatar">SP</div>
        <div class="contact-info">
            <span class="name">Shyam Prasadh</span>
            <span class="status">iMessage</span>
        </div>
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
                <div class="bubble {msg.sender === 'user' ? 'blue' : 'gray'}">
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
</div>

<style>
    .imessage-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: #fff;
        font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
            "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    .header {
        padding: 10px 15px;
        border-bottom: 1px solid #e5e5e5;
        background: rgba(245, 245, 245, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 60px;
        flex-shrink: 0;
    }

    .avatar {
        width: 30px;
        height: 30px;
        background: #999;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 2px;
    }

    .contact-info {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .name {
        font-size: 12px;
        font-weight: 500;
    }

    .status {
        font-size: 10px;
        color: #8e8e93;
    }

    .messages {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: #fff;
    }

    .timestamp {
        text-align: center;
        color: #8e8e93;
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

    .message-avatar {
        width: 24px;
        height: 24px;
        background: #e5e5ea;
        color: #8e8e93;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        flex-shrink: 0;
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

    .bubble.blue {
        background: #007aff;
        color: #fff;
        border-bottom-right-radius: 4px;
    }

    .input-area {
        padding: 10px 15px 20px;
        background: #fff;
        flex-shrink: 0;
    }

    .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    input {
        width: 100%;
        padding: 8px 36px 8px 16px;
        border: 1px solid #c6c6c8;
        border-radius: 20px;
        font-size: 15px;
        outline: none;
    }

    input:focus {
        border-color: #8e8e93;
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
        transition: background 0.2s;
    }

    .send-btn:disabled {
        background: #b4b4b4;
        cursor: default;
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
        background: #8e8e93;
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

    /* Mobile Fix: Ensure input is visible above dock */
    @media (max-width: 768px) {
        .input-area {
            padding-bottom: 90px; /* Space for dock */
        }
    }
</style>
