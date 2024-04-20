"use client"
import React, { useState, useRef, useEffect } from 'react';
import { BsMic, BsMicFill } from "react-icons/bs";
import useSpeechToTextResponse from './useSpeechTextResponse';
import "./chat.css"

const ChatWithGPT = () => {
  const [isListening, setIsListening] = useState(false);
  const [responseText, setResponseText] = useState('');
  const recognitionRef = useRef(null);
  
  const { handleSpeechToTextResult, isLoading, error } = useSpeechToTextResponse();

  // Funzione per gestire l'ascolto e la logica di stop/riavvio
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current && recognitionRef.current.stop();
      setIsListening(false);
    } else {
      startListening();
    }
  };

  const startListening = () => {
    setResponseText('');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'it-IT';
      recognitionRef.current = recognition;
      recognition.start();

      recognition.onresult = async (event) => {
        const speechToText = event.results[0][0].transcript;
        const response = await handleSpeechToTextResult(speechToText);
        setResponseText(response);
        toggleListening(); // Stop after processing and require a new click to start
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      setIsListening(true);
    } else {
      console.error("Speech recognition not supported.");
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  return (
    <div>
      <button onClick={toggleListening} disabled={isLoading} className='Call-Button'>
        {isListening ? <BsMicFill /> : <BsMic />}
      </button>
      <div className='Chat'>
        {isLoading && <p>Loading...</p>}
        {responseText && <p>{responseText}</p>}
        {error && <p>Error: {error}</p>}
      </div>
    </div>
  );
};

export default ChatWithGPT;
