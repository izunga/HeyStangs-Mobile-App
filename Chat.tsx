import { Card } from "compositions";
import { Flex } from "layout";
import { TextSmall } from "primitives";
import BackButton from "../components/BackButton.tsx";
import {TextArea} from "react-aria-components";
import React, { useEffect, useState } from "react";
import { queryOpenAI } from "../backend/openaiApi.ts";

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);
  const [handbookText, setHandbookText] = useState(""); // ✅ this line is what was missing

  useEffect(() => {
    fetch("/handbookText.txt")
      .then((res) => res.text())
      .then((text) => setHandbookText(text));
  }, []);

  const handleSubmit = async () => {
    if (!input.trim()) return;
  
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages); // update state so user message shows
  
    const prompt = `You are Stang, an AI assistant trained to provide ethical guidance specifically for Southern Methodist University (SMU) undergraduate students.

    Your primary role is to offer clear, respectful, and accurate responses to ethical questions or dilemmas submitted by students in 200 characters or less. You should always maintain a tone that is approachable, supportive, and rooted in SMU’s core values: academic honesty, moral courage, personal integrity, and sincere respect for others.
    
    Your responses must be:
    - Written in simple English that an undergraduate student can understand.
    - No longer than 300 characters.
    - Directly relevant to the student’s question.
    - Ethical in nature (i.e., focused on what is the right thing to do).
    - Grounded in SMU-specific principles and, when appropriate, policy.
    
    You are encouraged to use widely accepted ethical theories when reasoning through answers, including but not limited to:
    - Consequentialism (considering the outcomes of actions),
    - Deontology (duty- and rule-based ethics),
    - Virtue ethics (focusing on moral character),
    - Social contract theory (mutual agreement and community standards),
    - And justice or fairness-based ethics.
    
    These models should align with the teachings from *Ethics for the Information Age* by Michael J. Quinn. When appropriate, reference the ethical approach that best supports your advice — especially in ambiguous situations or when SMU policy doesn’t provide a direct answer.
    
    If the student’s question clearly relates to something covered in the SMU Handbook (such as academic integrity, student conduct, alcohol policies, or community standards), incorporate relevant sections or language from the handbook to support your answer.
    
    Do not fabricate handbook content. If you are unsure or the handbook provides no guidance, give your best ethical answer based on the values of SMU and the ethical models referenced above.
    
    Below is a question from a student. Please provide your ethical advice.
    
    Student: ${input}
    
    Relevant: SMU Handbook Content:
    ${handbookText.slice(0, 2000)}
    
    AI:`;
    
    try {
      setInput(""); // clear input box
  
      const response = await queryOpenAI(prompt); // call the OpenAI API
      const aiReply = response.trim(); // ensure clean response
  
      setMessages([...newMessages, { role: "ai", content: aiReply }]); // update messages
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { role: "ai", content: "Sorry, something went wrong. Try again!" },
      ]);
    }
  };
  
  

  return (
    <div className="w-[375px] h-[812px] bg-slate-800 relative overflow-hidden">
      {/* Top Bar */}
      <div className="absolute w-full h-14 top-0 left-0 bg-[#354ca1] flex items-center px-4">
        <BackButton />
        <div className="flex-1 text-center">
          <span className="text-white text-xs tracking-wide font-['Roboto'] capitalize">
            ASK STANG
          </span>
        </div>
      </div>

      {/* Welcome Message */}
      <Flex
        direction="row"
        className="absolute top-[67px] left-[12px] items-start"
      >
        <img
          src="/images/PerunaR.png"
          className="rounded-full shadow-md w-6 h-6"
        />
        <Card className="rounded-[20px] bg-gray-700 w-72 p-4">
          <TextSmall className="text-white font-light text-xs">
            Hi, I’m Stang! What question do you have for me today?
          </TextSmall>
        </Card>
      </Flex>

      {/* Chat History */}
      <div className="absolute top-[140px] w-full flex flex-col gap-2 items-center px-3 overflow-y-auto max-h-[500px] pb-32">
      {messages.map((msg, index) => (
          <Flex
            key={index}
            direction="row"
            className={`w-full items-start justify-start gap-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "ai" && (
              <img
                src="/images/PerunaR.png"
                className="rounded-full shadow-md w-6 h-6"
                />
            )}
            <Card
              className={`rounded-[20px] p-3 w-72 ${
                msg.role === "ai"
                  ? "bg-gray-700"
                  : "bg-gray-800 self-end text-right"
              }`}
            >
              <TextSmall className="text-white text-xs font-light">
                {msg.content}
              </TextSmall>
            </Card>
          </Flex>
        ))}
      </div>

      {/* Input Box */}
      <div className="absolute bottom-5 w-full px-[25px]">
  <div className="relative w-full bg-black/25 rounded-[10px] p-2">
    <TextArea
      className="w-full h-20 bg-transparent text-white font-['Inter'] resize-none outline-none"
      placeholder="Ask your question here!"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSubmit();
        }
      }}
    />
  </div>
  <div className="mt-2 flex justify-end pr-1">
    <button
      onClick={handleSubmit}
      className="text-white bg-blue-600 px-4 py-1 rounded-full hover:bg-blue-700 transition-all text-xs"
    >
      Send
    </button>
  </div>
</div>

      </div>

  );
}

export default Chat;
