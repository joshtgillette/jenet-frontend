import Pane from "./pane";
import React, { useRef, useEffect } from "react";

const randomMessages = [
  { text: "Hey!", sender: "me" },
  { text: "Did you see the game last night? It was absolutely incredible, I can't believe that final play!", sender: "other" },
  { text: "I'll be there in 10 minutes.", sender: "me" },
  { text: "Can you send me the file?", sender: "other" },
  { text: "That sounds awesome!", sender: "me" },
  { text: "Let me know if you need anything.", sender: "other" },
  { text: "What time is the meeting?", sender: "me" },
  { text: "Thanks for your help!", sender: "other" },
  { text: "I'll call you later.", sender: "me" },
  { text: "No worries, take your time.", sender: "other" },
  { text: "Haha, that's hilarious!", sender: "me" },
  { text: "See you soon!", sender: "other" },
  { text: "Just wanted to check in and see how everything is going on your end. If you need any support, let me know.", sender: "me" },
  { text: "Yes.", sender: "other" },
  { text: "No.", sender: "me" },
  { text: "Okay, I'll get started on that and update you by the end of the day.", sender: "other" },
  { text: "Here's the link to the document you asked for: https://example.com/your-doc.pdf", sender: "me" },
  { text: "Good morning! Hope you have a great day ahead.", sender: "other" },
  { text: "Sure, I can help with that. What exactly do you need?", sender: "me" },
  { text: "This is a really long message just to test how the UI handles wrapping and multiple lines. Sometimes people send paragraphs instead of short texts, so it's important to make sure the chat window looks good no matter what. Let me know if you see any weirdness!", sender: "other" }
];

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
  const messagesHeaderRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // const [value, setValue] = useState("");

  useEffect(() => {
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
  }, []);

  const handleChange = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";

      if (messagesContainerRef.current) {
        if (textareaRef.current) {
          // Use bottom padding to fit dynamic textarea
          messagesContainerRef.current.style.paddingBottom = `${textareaRef.current.offsetHeight + 70}px`;

          // If scrolled to bottom, maintain state
          if (messagesContainerRef.current.scrollTop +
              messagesContainerRef.current.clientHeight >= messagesContainerRef.current.scrollHeight - 100) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
          }
        }
      }
    }
  }

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
          className="w-full flex flex-col gap-4 pr-4 pb-[95px] pl-4 overflow-auto"
          onClick={onClose}>
          {randomMessages.map((msg, i) => (
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
        </div>
        <div className="glass absolute bottom-4 right-4 left-4 gap-2 p-4 items-center">
          <textarea
            ref={textareaRef}
            className="max-h-[20lh] flex-1 resize-none leading-releaxed outline-none overflow-auto"
            placeholder="start talking"
            rows={1}
            onChange={handleChange} />
          <button
            className="flex items-center text-gray-600 hover:text-black text-xl font-bold focus:outline-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity self-end"
            aria-label="Send message">
            <span className="material-icons">arrow_upward</span>
          </button>
        </div>
      </>
    } />
  );
}

export default Panel;
