"use client";

import React, { useRef, useState, useEffect } from "react";
import "./globals.css";
import Pane from "./components/pane";

const Compose = ({
  onFocus,
  onBlur,
}: {
  onFocus?: () => void;
  onBlur?: () => void;
}) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("add-pane"));
    }
  };

  return (
    <Pane
      className="absolute bottom-0 z-50 w-[700px] flex flex-col items-center !p-0 rounded-2xl"
      content={
        <>
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
      }
    />
  );
};

export default Compose;
