import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, MessageSquare } from 'lucide-react';
import './ChatAssistant.css';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

const ChatAssistant = ({ t, lang }) => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: t.chat_welcome }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!chatInput.trim() || isTyping) return;

    const userMessage = { role: 'user', text: chatInput };
    setMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are an expert technician for a Palfinger Moffett M8 55.3 (Serial 0480688) with a Kohler KDI 1903 TCR Tier 4 engine.
            The user is deploying this in Belize. You have knowledge of the following part numbers:
            - Filters: 0000773075 (Fuel), ED0021750010 (Pre-filter), ZMRD40142270 (Air).
            - Rollers: 529.120.0001.
            - Relays: MM43128201 (Glow Plug).
            - Drive Pressure: Should be > 2250 PSI.
            Answer in ${lang === 'en' ? 'English' : 'Spanish'}. Keep answers concise and technical.
            User Question: ${chatInput}` }] }],
        })
      });

      const data = await response.json();
      const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble connecting to my technical base. Please ensure the API key is configured.";
      
      setMessages(prev => [...prev, { role: 'assistant', text: botText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: t.error_api }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-container glass animate-fade">
      <header className="chat-header">
        <div className="chat-icon-bg">
          <MessageSquare size={20} />
        </div>
        <div>
          <h3>{t.chat_header}</h3>
          <p className="chat-meta">Serial 0480688 Context</p>
        </div>
      </header>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-wrapper ${msg.role}`}>
            <div className={`message-bubble ${msg.role}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message-wrapper assistant">
            <div className="message-bubble assistant typing">
              <Loader2 className="animate-spin" size={18} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <footer className="chat-footer">
        <div className="input-group">
          <input 
            type="text" 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={t.chat_placeholder}
          />
          <button 
            onClick={sendMessage}
            disabled={!chatInput.trim() || isTyping}
            className="btn-send"
          >
            <Send size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatAssistant;
