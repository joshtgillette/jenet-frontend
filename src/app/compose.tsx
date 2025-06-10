"use client";

import React, { useRef, useState, useEffect } from "react";
import "./globals.css";

const INSTRUCTIONS = `
Classify the input text into one of the following categories. The entire input text MUST represent the category, otherwise it is LANGUAGE. So for example "How's Jaden Gillette?" is LANGUAGE. Lastly, each newline in the text should be treated as separate inputs, with return values provided in a comma separated list.

NUMBER: A number
PRICE: A price
DATE: A date
TIME: A time of day
NAME: A person's name
CITY: A U.S city
ADDRESS: A street address
ORDER_NUMBER: A random collection of numbers and letters
TRACKING_NUMBER: An order number, but with a "T-" prefix
AIRPORT: A U.S airport name or code
LANGUAGE: Spoken language, catch-all category if no others are a match.
`

const Compose = () => {
  const [value, setValue] = useState("");
  const [response, setResponse] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  const handleSend = async () => {
    if (!value.trim()) return;
    try {
      const res = await fetch('/api/chatgpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: value, instructions: INSTRUCTIONS }),
      });
      const data = await res.json();
      if (data.response) {
        setResponse(data.response);
      } else if (data.error) {
        setResponse('Error: ' + data.error);
      }
    } catch {
      setResponse('Network error');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="absolute bottom-0 w-full max-w-175 pb-0.5 flex flex-col gap-4 z-50 items-center"
    >
      {response && (
        <div className="w-full max-h-[20lh] p-4 rounded-xl bg-white/60 backdrop-blur-md shadow-[0_2px_32px_0_rgba(80,120,255,0.28),0_0_16px_4px_rgba(80,120,255,0.18)] text-lg leading-relaxed placeholder-neutral-400 resize-none focus:outline-none focus:transition overflow-auto rounded-2xl bg-[#f4f6fa]/90 backdrop-blur-md ring-3 ring-indigo-400/30 hover:shadow-[0_4px_32px_0_rgba(80,120,255,0.30),0_0_16px_4px_rgba(80,120,255,0.22)] hover:ring-3 hover:ring-indigo-400/60 focus-within:shadow-[0_4px_32px_0_rgba(80,120,255,0.30),0_0_16px_4px_rgba(80,120,255,0.22)] focus-within:ring-3 focus-within:ring-indigo-400/60 transition-all duration-300">
          <h1>{response}</h1>
        </div>
      )}
      <textarea
        ref={textareaRef}
        className="w-full max-h-[20lh] p-4 rounded-xl bg-white/60 backdrop-blur-md shadow-[0_2px_32px_0_rgba(80,120,255,0.28),0_0_16px_4px_rgba(80,120,255,0.18)] text-lg leading-relaxed placeholder-neutral-400 resize-none focus:outline-none focus:transition overflow-auto rounded-2xl bg-[#f4f6fa]/90 backdrop-blur-md ring-3 ring-indigo-400/30 hover:shadow-[0_4px_32px_0_rgba(80,120,255,0.30),0_0_16px_4px_rgba(80,120,255,0.22)] hover:ring-3 hover:ring-indigo-400/60 focus-within:shadow-[0_4px_32px_0_rgba(80,120,255,0.30),0_0_16px_4px_rgba(80,120,255,0.22)] focus-within:ring-3 focus-within:ring-indigo-400/60 transition-all duration-300"
        placeholder="compose"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={1}
      />
    </div>
  );
};

export default Compose;
