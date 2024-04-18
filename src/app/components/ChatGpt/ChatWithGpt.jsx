import React, { useState, useEffect } from 'react';
import { BsMic, BsMicFill } from "react-icons/bs";
import useSpeechToTextResponse from './useSpeechTextResponse';
import "./chat.css"

const ChatWithGPT = () => {
  const [isListening, setIsListening] = useState(false);
  const [responseText, setResponseText] = useState('');
  
  const { handleSpeechToTextResult, isLoading, error } = useSpeechToTextResponse();

  // Funzione per iniziare ad ascoltare l'input vocale
  const startListening = () => {
    if (typeof window !== "undefined" && window.webkitSpeechRecognition) {
      setIsListening(true);
      setResponseText('');
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'it-IT';
      recognition.start();

      recognition.onresult = async (event) => {
        const speechToText = event.results[0][0].transcript;
        const response = await handleSpeechToTextResult(speechToText);
        setResponseText(response);
      };

      recognition.onend = () => {
        setIsListening(false);
        console.log('onResponseEnd called, trying to restart listening...');
        startListening(); // Riascolta automaticamente al termine
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    } else {
      console.error("Speech recognition not supported.");
    }
  };

  useEffect(() => {
    // Assicurati di non avviare il riconoscimento vocale fino a quando il componente non è montato nel DOM
    return () => {
      if (isListening) {
        recognition && recognition.stop();
      }
    };
  }, [isListening]);

  return (
    <div>
      <button onClick={startListening} disabled={isListening || isLoading} className='Call-Button'>
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