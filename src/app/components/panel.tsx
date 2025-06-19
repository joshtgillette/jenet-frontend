import Pane from "./pane";
import React, { useRef, useEffect, useState } from "react";

const INSTRUCTIONS = `
Categorize the input text into one of the following groups. The entire input text MUST represent the category, otherwise it is TEXT. If the input merely contains text that corresponds to a category, but there is additional unclassified text, then that input should be labeled as TEXT. So for example "How's Jaden Gillette?" or "Josh Gillette at 9:00am" is TEXT. Lastly, newlines (\\n) in the input indicate separate inputs, with each corresponnding classification provided in a comma separated list. ONLY newlines will result in multiple classifications, and these classifications should be returned in a comma separated list.

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
TEXT: General human language, catch-all category if no others are a match.
`

type Message = {
  text: string;
  sender: string;
}

export type PanelData = {
  id: number;
  content?: React.ReactNode;
  className?: string;
};

const Panel = ({
  onClose,
  content
}: {
  onClose: () => void;
  content?: React.ReactNode;
}) => {
  const hasRan = useRef(false);
  const messagesHeaderRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [composeText, setComposeText] = useState("");
  const [modelText, setModelText] = useState("");
  // const [value, setValue] = useState("");

  useEffect(() => {
    // Prevent this useEffect() from running twice
    if (hasRan.current) return;
    hasRan.current = true

    // Scroll messages to the bottom/most recent
    if (messagesContainerRef.current) {
      // Scroll to bottom
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;

      // Use top padding to fit dynamic header
      if (messagesHeaderRef.current) {
        messagesContainerRef.current.style.paddingTop = `${messagesHeaderRef.current.offsetHeight + 40}px`;
      }
    }

    // Adjust text area size for content
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }

    // Fetch stored messages from backend
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/message`)
      .then(res => res.json())
      .then((res: [string, string[]]) => {
        const newMessages: Message[] = Object.entries(res).map(([, value]) => ({
          text: value[1],
          sender: value[0]
        }));
        setMessages(prev => [...prev, ...newMessages]);
      })
      .catch(err => {
        console.error("API error:", err);
      })
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComposeText(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";

      if (messagesContainerRef.current) {
        if (textareaRef.current) {
          // Use bottom padding to fit dynamic textarea
          messagesContainerRef.current.style.paddingBottom = `${textareaRef.current.offsetHeight + 71}px`;

          // If scrolled to bottom, maintain state
          if (messagesContainerRef.current.scrollTop +
            messagesContainerRef.current.clientHeight >= messagesContainerRef.current.scrollHeight - 100) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
          }
        }
      }
    }
  }

  // Monitor composition textarea to perform model query
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!composeText) {
        setModelText("");
        return;
      }

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/model`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: composeText, context: INSTRUCTIONS }),
      })
      .then(res => res.text())
      .then(data => {
        const classes = data.split(",")
        if (classes.length == 1 && classes[0] == "TEXT") {
          setModelText("");
          return;
        }

        setModelText(data)
      })
    }, 500);

    return () => clearTimeout(handler);
  }, [composeText]);

  // Send a message to the backend and append to view
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const sendMessage = async () => {
    if (!composeText.trim()) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: composeText }),
      });
      if (res.status == 200) {
        setMessages(prev => [...prev, { text: composeText, sender: "me" }]);
        setComposeText("");
      }
    } catch {
      console.error("API error");
    }
  }

  // Update bottom scroll state on message thread change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Pane className="flex-1 flex overflow-none !p-0" content={
      <>
        <div
          ref={messagesHeaderRef}
          className="glass absolute top-4 right-4 left-4 flex-col p-3">
          <h1 className="text-lg">{content}</h1>
          <h1 className="text-sm italic text-green-700 mt-0 ml-0.5">active now</h1>
        </div>
        <div
          ref={messagesContainerRef}
          className="w-full flex-1 flex flex-col justify-end gap-4 pr-4 pb-[95px] pl-4 overflow-auto"
          onClick={onClose}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`w-full flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-3.5 py-2.5 text-base break-words rounded-xl ${msg.sender === 'me'
                  ? 'bg-[rgb(237,237,237)]/60 text-gray-800 ring-1 ring-gray-200'
                  : 'bg-[rgb(220,220,220)]/10 text-gray-900 ring-1 ring-gray-200'
                  }`}
              >
                <h1>{msg.text}</h1>
              </div>
            </div>
          ))}
          {modelText && (
            <div className="right-10 mb-[-15px] w-full flex justify-end">
              <div
                className="glass max-w-[75%] mr-3 px-3.5 py-2.5 text-base break-words"
              >
                <h1>{modelText}</h1>
              </div>
            </div>
          )}
        </div>
        <div className="glass absolute bottom-4 right-4 left-4 gap-2 p-4 items-center">
          <textarea
            ref={textareaRef}
            value={composeText}
            className="max-h-[20lh] flex-1 resize-none leading-releaxed outline-none overflow-auto"
            placeholder="start talking"
            rows={1}
            onChange={handleChange}
            onKeyDown={handleKeyDown} />
            <button
              className={`flex items-center text-gray-600 hover:text-black text-xl font-bold focus:outline-none cursor-pointer ${composeText ? "group-hover:opacity-100" : "opacity-0"} transition-opacity self-end`}
              aria-label="Send message"
              onClick={sendMessage}>
              <span className="material-icons">arrow_upward</span>
            </button>
        </div>
      </>
    } />
  );
}

export default Panel;
