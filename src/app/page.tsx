"use client";

import React, { useState, useEffect } from "react";
import Panel, { PanelData } from "./panel";
import Compose from "./compose";

const MainPanelHeader = () => {
  const handleProfileClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('add-panel'));
    }
  };
  return (
    <div className="flex items-end gap-1.5 z-10 items-center">
      <img
        src="https://ui-avatars.com/api/?name=J+G&background=ececec&color=888888"
        alt="Profile"
        className="w-9 h-9 rounded-full border border-neutral-300 shadow-sm object-cover cursor-pointer"
        onClick={handleProfileClick}
      />
      <div className="flex items-end ml-1 gap-1">
        <span className="text-xs text-neutral-500">|</span>
        <span className="text-xs italic leading-tight text-neutral-500">home page</span>
      </div>
    </div>
  );
}

const BasePanel = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl font-bold focus:outline-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Close panel"
      >
        <span className="material-icons">close</span>
      </button>
    </div>
  );
}

export default function Home() {
  const [panels, setPanels] = useState<PanelData[]>([]);
  const [nextId, setNextId] = useState(1);

  const addPanel = (args: Omit<PanelData, "id"> = {}) => {
    setPanels((prev) => [...prev, { id: nextId, ...args }]);
    setNextId((id) => id + 1);
  };

  useEffect(() => {
    const handler = () => addPanel({});
    window.addEventListener("add-panel", handler);
    return () => window.removeEventListener("add-panel", handler);
  }, [nextId]);

  const removePanel = (id: number) =>
    setPanels((prev) => prev.filter((panel) => panel.id !== id));

  return (
    <div className="h-screen flex flex-col p-3 gap-1">
      <div className="w-full flex-1 flex gap-4 p-1 overflow-auto">
        <Panel className="flex-1 relative !max-w-100" content={
          <>
            {/* ...other main panel content can go here... */}
          </>
        } />
        <div className="flex flex-1 gap-4">
          {panels.map((panel) => (
            <Panel
              key={panel.id}
              className="flex-1"
              content={panel.content || <BasePanel onClose={() => removePanel(panel.id)} />}
            />
          ))}
        </div>
      </div>
      <div className="relative h-18 flex gap-4 p-1 overflow-visible">
        <Panel content={<MainPanelHeader />} />
        <div className="flex-1 flex items-center justify-center relative">
          <Compose/>
        </div>
      </div>
    </div>
  );
}
