import "./globals.css";

export type PanelData = {
    id: number;
    content?: React.ReactNode;
    className?: string;
};

type PanelProps = {
    content?: React.ReactNode;
    className?: string;
};

const Panel = ({ content, className }: PanelProps) => {
    return (
        <div
            className={
                `group max-w-200 min-w-110 relative flex flex-col p-4 rounded-xl bg-[rgb(255,255,255)]/85 shadow-[0_0_2px_1px_rgba(120,120,180,0.2)] transition-shadow duration-300 overflow-auto hover:bg-[rgb(255,255,255)] hover:shadow-[0_0_10px_1px_rgba(120,120,180,0.2)] ${className ?? ""}`
            }
        >
            {content}
        </div>
    );
};

export default Panel;
