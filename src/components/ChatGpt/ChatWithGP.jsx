"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FiMic } from "react-icons/fi";
import Loader from "../Loader/Loader";
import Image from "next/image";
import "tippy.js/dist/tippy.css"; // Questo importa gli stili di base
import Tippy from "@tippyjs/react";
import AudioVisualizer from "../ChatGpt/AudioVisualizer"; // Assicurati che il percorso sia corretto

import "./chat.css";
const ChatWithGP = () => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState(null);
  const [isWait, setIsWait] = useState(false);
  const recognitionRef = useRef(null);
  const [responseReceived, setResponseReceived] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
const [finish, setfinish] = useState(false);
const [domanda,setdomanda] = useState("");
const [tip,settip]=useState(false)
  const phrases = [
    "Sto pensando...",
    "Sto cercando la risposta migliore",
    "Un momento, per favore",
  ];

  useEffect(() => {
    // Imposta un threadId nuovo per ogni sessione del browser
    if (!sessionStorage.getItem("threadId")) {
      createNewThread();
    } else {
      setThreadId(sessionStorage.getItem("threadId"));
    }
  }, []);

  const createNewThread = async () => {
    const res = await fetch("/api/openai/start-thread", {
      method: "POST",
    });

    const newThread = await res.json();
    setThreadId(newThread.id);
    sessionStorage.setItem("threadId", newThread.id);
  };

  const toggleListening = () => {
    settip(true)
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
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "it-IT";
      recognitionRef.current = recognition;
      recognition.start();

      recognition.onresult = async (event) => {
        const speechToText = event.results[0][0].transcript;

        handleSpeechToTextResult(speechToText);
        setdomanda(speechToText)
        handleSendQuestion(speechToText)
      };

      recognition.onend = () => {
        setIsListening(false);
        setTimeout(() => {
          if (!responseReceived) {
            // playWaitingPhrase();
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
      const statusRes = await fetch(
        `/api/openai/completion/${threadId}/${runId}`,
        {
          method: "GET",
        }
      );

      const statusData = await statusRes.json();
      if (statusData.status === "completed") {
        fetchMessages();
        setResponseReceived(true);
      } else if (statusData.status === "failed") {
        alert("L'assistente ha riscontrato un errore.");
        setIsWait(false);
      } else {
        setTimeout(() => checkRunCompletion(runId), 700);
      }
    } catch (error) {
      console.error("Errore nel verificare il completamento:", error);
      setIsWait(true);
    }
  };

  const fetchMessages = async () => {
    try {
      const messagesRes = await fetch(`/api/openai/messages/${threadId}`, {
        method: "GET",
      });
      const data = await messagesRes.json();
      const assistantMessages = data.data.filter(
        (msg) => msg.role === "assistant"
      );

      const newMessages = assistantMessages.filter(
        (msg) => !messages.some((m) => m.id === msg.id)
      );
      if (newMessages.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        const lastMessageText =
          newMessages[newMessages.length - 1].content[0].text.value;

        await sendToEvenlabs(lastMessageText);
        setIsWait(false);
      }
    } finally {
      setIsWait(false);
    }
  };

  const sendToEvenlabs = async (text) => {
    try {
      const response = await fetch("/api/openai/sendtoevenlab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const { audio } = await response.json();
        // Decodifica l'audio da base64 e crea un URL
        const audioBlob = new Blob(
          [Uint8Array.from(atob(audio), (c) => c.charCodeAt(0))],
          { type: "audio/mpeg" }
        );
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        audio.onended = () => {
          setfinish(true)
        }
      } else {
        console.error(
          "Errore nel recuperare l'audio da ElevenLabs:",
          await response.json()
        );
      }
    } catch (error) {
      console.error("Errore nel recuperare l'audio da ElevenLabs:", error);
    }
  };
 
  const handleSendQuestion = async (userQuestion) => {
    try {
        const response = await fetch('/api/openai/savedata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ domanda: userQuestion })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setDomanda(result); // Supponendo che l'API restituisca l'oggetto intero salvato
    } catch (error) {
        console.error("Failed to fetch: ", error);
    }
};

  return (
    <div>
      <Tippy content="Parla con nova" className={`fs-6 bg-black ${tip && "d-none"}`} animateFill={true} animation="scale" placement="bottom" duration={100} visible hideOnClick={true} inertia moveTransition="10px"  >
      <button
          onClick={toggleListening}
          className={`Call-Button text-center ${isWait ? 'is-loading' : ''}`}
        >
          {isListening ? (
            <FiMic className="text-danger" />
          ) : (
            <FiMic className="" />
          )}
        </button>
      </Tippy>
      <div>
        <AudioVisualizer audioUrl={audioUrl} />
      </div>
    </div>
  );
};

export default ChatWithGP;
