// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// const ChatWithGPT = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [threadId, setThreadId] = useState(null);
//   const [isWait, setIsWait] = useState(false);
//   const recognitionRef = useRef(null);

//   const openAISettings = {
//     assistantId: "asst_ryDX834UsWaMAUSVrk80X1Th",
//     openaiApiKey: "sk-proj-WBytRlkT7hAkDrcxRVjyT3BlbkFJ5faMsZE0VRfkTt1AgyGo",
//   };

//   useEffect(() => {
//     const savedThreadId = localStorage.getItem("threadId");
//     if (savedThreadId) {
//       setThreadId(savedThreadId);
//     } else {
//       createNewThread();
//     }
//   }, []);

//   const createNewThread = async () => {
//     const res = await axios.post(
//       "https://api.openai.com/v1/threads",
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${openAISettings.openaiApiKey}`,
//           "Content-Type": "application/json",
//           "OpenAI-Beta": "assistants=v1",
//         },
//       }
//     );
//     const newThreadId = res.data.id;
//     setThreadId(newThreadId);
//     localStorage.setItem("threadId", newThreadId);
//   };

//   const toggleListening = () => {
//     if (isListening) {
//       recognitionRef.current && recognitionRef.current.stop();
//       setIsListening(false);
//     } else {
//       startListening();
//     }
//   };

//   const startListening = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition();
//       recognition.lang = "it-IT";
//       recognitionRef.current = recognition;
//       recognition.start();

//       recognition.onresult = async (event) => {
//         const speechToText = event.results[0][0].transcript;
//         handleSpeechToTextResult(speechToText);
//       };

//       recognition.onend = () => {
//         setIsListening(false);
//       };

//       recognition.onerror = (event) => {
//         console.error("Speech recognition error", event.error);
//         setIsListening(false);
//       };

//       setIsListening(true);
//     } else {
//       console.error("Speech recognition not supported.");
//     }
//   };

//   const handleSpeechToTextResult = async (speechToText) => {
//     setIsWait(true);
//     try {
//       await axios.post(
//         `https://api.openai.com/v1/threads/${threadId}/messages`,
//         {
//           role: "user",
//           content: speechToText,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${openAISettings.openaiApiKey}`,
//             "Content-Type": "application/json",
//             "OpenAI-Beta": "assistants=v1",
//           },
//         }
//       );

//       const runRes = await axios.post(
//         `https://api.openai.com/v1/threads/${threadId}/runs`,
//         {
//           assistant_id: openAISettings.assistantId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${openAISettings.openaiApiKey}`,
//             "Content-Type": "application/json",
//             "OpenAI-Beta": "assistants=v1",
//           },
//         }
//       );

//       await checkRunCompletion(runRes.data.id);
//     } catch (error) {
//       console.error("Error processing the speech to text result:", error);
//       setIsWait(false);
//     }
//   };

//   const checkRunCompletion = async (runId) => {
//     try {
//       const statusRes = await axios.get(
//         `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${openAISettings.openaiApiKey}`,
//             "Content-Type": "application/json",
//             "OpenAI-Beta": "assistants=v1",
//           },
//         }
//       );

//       if (statusRes.data.status === "completed") {
//         fetchMessages();
//       } else if (statusRes.data.status === "failed") {
//         alert("Assistant encountered an error.");
//         setIsWait(false);
//       } else {
//         setTimeout(() => checkRunCompletion(runId), 2000);
//       }
//     } catch (error) {
//       console.error("Error checking run completion:", error);
//       setIsWait(false);
//     }
//   };

//   const fetchMessages = async () => {
//     try {
//       const messagesRes = await axios.get(
//         `https://api.openai.com/v1/threads/${threadId}/messages`,
//         {
//           headers: {
//             Authorization: `Bearer ${openAISettings.openaiApiKey}`,
//             "Content-Type": "application/json",
//             "OpenAI-Beta": "assistants=v1",
//           },
//         }
//       );
//       const assistantMessages = messagesRes.data.data.filter(
//         (msg) => msg.role === "assistant"
//       );
//       const newMessages = assistantMessages.filter(
//         (msg) => !messages.some((m) => m.id === msg.id)
//       );
//       if (newMessages.length > 0) {
//         setMessages((prevMessages) => [...prevMessages, ...newMessages]);
//         const lastMessageText =
//           newMessages[newMessages.length - 1].content[0].text.value;

//         await sendToEvenlabs(lastMessageText);
//       }
//     } finally {
//       console.log(data.content.value);
//       setIsWait(false);
//     }
//   };
//   const sendToEvenlabs = async (text) => {
//     try {
//       const response = await axios.post(
//         "https://api.elevenlabs.io/v1/text-to-speech/nbdZtLHvNaaIWHukxWca",
//         {
//           text: text,
//           model_id: "eleven_multilingual_v2",
//           voice_settings: {
//             stability: 0.5,
//             similarity_boost: 0.5,
//             style: 0.5,
//             use_speaker_boost: true,
//           },
//         },
//         {
//           responseType: "blob",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "audio/mpeg",
//             "xi-api-key": "ecbae933bc567ab52fcb34df67265a6c",
//           },
//         }
//       );
//       const audioUrl = URL.createObjectURL(response.data);
//       const audio = new Audio(audioUrl);
//       audio.play();
//     } catch (error) {
//       console.error("Failed to fetch audio from API", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={toggleListening}>
//         {isListening ? "Stop Listening" : "Parla"}
//       </button>
//       <div>
//         {messages.map((msg, index) => (
//           <p key={index}>
//             <b>{msg.role === "user" ? "Tu" : "Assistente"}:</b>
//             {msg.content[0].text.value}
//           </p>
//         ))}
//       </div>
//       {isWait && <p>Processing...</p>}
//     </div>
//   );
// };

const NewBot = () => {
    return (
        <div className="bg-black vh-100 d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-around w-50">
                <div className="rounded-circle bg-white" style={{ width: '200px', height: '200px' }}></div>
                <div className="rounded-circle bg-white" style={{ width: '200px', height: '200px' }}></div>
                <div className="rounded-circle bg-white" style={{ width: '200px', height: '200px' }}></div>
                <div className="rounded-circle bg-white text-black  fs-1" style={{ width: '200px', height: '200px', opacity:0.4}}>+</div>

            </div>
        </div>
    );
};

export default NewBot;
