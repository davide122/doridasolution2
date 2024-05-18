"use client";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiCopy } from 'react-icons/fi';
import formatText from '../../components/Hook/formatText'; // Importa la funzione di formattazione
import Image from 'next/image';
import { FaMicrophoneAlt } from "react-icons/fa";

const WebBot = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [threadId, setThreadId] = useState(null);
  const [isWait, setIsWait] = useState(false);
  const messagesEndRef = useRef(null);
  const [loadingDots, setLoadingDots] = useState(''); // Stato per i pallini di caricamento
  const audioRef = useRef();


  useEffect(() => {
    // This ensures Audio is only defined in browser environments
    if (typeof window !== "undefined") {
      audioRef.current = new Audio('/Notification.mp3');
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedThreadId = localStorage.getItem('threadId');
    if (token && savedThreadId) {
      setIsLoggedIn(true);
      setThreadId(savedThreadId);
      fetchMessages(savedThreadId);
    }
  }, []);

  useEffect(() => {
    // Play sound only when the last message is from the assistant
    if (messages.length > 1 && messages[messages.length - 2].role === 'assistant') {
      audioRef.current.play();
    }
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isWait) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => (prev.length < 3 ? prev + '.' : ''));
      }, 500);
      return () => clearInterval(interval);
    } else {
      setLoadingDots('');
    }
  }, [isWait]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/login', { email, password });
      const { token, assistant_id } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('assistant_id', assistant_id);
      setIsLoggedIn(true);
      createNewThread();
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleNewChat = async () => {
    localStorage.removeItem('threadId');
    createNewThread();
  };

  const createNewThread = async () => {
    try {
      const res = await fetch('/api/openai/start-thread', {
        method: 'POST',
      });
      const newThread = await res.json();
      setThreadId(newThread.id);
      localStorage.setItem('threadId', newThread.id);
      setMessages([]);
    } catch (error) {
      console.error('Errore nella creazione di un nuovo thread:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: inputMessage,
      timestamp: new Date().getTime(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsWait(true);

    try {
      await fetch(`/api/openai/messages/${threadId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: inputMessage }),
      });

      const runRes = await fetch(`/api/openai/runs/${threadId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assistantId: localStorage.getItem('assistant_id') }),
      });

      const runData = await runRes.json();

      const assistantMessage = {
        id: runData.id,
        role: 'assistant',
        content: runData.result || "Sto pensando...",
        timestamp: new Date().getTime(),
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      await checkRunCompletion(runData.id);
    } catch (error) {
      console.error('Errore nell\'elaborare il messaggio:', error);
      setIsWait(false);
    }
  };

  const checkRunCompletion = async (runId) => {
    try {
      const statusRes = await fetch(
        `/api/openai/completion/${threadId}/${runId}`,
        {
          method: 'GET',
        }
      );

      const statusData = await statusRes.json();
      if (statusData.status === 'completed') {
        fetchMessages(threadId);
      } else if (statusData.status === 'failed') {
        alert('L\'assistente ha riscontrato un errore.');
        setIsWait(false);
      } else {
        setTimeout(() => checkRunCompletion(runId), 2000);
      }
    } catch (error) {
      console.error('Errore nel verificare il completamento:', error);
      setIsWait(true);
    }
  };

  const fetchMessages = async (currentThreadId) => {
    try {
      const messagesRes = await fetch(`/api/openai/messages/${currentThreadId}`, {
        method: 'GET',
      });
      const data = await messagesRes.json();

      const fetchedMessages = data.data.map((msg) => ({
        id: msg.id,
        role: msg.role,
        content: formatText(msg.content.map((c) => (c.text ? c.text.value : '')).join(' ')),
        timestamp: msg.created_at * 1000,
      }));

      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Errore nel recuperare i messaggi:', error);
    } finally {
      setIsWait(false);
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyMessage = (htmlContent) => {
    // Create a new div element
    const tempDiv = document.createElement("div");
    // Set the HTML content to the div
    tempDiv.innerHTML = htmlContent;
    // Use the textContent property to get the raw text without HTML tags
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
  
    navigator.clipboard.writeText(textContent).then(() => {
      alert('Messaggio copiato!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      alert('Errore nella copia del messaggio!');
    });
  };

  const renderMessages = () => {
    const sortedMessages = [...messages].sort((a, b) => a.timestamp - b.timestamp);
    return sortedMessages.map((msg) => (
      <div className={`chat-message ${msg.role}-message`} key={msg.id}>
        <div className="message-content" dangerouslySetInnerHTML={{ __html: msg.content }} />
        <div className="message-info">
          <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          <FiCopy className="copy-icon" onClick={() => handleCopyMessage(msg.content)} />
        </div>
      </div>
    ));
  };

  if (!isLoggedIn) {
    return (
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    );
  }

  return (
    <div className="chat-container w-100">
      <div className="chat-window">
        <div className='NavChat d-flex justify-content-between align-items-center'>
          <Image src={"https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/logobot/BotAvvocato.webp"} alt='Icona del bot avvocatura' width={80} height={80} className='img-fluid rounded-circle'></Image>
          <h2 className='Title fs-1 text-primary'>Assistente Avvocato</h2>
        </div>
        <div className="chat-messages">
          {renderMessages()}
          {isWait && (
            <div className="loading-dots">
              {/* Aggiungi qui i pallini di caricamento */}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input container d-flex justify-content-center w-100 mx-2">
          <input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Scrivi un messaggio..."
          />
          <button onClick={handleSendMessage} disabled={isWait}>
            Invia
          </button>
          <button onClick={handleNewChat} className="btn btn-warning mx-2">
            Nuova Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebBot;
