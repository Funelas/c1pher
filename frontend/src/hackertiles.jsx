import { useEffect, useState } from "react";

export default function HackerTitle() {
  const targetText = "C1PHER";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let interval;
    let timeout;

    if (!deleting && index < targetText.length) {
      // typing / decoding effect
      interval = setInterval(() => {
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        setDisplayText(prev => targetText.slice(0, index) + randomChar);
      }, 50);

      timeout = setTimeout(() => {
        setIndex(prev => prev + 1);
        setDisplayText(targetText.slice(0, index + 1));
        clearInterval(interval);
      }, 300);
    }

    if (!deleting && index === targetText.length) {
      // pause after full text before deleting
      timeout = setTimeout(() => {
        setDeleting(true);
      }, 2000);
    }

    if (deleting && index > 0) {
      // deleting effect
      timeout = setTimeout(() => {
        setIndex(prev => prev - 1);
        setDisplayText(targetText.slice(0, index - 1));
      }, 100);
    }

    if (deleting && index === 0) {
      // pause before next loop
      timeout = setTimeout(() => {
        setDeleting(false);
      }, 2000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [index, deleting]);

  return (
    <header className="bg-[#1E1E24] flex justify-center items-center">
      <h1 className="hacker-title glitch">
        {displayText}
        <span className="cursor">█</span>
      </h1>
    </header>
  );
}
