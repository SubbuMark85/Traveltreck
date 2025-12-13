import React, { useEffect, useRef, useState } from "react";
import styles from "./Chatbot.module.css";
import Header from "@/components/Header";
import { sendChatMessage } from "@/services/chatbot";

type Sender = "user" | "bot";

interface Message {
    id: string;
    sender: Sender;
    text: string;
    ts: number; // unix ms
}

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: crypto.randomUUID(),
            sender: "bot",
            text: "Hi! 👋 I’m your travel assistant for Jharkhand. Ask me about places, routes, stays, or festivals.",
            ts: Date.now(),
        },
    ]);
    const [input, setInput] = useState("");
    const listRef = useRef<HTMLDivElement>(null);

    // auto-scroll to bottom on new messages
    useEffect(() => {
        const el = listRef.current;
        if (!el) return;
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        const userMsg: Message = {
            id: crypto.randomUUID(),
            sender: "user",
            text: trimmed,
            ts: Date.now(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        try {
            const data = await sendChatMessage(trimmed);

            const botMsg: Message = {
                id: crypto.randomUUID(),
                sender: "bot",
                text: data.reply ?? "No response from server",
                ts: Date.now(),
            };

            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            const errorMsg: Message = {
                id: crypto.randomUUID(),
                sender: "bot",
                text: "Sorry, something went wrong. Please try again.",
                ts: Date.now(),
            };

            setMessages((prev) => [...prev, errorMsg]);
        }
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div>
            <Header />
            <div className={styles.page}>
                <div className={styles.container} role="region" aria-label="Discover Jharkhand Chatbot">
                    <header className={styles.header}>
                        <span role="img" aria-label="chat">💬</span> Discover Jharkhand Chatbot
                    </header>

                    <div ref={listRef} className={styles.body}>
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={styles.row}
                                style={{ justifyContent: m.sender === "user" ? "flex-end" : "flex-start" }}
                            >
                                <div className={m.sender === "user" ? styles.userBubble : styles.botBubble}>
                                    <div className={styles.text}>{m.text}</div>
                                    <div className={styles.meta}>
                                        {new Date(m.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <footer className={styles.footer}>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message… (Shift+Enter for newline)"
                            rows={1}
                            className={styles.input}
                            aria-label="Message input"
                        />
                        <button onClick={sendMessage} className={styles.button} aria-label="Send message">
                            Send
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;

