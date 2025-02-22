import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './chatbot.css';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [availableVoices, setAvailableVoices] = useState([]);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const userEmail = localStorage.getItem('email');
  const chatHistoryRef = useRef(null);

  // Initialize and update available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Load saved preferences
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    const savedVoicePreference = localStorage.getItem('voiceEnabled');
    
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
    if (savedVoicePreference !== null) {
      setIsVoiceEnabled(savedVoicePreference === 'true');
    }
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Handle language change
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Toggle voice
  const toggleVoice = () => {
    setIsVoiceEnabled(prev => {
      const newState = !prev;
      localStorage.setItem('voiceEnabled', newState);
      if (!newState) {
        window.speechSynthesis.cancel(); // Stop any ongoing speech
      }
      return newState;
    });
  };

  // Find the best voice for the selected language
  const findBestVoice = (language) => {
    if (language === 'te') {
      const teluguVoice = availableVoices.find(voice => 
        voice.lang === 'te-IN' || 
        voice.lang === 'te' ||
        voice.lang.startsWith('te')
      );
      
      if (teluguVoice) return teluguVoice;
      
      const indianVoice = availableVoices.find(voice => 
        voice.lang.includes('IN')
      );
      
      if (indianVoice) return indianVoice;
    }

    return availableVoices.find(voice => 
      voice.lang === 'en-US' || 
      voice.lang === 'en-GB' || 
      voice.lang.startsWith('en')
    );
  };

  // Speak the bot's response
  const speakResponse = (text, language) => {
    if (!isVoiceEnabled) return;
    
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = language === 'te' ? 'te-IN' : 'en-US';
    
    const voice = findBestVoice(language);
    if (voice) {
      speech.voice = voice;
    }

    speech.rate = language === 'te' ? 0.9 : 1;
    speech.pitch = 1;
    speech.volume = 1;

    speech.onerror = (event) => {
      console.error('Speech synthesis error:', event);
    };

    window.speechSynthesis.speak(speech);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5002/api/chat', {
        message: userInput,
        email: userEmail,
        language: selectedLanguage,
      });

      const botResponse = response.data.response;
      setChatHistory(prev => [...prev, { user: userInput, bot: botResponse }]);
      setUserInput('');

      speakResponse(botResponse, selectedLanguage);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = selectedLanguage === 'te' 
        ? "క్షమించండి, నేను మీ అభ్యర్థనను ప్రాసెస్ చేయలేకపోయాను." 
        : "Sorry, I couldn't process your request.";
      
      setChatHistory(prev => [...prev, { user: userInput, bot: errorMessage }]);
      speakResponse(errorMessage, selectedLanguage);
    } finally {
      setLoading(false);
    }
  };

  // Start speech recognition
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = selectedLanguage === 'te' ? 'te-IN' : 'en-US';
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event);
    };

    recognition.start();
  };

  

  return (
    <div className="chatbot-container">
      <div className="controls">
        <div className="language-selector">
          <select 
            onChange={handleLanguageChange} 
            value={selectedLanguage} 
            className="language-dropdown"
          >
            <option value="en">English</option>
            <option value="te">తెలుగు</option>
          </select>
        </div>
        
        <div className="voice-control">
          <button 
            onClick={toggleVoice} 
            className={`voice-toggle ${isVoiceEnabled ? 'active' : ''}`}
            aria-label={`Voice ${isVoiceEnabled ? 'On' : 'Off'}`}
          >
            <i className={`fa ${isVoiceEnabled ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
            <span className="voice-label">
              Voice: {isVoiceEnabled ? 'On' : 'Off'}
            </span>
          </button>
        </div>
      </div>

      <div className="chat-history" ref={chatHistoryRef}>
  {chatHistory.map((chat, index) => (
    <div key={index} className="chat-message">
      <p className="chat-user">{chat.user}</p>
      <p className="chat-bot" dangerouslySetInnerHTML={{ __html: chat.bot }}></p>
    </div>
  ))}
</div>

      <form onSubmit={handleSubmit} className="chat-form">
        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={selectedLanguage === 'te' ? "ఏదైనా అడగండి..." : "Ask me anything..."}
            className="chat-input"
          />
          <button 
  onClick={startListening} 
  type="button" 
  className="speak-button"
  data-listening={isListening}
  aria-label={isListening ? "Stop Listening" : "Start Listening"}
>
  <ion-icon name={isListening ? "mic" : "mic-outline"}></ion-icon>
</button>
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? (selectedLanguage === 'te' ? "ఆలోచిస్తోంది..." : "Thinking...") 
                   : (selectedLanguage === 'te' ? "పంపండి" : "Send")}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
