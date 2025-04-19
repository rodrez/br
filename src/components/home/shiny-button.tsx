'use client';

interface ShinyButtonProps {
  href?: string;
  text?: string;
  onClick?: () => void;
}

export default function ShinyButton({ href, text = 'Hello', onClick }: ShinyButtonProps) {
  const buttonClassName = 
    "inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-semibold " +
    "text-white dark:text-red-800 bg-gradient-to-r from-red-800 to-red-700 dark:from-red-200 " +
    "dark:to-red-100 dark:hover:bg-red-100 shadow focus:outline-none focus:ring focus:ring-red-500/50 " +
    "focus-visible:outline-none focus-visible:ring focus-visible:ring-red-500/50 relative before:absolute " +
    "before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] " +
    "dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] " +
    "before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] " +
    "hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]";

  if (href) {
    return (
      <a href={href} className={buttonClassName}>
        {text}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={buttonClassName}>
      {text}
    </button>
  );
} 