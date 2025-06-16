"use client";

import React, { useRef, useState, useEffect } from "react";
import "./globals.css";
import Pane from "./pane";

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

const Compose = ({ onFocus, onBlur }: { onFocus?: () => void; onBlur?: () => void }) => {
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
      const res = await fetch(`${process.env.BACKEND_API || 'https://api.jenet.ai'}/model`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: value, context: INSTRUCTIONS }),
      });
      const text = await res.text();
      setResponse(text);
    } catch {
      setResponse('Network error');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('add-pane'));
      handleSend();
    }
  };

  return (
    <Pane className="absolute bottom-0 z-50 w-[700px] flex flex-col items-center !p-0 rounded-2xl" content={
      <>
        {response && (
          <div className="w-full flex-1 max-h-[20lh] p-4 text-lg leading-relaxed rounded-xl overflow-auto">
            <h1 className="text-neutral-700 font-medium">{response}</h1>
          </div>
        )}
        <textarea
          ref={textareaRef}
          className="w-full max-h-[20lh] p-4 text-lg text-neutral-600 leading-relaxed placeholder-neutral-500 rounded-xl resize-none outline-none overflow-auto transition-all duration-300"
          placeholder="compose"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          rows={1}
        />
      </>
    } />
  );
};

export default Compose;
