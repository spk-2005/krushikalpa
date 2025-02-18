import React, { useState, useEffect } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [language, setLanguage] = useState("en"); // Default to English
    const { transcript, resetTranscript, listening } = useSpeechRecognition();
    const [userEmail, setUserEmail] = useState("");

    // Fetch user email from localStorage on component mount
    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
            setUserEmail(storedEmail);
        } else {
            console.warn("No email found in localStorage.");
        }
    }, []);
    const sendMessage = async (message) => {
        if (!message) return;
    
        setMessages(prevMessages => [...prevMessages, { text: message, sender: "user" }]);
    
        try {
            const res = await axios.post("http://localhost:5002/chat", {
                message,
                email: userEmail,  // Ensure email is sent to the backend
            });
    
            setMessages(prevMessages => [
                ...prevMessages,
                { text: res.data.reply, sender: "bot" },
            ]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prevMessages => [
                ...prevMessages,
                { text: "Sorry, there was an error processing your request.", sender: "bot" },
            ]);
        }
    
        setInput(""); // Clear input field after sending
    };
        // Start speech recognition
    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: getSpeechLanguage() });
    };

    // Get language code for speech recognition
    const getSpeechLanguage = () => {
        const languageMap = {
            en: "en-US",
            te: "te-IN",
            hi: "hi-IN",
        };
        return languageMap[language] || "en-US"; // Default to English
    };

    return (
        <div style={styles.container}>
            <h2>Chatbot</h2>
            {/* Language Selector */}
            <label style={styles.label}>
                Select Language:
                <select style={styles.select} value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="te">Telugu</option>
                    <option value="hi">Hindi</option>
                </select>
            </label>

            {/* Chat Messages */}
            <div style={styles.chatBox}>
                {messages.map((msg, i) => (
                    <p key={i} style={{ ...styles.message, textAlign: msg.sender === "user" ? "right" : "left" }}>
                        <strong>{msg.sender === "user" ? "You: " : "Bot: "}</strong> {msg.text}
                    </p>
                ))}
            </div>

            {/* Input & Buttons */}
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    style={styles.input}
                />
                <button style={styles.button} onClick={() => sendMessage(input)}>Send</button>
            </div>

            {/* Voice Commands */}
            <div style={styles.voiceContainer}>
                <button style={styles.button} onClick={startListening}>
                    {listening ? "Listening..." : "Start Voice"}
                </button>
                <button style={styles.button} onClick={() => transcript && sendMessage(transcript)}>Use Voice Input</button>
                <button style={styles.button} onClick={resetTranscript}>Reset</button>
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        maxWidth: 450,
        margin: "auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
    },
    label: {
        fontWeight: "bold",
        display: "block",
        marginBottom: 10,
    },
    select: {
        marginLeft: 10,
        padding: 5,
        fontSize: 16,
    },
    chatBox: {
        height: 300,
        overflowY: "scroll",
        border: "1px solid gray",
        padding: 10,
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
        marginBottom: 10,
    },
    message: {
        margin: "5px 0",
        padding: "5px 10px",
        borderRadius: "5px",
        maxWidth: "80%",
        display: "inline-block",
    },
    inputContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    input: {
        flex: 1,
        padding: 10,
        marginRight: 10,
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "10px 15px",
        border: "none",
        backgroundColor: "#007bff",
        color: "white",
        borderRadius: "5px",
        cursor: "pointer",
    },
    voiceContainer: {
        marginTop: 10,
        display: "flex",
        justifyContent: "space-between",
    }
};

export default Chatbot;
