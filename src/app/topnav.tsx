import React from "react";
import "./globals.css";

const TopNav = () => {
  return (
    <div className="fixed z-50 w-full flex items-center justify-center gap-[50px] p-[15px] text-lg">
        <div className="
            flex flex-grow justify-between
            max-w-[600px] px-[20px] py-[15px] dark:text-white
            hover:bg-[rgb(250,250,250)] dark:hover:bg-[rgb(20,20,20)]
            border-2 border-black dark:border-white
            rounded-xl"
        >
            <a>why?</a>
            <a>demo</a>
            <a>catalog</a>
        </div>
    </div>
  );
};

export default TopNav;
