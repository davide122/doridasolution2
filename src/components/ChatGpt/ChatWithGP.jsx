"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FiMic } from "react-icons/fi";
import Loader from "../Loader/Loader"
import Image from "next/image";
import 'tippy.js/dist/tippy.css'; // Questo importa gli stili di base
import Tippy from '@tippyjs/react';
import AudioVisualizer from "../ChatGpt/AudioVisualizer"; // Assicurati che il percorso sia corretto

import "./chat.css"
const ChatWithGP = () => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState(null);
  const [isWait, setIsWait] = useState(false);
  const recognitionRef = useRef(null);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [responseReceived, setResponseReceived] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const phrases = ["Sto pensando...", "Sto cercando la risposta migliore", "Un momento, per favore"];


  useEffect(() => {
    const savedThreadId = localStorage.getItem("threadId");
    if (savedThreadId) {
      setThreadId(savedThreadId);
    } else {
      createNewThread();
    }
  }, []);

  const createNewThread = async () => {
    const res = await fetch("/api/openai/start-thread", {
      method: "POST",
    });

    const newThread = await res.json();
    setThreadId(newThread.id);
    localStorage.setItem("threadId", newThread.id);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
    setCurrentPhrase(0);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "it-IT";
      recognitionRef.current = recognition;
      recognition.start();

      recognition.onresult = async (event) => {
        const speechToText = event.results[0][0].transcript;
        handleSpeechToTextResult(speechToText);
      };

      recognition.onend = () => {
        setIsListening(false);
        setTimeout(() => {
          if (!responseReceived) {
            playWaitingPhrase();
          }
        }, 10000);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      setIsListening(true);
    } else {
      console.error("Speech recognition not supported.");
    }
  };

  const handleSpeechToTextResult = async (speechToText) => {
    setIsWait(true);
    setResponseReceived(false);

    try {
      // Invia il messaggio all'API
      await fetch(`/api/openai/messages/${threadId}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",

        
        },
        body: JSON.stringify({ content: speechToText }),
      });

      // Avvia la run per ottenere la risposta
      const runRes = await fetch(`/api/openai/runs/${threadId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assistantId: "asst_ryDX834UsWaMAUSVrk80X1Th" }),
      });

      const runData = await runRes.json();
      await checkRunCompletion(runData.id);
    } catch (error) {
      console.error("Errore nell'elaborare il risultato:", error);
      setIsWait(false);
    }
  };

  const checkRunCompletion = async (runId) => {
    try {
      const statusRes = await fetch(`/api/openai/completion/${threadId}/${runId}`, {
        method: "GET",
      });

      const statusData = await statusRes.json();
      if (statusData.status === "completed") {
        fetchMessages();
        setResponseReceived(true);
      } else if (statusData.status === "failed") {
        alert("L'assistente ha riscontrato un errore.");
        setIsWait(false);
      } else {
        setTimeout(() => checkRunCompletion(runId), 2000);
      }
    } catch (error) {
      console.error("Errore nel verificare il completamento:", error);
      setIsWait(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const messagesRes = await fetch(`/api/openai/messages/${threadId}`, {
        method: "GET",
      });
      const data = await messagesRes.json();
      const assistantMessages = data.data.filter((msg) => msg.role === "assistant");

      const newMessages = assistantMessages.filter((msg) => !messages.some((m) => m.id === msg.id));
      if (newMessages.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        const lastMessageText = newMessages[newMessages.length - 1].content[0].text.value;

        await sendToEvenlabs(lastMessageText);
        setIsWait(false);
      }
    } finally {
      setIsWait(false);
    }
  };

  const sendToEvenlabs = async (text) => {
    try {
      const response = await fetch('/api/openai/sendtoevenlab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
  
      if (response.ok) {
        const { audio } = await response.json();
        // Decodifica l'audio da base64 e crea un URL
        const audioBlob = new Blob([Uint8Array.from(atob(audio), c => c.charCodeAt(0))], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      } else {
        console.error('Errore nel recuperare l\'audio da ElevenLabs:', await response.json());
      }
    } catch (error) {
      console.error('Errore nel recuperare l\'audio da ElevenLabs:', error);
    }
  };
  const playWaitingPhrase = async () => {
    // Implementa qui la logica per riprodurre una frase di attesa
  };

  return (
    <div>
      {isWait && (
        <div className="Nuvoletta">
          <Image src="/image/loaderrombo.png" width={150} height={150} alt="Nuvoletta Loading" />
        </div>
      )}
      <Tippy content="Clicca per parlare con me" className="fs-5 bg-black">
        <button onClick={toggleListening} className="Call-Button text-center">
          {isListening ? <FiMic className="text-danger" /> : <FiMic className="" />}
        </button>
      </Tippy>
      <div>
        <AudioVisualizer audioUrl={audioUrl} />
      </div>
    </div>
  );
};

export default ChatWithGP;