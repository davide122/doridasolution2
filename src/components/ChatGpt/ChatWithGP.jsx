"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FiMic } from "react-icons/fi";
import Loader from "../Loader/Loader"
import Image from "next/image";
import 'tippy.js/dist/tippy.css'; // Questo importa gli stili di base
import Tippy from '@tippyjs/react';

import "./chat.css"
const ChatWithGP = () => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState(null);
  const [isWait, setIsWait] = useState(false);
  const recognitionRef = useRef(null);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [responseReceived, setResponseReceived] = useState(false);

  const phrases = ["Sto pensando...", "Sto cercando la risposta migliore", "Un momento, per favore"];
  // const openAISettings = {
  //   assistantId: "asst_ryDX834UsWaMAUSVrk80X1Th",
  //   openaiApiKey: "sk-proj-WBytRlkT7hAkDrcxRVjyT3BlbkFJ5faMsZE0VRfkTt1AgyGo",
  // };

  const openAISettings = {
    assistantId: process.env.OPENAI_ASSISTANT_ID,
    openaiApiKey: process.env.OPENAI_KEY,
    evenlabsapiKey: process.env.ELEVENLABS_KEY
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPhrase((prevPhrase) => (prevPhrase + 1) % phrases.length);
    }, 2000); // Cambia frase ogni 2 secondi

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const savedThreadId = localStorage.getItem("threadId");
    if (savedThreadId) {
      setThreadId(savedThreadId);
    } else {
      createNewThread();
    }
  }, []);



  const createNewThread = async () => {
    const res = await axios.post(
      "https://api.openai.com/v1/threads",
      {},
      {
        headers: {
          Authorization: `Bearer ${openAISettings.openaiApiKey}`,
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v1",
        },
      }
    );
    const newThreadId = res.data.id;
    setThreadId(newThreadId);
    localStorage.setItem("threadId", newThreadId);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();  // Call a function to stop listening
    } else {
      startListening();  // Starts listening again if not already listening
    }
  };
  
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();  // Stop the speech recognition
      recognitionRef.current = null;  // Reset the reference
    }
    setIsListening(false);  // Update the listening state
    setCurrentPhrase(0);    // Optionally reset the phrase index
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
      
        // Controlla se la risposta è stata ricevuta dopo 50 secondi
        setTimeout(() => {
          if (!responseReceived) {
            playWaitingPhrase();
            // Puoi aggiungere ulteriori controlli e riprodurre messaggi aggiuntivi se necessario
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
    setResponseReceived(false); // Resetta lo stato di ricezione alla nuova richiesta

    try {
      await axios.post(
        `https://api.openai.com/v1/threads/${threadId}/messages`,
        {
          role: "user",
          content: speechToText,
        },
        {
          headers: {
            Authorization: `Bearer ${openAISettings.openaiApiKey}`,
            "Content-Type": "application/json",
            "OpenAI-Beta": "assistants=v1",
          },
        }
      );

      const runRes = await axios.post(
        `https://api.openai.com/v1/threads/${threadId}/runs`,
        {
          assistant_id: openAISettings.assistantId,
        },
        {
          headers: {
            Authorization: `Bearer ${openAISettings.openaiApiKey}`,
            "Content-Type": "application/json",
            "OpenAI-Beta": "assistants=v1",
          },
        }
      );

      await checkRunCompletion(runRes.data.id);
    } catch (error) {
      console.error("Error processing the speech to text result:", error);
      setIsWait(false);
    }
  };

  const checkRunCompletion = async (runId) => {
    try {
      const statusRes = await axios.get(
        `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
        {
          headers: {
            Authorization: `Bearer ${openAISettings.openaiApiKey}`,
            "Content-Type": "application/json",
            "OpenAI-Beta": "assistants=v1",
          },
        }
      );

      if (statusRes.data.status === "completed") {
        fetchMessages();
        setResponseReceived(true);  
      } else if (statusRes.data.status === "failed") {
        alert("Assistant encountered an error.");
        setIsWait(false);
      } else {
        setTimeout(() => checkRunCompletion(runId), 2000);
      }
    } catch (error) {
      console.error("Error checking run completion:", error);
      setIsWait(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const messagesRes = await axios.get(
        `https://api.openai.com/v1/threads/${threadId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${openAISettings.openaiApiKey}`,
            "Content-Type": "application/json",
            "OpenAI-Beta": "assistants=v1",
          },
        }
      );
      const assistantMessages = messagesRes.data.data.filter(
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
      const response = await axios.post(
        "https://api.elevenlabs.io/v1/text-to-speech/eUyfQOl1LW94ySVToNWD",
        {
          text: text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            style: 0.5,
            use_speaker_boost: true,
          },
        },
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
            Accept: "audio/mpeg",
            "xi-api-key": `${openAISettings.evenlabsapiKey}`,
          },
        }
      );
      const audioUrl = URL.createObjectURL(response.data);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Failed to fetch audio from API", error);
    }
  };

  const playWaitingPhrase = async () => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]; // Scegli una frase casuale
    try {
      const response = await axios.post(
        "https://api.elevenlabs.io/v1/text-to-speech/eUyfQOl1LW94ySVToNWD",
        {
          text: randomPhrase,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            style: 0.5,
            use_speaker_boost: true,
          },
        },
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
            Accept: "audio/mpeg",
            "xi-api-key":`${openAISettings.evenlabsapiKey}`,
          },
        }
      );
      const audioUrl = URL.createObjectURL(response.data);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Failed to fetch waiting phrase audio", error);
    }
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
        {isListening ? <FiMic className="text-danger" /> : <FiMic className=" " />}
      </button>
    </Tippy>
    </div>
  );
};

export default ChatWithGP;
