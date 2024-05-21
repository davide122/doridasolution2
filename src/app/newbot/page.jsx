"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FiCopy } from "react-icons/fi";
import { jsPDF } from "jspdf";
import formatText from "../../components/Hook/formatText";
import Image from "next/image";
import { FaMicrophoneAlt } from "react-icons/fa";
import { parseDocument } from 'htmlparser2';
import styles from "../../app/page.module.css" // Aggiungi questa riga per importare lo stile
import { Dropdown, DropdownButton } from "react-bootstrap";
import { IoSend } from "react-icons/io5";

const WebBot = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [threadId, setThreadId] = useState(null);
  const [isWait, setIsWait] = useState(false);
  const messagesEndRef = useRef(null);
  const [loadingDots, setLoadingDots] = useState("");
  const audioRef = useRef();
  const [iframeCode, setIframeCode] = useState("");

  const handleGenerateIframe = () => {
    const iframeContent = messages
      .map((msg) => {
        const role = msg.role === "user" ? "User" : "Assistant";
        return `<p><strong>${role}:</strong> ${msg.content}</p>`;
      })
      .join("");

    const iframeCode = `
      <iframe width="600" height="400" style="border:1px solid #ccc;" srcdoc="
        <!DOCTYPE html>
        <html lang='en'>
          <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Chat</title>
            <style>
              body { font-family: Arial, sans-serif; }
              .user { color: blue; }
              .assistant { color: green; }
            </style>
          </head>
          <body>
            ${iframeContent}
          </body>
        </html>
      "></iframe>
    `;

    return iframeCode;
  };

  const handleShowIframeCode = () => {
    const code = handleGenerateIframe();
    setIframeCode(code);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/Notification.mp3");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedThreadId = localStorage.getItem("threadId");
    if (token && savedThreadId) {
      setIsLoggedIn(true);
      setThreadId(savedThreadId);
      fetchMessages(savedThreadId);
    }
  }, []);

  useEffect(() => {
    if (
      messages.length > 1 &&
      messages[messages.length - 2].role === "assistant"
    ) {
      audioRef.current.play();
    }
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isWait) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
      return () => clearInterval(interval);
    } else {
      setLoadingDots("");
    }
  }, [isWait]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/login", { email, password });
      const { token, assistant_id } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("assistant_id", assistant_id);
      setIsLoggedIn(true);
      createNewThread();
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleNewChat = async () => {
    localStorage.removeItem("threadId");
    createNewThread();
  };

  const createNewThread = async () => {
    try {
      const res = await fetch("/api/openai/start-thread", {
        method: "POST",
      });
      const newThread = await res.json();
      setThreadId(newThread.id);
      localStorage.setItem("threadId", newThread.id);
      setMessages([]);
    } catch (error) {
      console.error("Errore nella creazione di un nuovo thread:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: inputMessage,
      timestamp: new Date().getTime(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsWait(true);

    try {
      await fetch(`/api/openai/messages/${threadId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: inputMessage }),
      });

      const runRes = await fetch(`/api/openai/runs/${threadId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assistantId: localStorage.getItem("assistant_id"),
        }),
      });

      const runData = await runRes.json();

      const assistantMessage = {
        id: runData.id,
        role: "assistant",
        content: runData.result || "Sto pensando...",
        timestamp: new Date().getTime(),
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      await checkRunCompletion(runData.id);
    } catch (error) {
      console.error("Errore nell'elaborare il messaggio:", error);
      setIsWait(false);
    }
  };

  const checkRunCompletion = async (runId) => {
    try {
      const statusRes = await fetch(
        `/api/openai/completion/${threadId}/${runId}`,
        {
          method: "GET",
        }
      );

      const statusData = await statusRes.json();
      if (statusData.status === "completed") {
        fetchMessages(threadId);
      } else if (statusData.status === "failed") {
        alert("L'assistente ha riscontrato un errore.");
        setIsWait(false);
      } else {
        setTimeout(() => checkRunCompletion(runId), 2000);
      }
    } catch (error) {
      console.error("Errore nel verificare il completamento:", error);
      setIsWait(true);
    }
  };

  const fetchMessages = async (currentThreadId) => {
    try {
      const messagesRes = await fetch(
        `/api/openai/messages/${currentThreadId}`,
        {
          method: "GET",
        }
      );
      const data = await messagesRes.json();

      const fetchedMessages = data.data.map((msg) => ({
        id: msg.id,
        role: msg.role,
        content: formatText(
          msg.content.map((c) => (c.text ? c.text.value : "")).join(" ")
        ),
        timestamp: msg.created_at * 1000,
      }));

      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Errore nel recuperare i messaggi:", error);
    } finally {
      setIsWait(false);
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyMessage = (htmlContent) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";

    navigator.clipboard
      .writeText(textContent)
      .then(() => {
        alert("Messaggio copiato!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        alert("Errore nella copia del messaggio!");
      });
  };

  const handleExportMessagePDF = (message) => {
    const doc = new jsPDF();

    const content = convertHtmlToText(message.content);

    const margins = {
      top: 20,
      bottom: 20,
      left: 20,
      width: 170,
    };

    doc.setFont("helvetica", "normal");
    doc.setFontSize(15);

    doc.text("Messaggio dell'Assistente", margins.left, margins.top - 10);

    doc.text(content, margins.left, margins.top, {
      maxWidth: margins.width,
    });

    doc.save("MessaggioAssistente.pdf");
  };

  const convertHtmlToText = (html) => {
    const document = parseDocument(html);

    const traverse = (node) => {
      let text = '';
      if (node.type === 'text') {
        text += node.data;
      } else if (node.children && node.children.length) {
        node.children.forEach(child => {
          text += traverse(child);
        });
      }
      if (node.name === 'br') {
        text += '\n';
      } else if (node.name === 'p') {
        text += '\n\n';
      }
      return text;
    };

    return traverse(document);
  };

  const handleExportChatPDF = () => {
    const doc = new jsPDF();
    const margins = {
      top: 20,
      bottom: 20,
      left: 20,
      width: 170,
    };

    doc.setFont("helvetica", "normal");
    doc.setFontSize(22);

    let y = margins.top;

    messages.forEach((msg) => {
      const role = msg.role === "user" ? "User" : "Assistant";
      const content = msg.content.split().reverse();

      y += 5;

      const splitText = doc.splitTextToSize(content, margins.width);
      doc.text(splitText, margins.left, y);
      y += splitText.length * 10;

      if (y >= 280) {
        doc.addPage();
        y = margins.top;
      }
    });

    doc.save("Chat.pdf");
  };

  const renderMessages = () => {
    const sortedMessages = [...messages].sort(
      (a, b) => a.timestamp - b.timestamp
    );
    return sortedMessages.map((msg) => (
      <div className={`${styles.chatMessage} ${msg.role === 'user' ? styles.userMessage : styles.assistantMessage}`} key={msg.id}>
        <div
          className={styles.messageContent}
          dangerouslySetInnerHTML={{ __html: msg.content }}
        />
        <div className={styles.messageInfo}>
          <span className={styles.timestamp}>
            {new Date(msg.timestamp).toLocaleTimeString()}
          </span>
          <FiCopy
            className={styles.copyIcon}
            onClick={() => handleCopyMessage(msg.content)}
          />
          {msg.role === "assistant" && (
            <button
              onClick={() => handleExportMessagePDF(msg)}
              className={`btn btn-secondary ${styles.exportButton}`}
            >
              Esporta PDF
            </button>
          )}
        </div>
      </div>
    ));
  };

  if (!isLoggedIn) {
    return (
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={styles.inputField}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.inputField}
        />
        <button type="submit" className="btn btn-primary">Login</button>
        {error && <p className={styles.errorText}>{error}</p>}
      </form>
    );
  }

  return (
    <div className={`container-fluid ${styles.chatContainer}`}>
    <div className={`row ${styles.fullHeight}`}>
      <div className={`col-md-2 col-0 d-none d-md-block ${styles.chatList} vh-100`}>
        <h3 className="text-center">Chat Disponibili</h3>
        <div className={`p-3 my-2 border rounded ${styles.chatPlaceholder}`}>
          Nessuna chat disponibile
        </div>
      </div>
      <div className={`col-md-10 col-12${styles.chatWindowContainer} vh-100`}>
        <div className={`card shadow-sm ${styles.chatWindow} vh-100`}>
          <div className={`card-header ${styles.cardHeader} d-flex justify-content-between align-items-center`}>
            <Image
              src="https://doridasolutionbucket.s3.eu-north-1.amazonaws.com/logobot/BotAvvocato.webp"
              alt="Icona del bot avvocatura"
              width={50}
              height={50}
              className={`img-fluid rounded-circle ${styles.botIcon}`}
            />
            <h2 className={`fs-4 m-0 ${styles.title}`}>Assistente Avvocato</h2>
            <DropdownButton
              id="dropdown-basic-button"
              title="Impostazioni"
              className="text-black bg-black"
            >
              <Dropdown.Item className="text-black" onClick={handleNewChat}>Nuova Chat</Dropdown.Item>
              <Dropdown.Item className="text-black" onClick={handleExportChatPDF}>Esporta Chat</Dropdown.Item>
              <Dropdown.Item className="text-black" onClick={handleShowIframeCode}>Includi nel tuo sito</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className={`card-body ${styles.chatMessages}`}>
            {renderMessages()}
            {isWait && (
              <div className={styles.loadingDots}>
                {loadingDots}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={`card-footer ${styles.chatInput} d-flex justify-content-center align-items-center flex-row`}> 
            <input
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Scrivi un messaggio..."
              className={`form-control ${styles.inputField}`}
            />
            <button onClick={handleSendMessage} disabled={isWait} className={`${styles.button} ${styles.sendButton} `}>
              <IoSend className="fs-4"></IoSend>
            </button>
          </div>
          {iframeCode && (
            <div className={`mt-3 ${styles.iframeContainer}`}>
              <h3>Codice per includere nel tuo sito web:</h3>
              <textarea readOnly value={iframeCode} rows="10" cols="80" className="form-control" />
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default WebBot;
