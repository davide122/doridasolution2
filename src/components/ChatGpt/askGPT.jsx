const askGPT = async (question) => {
    const response = await fetch("/api/chatgpt", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch from API');
    }
  
    const data = await response.json();
    return data.message;};
  
  export { askGPT };
  