"use client";

import React, { useRef, useState, useEffect } from "react";
import "./globals.css";

const Chat = ({ className = "", placeholder = "", instructions = "" }: {
  className?: string;
  placeholder?: string;
  instructions?: string;
}) => {
  const [value, setValue] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!value.trim()) return;
      setLoading(true);
      setResponse("");
      try {
        const res = await fetch("/api/chatgpt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: value, instructions }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "API error");
        setResponse(data.response);
      } catch (err) {
        setResponse("Error: " + (err as Error).message);
      }
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col gap-3 p-3 border-2 border-transparent rounded-2xl bg-[#f4f6fa]/90 backdrop-blur-md shadow-[0_2px_16px_0_rgba(80,120,255,0.18),0_0_8px_2px_rgba(80,120,255,0.12)] ring-1 ring-blue-300/40 hover:shadow-[0_4px_32px_0_rgba(80,120,255,0.30),0_0_16px_4px_rgba(80,120,255,0.22)] hover:ring-2 hover:ring-blue-400/70 focus-within:shadow-[0_4px_32px_0_rgba(80,120,255,0.30),0_0_16px_4px_rgba(80,120,255,0.22)] focus-within:ring-2 focus-within:ring-blue-400/70 transition-all duration-300 ${className}`}
    >
      {loading && <div className="text-xs text-blue-500 mt-2">Loading...</div>}
      {response && <div className="w-full p-3 pt-2.5 rounded-xl bg-white/60 backdrop-blur-md border border-neutral-200 focus:border-neutral-300 shadow-md text-base leading-relaxed placeholder-neutral-400 resize-none focus:outline-none focus:transition overflow-none">{response}</div>}
      <textarea
        ref={textareaRef}
        className="w-full max-h-[10lh] p-3 pt-2.5 rounded-xl bg-white/60 backdrop-blur-md border border-neutral-200 focus:border-neutral-300 shadow-md text-base leading-relaxed placeholder-neutral-400 resize-none focus:outline-none focus:transition overflow-none"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={1}
      />
    </div>
  );
};

export default Chat;
