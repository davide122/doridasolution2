const sendToEvenlabs = async (text) => {
  const response = await fetch('/api/evenlabs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch audio from API');
  }

  const blobUrl = await response.blob(); // Converti la risposta blob in un URL
  return URL.createObjectURL(blobUrl);
};

export { sendToEvenlabs };
