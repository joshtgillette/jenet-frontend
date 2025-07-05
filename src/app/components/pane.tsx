import "../globals.css";

const Pane = ({
  className,
  content,
}: {
  className?: string;
  content?: React.ReactNode;
}) => {
  return (
    <div
      className={`group max-w-200 min-w-110 relative flex flex-col p-4 overflow-auto rounded-xl bg-white/60 dark:bg-zinc-900/60 ring-1 ring-white/10 dark:ring-zinc-400/10 shadow-[0_0_8px_2px_rgba(180,180,200,0.2)] dark:shadow-[0_0_8px_2px_rgba(75,75,86,0.2)] transition-all duration-400 hover:bg-white/80 dark:hover:bg-zinc-900/70 hover:shadow-[0_0_20px_4px_rgba(180,180,200,0.3)] dark:hover:shadow-[0_0_8px_2px_rgba(75,75,86,0.3)] focus-within:bg-white/80 dark:focus-within:bg-zinc-900/70 focus-within:shadow-[0_0_20px_4px_rgba(180,180,200,0.3)] dark:focus-within:shadow-[0_0_8px_2px_rgba(75,75,86,0.3)] ${className ?? ""}`}
    >
      {content}
    </div>
  );
};

export default Pane;
