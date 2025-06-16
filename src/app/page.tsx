"use client";

import React, { useState, useEffect } from "react";
import Panel, { PanelData } from "./panel";
import Pane from "./pane";
import Compose from "./compose";

export default function Home() {
  const [panels, setPanels] = useState<PanelData[]>([]);
  const [nextId, setNextId] = useState(1);
  const [showCompose, setShowCompose] = useState(false);
  const [isComposeFocused, setIsComposeFocused] = useState(false);

  const addPane = (args: Omit<PanelData, "id"> = {}) => {
    setPanels((prev) => [...prev, { id: nextId, ...args }]);
    setNextId((id) => id + 1);
  };

  const removePanel = (id: number) => setPanels((prev) => prev.filter((panel) => panel.id !== id));

  useEffect(() => {
    const handler = () => addPane({});
    window.addEventListener("add-panel", handler);
    return () => window.removeEventListener("add-panel", handler);
  }, [addPane, nextId]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isComposeFocused) return;
      const threshold = 80; // px from bottom
      const windowHeight = window.innerHeight;
      if (windowHeight - e.clientY < threshold) {
        setShowCompose(true);
      } else {
        setShowCompose(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isComposeFocused]);

  return (
    <div className="h-screen flex flex-col">
      <div className="w-full flex-1 flex gap-4 p-4 overflow-auto">
        <Panel className="flex-1 relative !max-w-100" content={
          <div className="flex-1" onClick={() => addPane()}>
            {/* ...other main panel content can go here... */}
          </div>
        } />
        <div className="flex flex-1 gap-4">
          {panels.map((panel) => (
            <Pane
              key={panel.id}
              onClose={() => removePanel(panel.id)}
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
