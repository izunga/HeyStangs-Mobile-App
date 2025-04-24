import React, { useState } from "react";
import { queryHuggingFace } from "./huggingFaceApi";

const HuggingFaceChat = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    try {
      const prompt =
        "You are an AI Agent that gives ethical advice to Southern Methodist University (SMU) undergraduate students. You will receive a prompt from the user asking you a question in regards to campus life, campus etiquette, and any student ethical dilemmas. The following is the user prompt: " +
        input;
  
      const result = await queryHuggingFace(prompt);
      setResponse(result[0]?.generated_text || "No response");
    } catch (error) {
      console.error(error);
      setResponse("Error fetching response");
    }
  };
  

  return (
    <div>
      <h1>Hugging Face API Chat</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={handleSubmit}>Send</button>
      <p>Response: {response}</p>
    </div>
  );
};

export default HuggingFaceChat;
