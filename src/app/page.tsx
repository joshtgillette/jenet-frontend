"use client";

import React, { useState, useEffect, useCallback} from "react";
import Pane from "./components/pane";
import Panel, { PanelData } from "./components/panel";
// import Compose from "./compose";

export default function Home() {
  const [panels, setPanels] = useState<PanelData[]>([]);
  const [nextId, setNextId] = useState(1);
  // const [showCompose, setShowCompose] = useState(false);
  // const [isComposeFocused, setIsComposeFocused] = useState(false);

  const addPanel = useCallback((args: Omit<PanelData, "id"> = {}) => {
    setPanels((prev) => [...prev, { id: nextId, ...args }]);
    setNextId((id) => id + 1);
  }, [nextId])

  useEffect(() => {
    const handler = () => addPanel();
    window.addEventListener("add-pane", handler);
    return () => window.removeEventListener("add-pane", handler);
  }, [addPanel, nextId]);
  const removePanel = (id: number) => setPanels((prev) => prev.filter((pane) => pane.id !== id));

  //   useEffect(() => {
  //     const handleMouseMove = (e: MouseEvent) => {
  //       if (isComposeFocused) return;
  //       const threshold = 80; // px from bottom
  //       const windowHeight = window.innerHeight;
  //       if (windowHeight - e.clientY < threshold) {
  //         setShowCompose(true);
  //       } else {
  //         setShowCompose(false);
  //       }
  //     };
  //     window.addEventListener('mousemove', handleMouseMove);
  //     return () => window.removeEventListener('mousemove', handleMouseMove);
  //   }, [isComposeFocused]);

  return (
    <div className="h-screen flex flex-col">
      <div className="w-full flex-1 flex gap-4 p-4 overflow-auto">
        <Pane className="flex-1 relative !max-w-100" content={
          <div className="flex-1" onClick={() => addPanel({content: <>Josh Gillette</>})}>
            {/* ...other main pane content can go here... */}
          </div>
        } />
        <div className="flex flex-1 gap-4">
          {panels.map((panel) => (
            <Panel
              key={panel.id}
              onClose={() => removePanel(panel.id)}
              content={panel.content}
            />
          ))}
        </div>
      </div>
      {/* <div
        className={`fixed left-1/2 bottom-6 -translate-x-1/2 z-30 w-full flex justify-center items-center gap-4 transition-all duration-500 ease-in-out
        ${(showCompose || isComposeFocused) ? 'translate-y-0 pointer-events-auto' : 'translate-y-19 opacity-60 pointer-events-none'}`}
        style={{ willChange: 'transform, opacity' }}
      >
        <Compose
          onFocus={() => setIsComposeFocused(true)}
          onBlur={() => setIsComposeFocused(false)}
        />
      </div> */}
    </div>
  );
}
