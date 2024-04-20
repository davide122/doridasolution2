import { useState } from 'react';
import { askGPT } from './askGPT';
import { sendToEvenlabs } from './sendToEvenlabs';

const useSpeechToTextResponse = (onResponseEnd) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSpeechToTextResult = async (speechToText) => {
    setIsLoading(true);
    try {
      const gptResponse = await askGPT(speechToText);
      await playResponse(gptResponse);
      return gptResponse;
    } catch (error) {
      setError('Errore durante l\'elaborazione della richiesta.');
      throw error;  // Rilancia l'errore per gestioni esterne
    } finally {
      setIsLoading(false);
    }
  };

  const playResponse = async (text) => {
    try {
      const audioUrl = await sendToEvenlabs(text);
      const audio = new Audio(audioUrl);
      audio.onended = onResponseEnd;
      await audio.play();
    } catch (error) {
      console.error('Error playing the response', error);
      setError('Errore durante la riproduzione della risposta.');
      throw error;  // Rilancia l'errore per ulteriori gestioni
    }
  };

  return { handleSpeechToTextResult, isLoading, error };
};

export default useSpeechToTextResponse;
