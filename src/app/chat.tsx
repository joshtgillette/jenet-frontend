"use client";

import React, { useRef, useState, useEffect } from "react";
import "./globals.css";

const Chat = () => {
  const [value, setValue] = useState("");
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

  return (
    <div
      className="fixed bottom-3 right-3 z-50 min-w-110 max-h-full flex flex-col p-4 border-2 border-transparent rounded-2xl bg-[#f4f6fa]/90 backdrop-blur-md shadow-[0_2px_16px_0_rgba(80,120,255,0.18),0_0_8px_2px_rgba(80,120,255,0.12)] ring-1 ring-blue-300/40 hover:shadow-[0_4px_32px_0_rgba(80,120,255,0.30),0_0_16px_4px_rgba(80,120,255,0.22)] hover:ring-2 hover:ring-blue-400/70 focus-within:shadow-[0_4px_32px_0_rgba(80,120,255,0.30),0_0_16px_4px_rgba(80,120,255,0.22)] focus-within:ring-2 focus-within:ring-blue-400/70 transition-all duration-300"
      style={{}}
    >
      <textarea
        ref={textareaRef}
        className="w-full max-h-[10lh] p-3 pt-2.5 rounded-xl bg-white/60 backdrop-blur-md border border-neutral-200 focus:border-neutral-300 shadow-md text-base leading-relaxed placeholder-neutral-400 resize-none focus:outline-none focus:transition overflow-auto"
        placeholder="ask jenet"
        value={value}
        onChange={handleChange}
        rows={1}
      />
    </div>
  );
};

export default Chat;
