"use client"
import React, { useState, useEffect } from 'react';

const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [threadId, setThreadId] = useState(null);
    console.log(threadId)
    const [runId, setRunId] = useState(null);
    const [isWait, setIsWait] = useState(false);
    const [error, setError] = useState('');


    const openAISettings = {
        assistantId: "asst_ryDX834UsWaMAUSVrk80X1Th",
        openaiApiKey: "sk-proj-yVByJOGuY53RXnYPodkxT3BlbkFJyDWUV8gJ0VP0y7sxarIK"
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAISettings.openaiApiKey}`,
        "OpenAI-Beta": "assistants=v1"
    };

    useEffect(() => {
        if (!openAISettings.assistantId || !openAISettings.openaiApiKey) {
            alert('The OpenAI settings are empty');
        }
    }, []);

    const send = async () => {
        if (!text || isWait) return alert("Please wait for the current processing to complete or enter some text.");

        addMessage({ role: "user", text: text, created_at: Date.now() });
        setIsWait(true);
        setText('');
        try {
            if (!threadId) {
                const threadResponse = await post("https://api.openai.com/v1/threads", {});
                setThreadId(threadResponse.id); // Wait to set the thread ID
                if (!threadResponse.id) throw new Error("Failed to create thread");
                // Continue with the rest of the logic once the thread ID is set
                await continueWithThread(threadResponse.id);
            } else {
                await continueWithThread(threadId);
            }
        } catch (e) {
            setError('Failed to send message');
            setIsWait(false);
            console.error('Error:', e);
        }
    };


    const continueWithThread = async (id) => {
        await post(`https://api.openai.com/v1/threads/${id}/messages`, {
            role: "user",
            content: text
        });

        const runResponse = await post(`https://api.openai.com/v1/threads/${id}/runs`, {
            assistant_id: openAISettings.assistantId
        });
        setRunId(runResponse.id);

        checkRun();
    };


    const checkRun = async (threadId) => {
        // Aggiungi questo controllo per assicurarti che non procedi se mancano i dati necessari.
        if (!threadId || !runId) {
            console.error("Attempted to check run status without valid threadId or runId:", threadId, runId);
             // Termina la funzione se threadId o runId sono nulli.
        }
    
        try {
            const res = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
                headers
            });
            const data = await res.json();
            if (data.status === 'completed') {
                addMessage({ role: "assistant", text: data.choices[0].message.content, created_at: Date.now() });
                setIsWait(false);
            } else if (data.status === 'failed') {
                alert('Assistant encountered an error.');
            } else {
                setTimeout(checkRun, 2000); // Riprova dopo un intervallo di tempo.
            }
        } catch (e) {
            console.error('Checking error:', e);
        }
    };

    const addMessage = (msg) => {
        setMessages(prevMessages => [...prevMessages, msg]);
    };

    const post = async (url, body) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });
        return await res.json();
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}><b>{msg.role === 'user' ? 'You' : 'Assistant'}:</b> {msg.text}</p>
                ))}
            </div>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={send}>Send</button>
            {isWait && <p>Processing...</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default ChatComponent;
