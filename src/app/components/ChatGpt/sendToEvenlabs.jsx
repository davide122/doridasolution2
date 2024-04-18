

const sendToEvenlabs = async (text) => {
  const response = await axios.post(
    'https://api.elevenlabs.io/v1/text-to-speech/efJVaDDMBq2ch2Qf4phN',
    {
      text: text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5,
        style: 0.5,
        use_speaker_boost: true,
      }
    },
    {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
        'xi-api-key': `${process.env.REACT_APP_EVENLABS_KEY}`
      }
    }
  );
  return URL.createObjectURL(response.data);
};

export { sendToEvenlabs };
