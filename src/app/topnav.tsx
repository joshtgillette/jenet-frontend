import React from "react";
import "./globals.css";

const TopNav = () => {
  return (
    <div className="fixed z-50 w-full flex items-center justify-center gap-[50px] p-[15px] text-lg">
        <div className="
            flex flex-grow justify-between
            max-w-[600px] px-[20px] py-[10px] dark:text-white
            bg-[rgb(245,245,245)] dark:bg-[rgb(30,30,30)] hover:bg-[rgb(248,248,248)] dark:hover:bg-[rgb(33,33,33)]
            border-1 border-black dark:border-white
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
