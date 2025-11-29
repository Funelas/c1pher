import { useRef, useState } from "react";

export default function TerminalBox({ title, value, onChange, readOnly, placeholder }) {
  const textareaRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (textareaRef.current) {
      navigator.clipboard.writeText(textareaRef.current.value)
        .then(() => {
          setCopied(true); // change color
          setTimeout(() => setCopied(false), 5000); // revert after 5 seconds
        })
        .catch(err => console.error("Failed to copy:", err));
    }
  };

  return (
    <div className="terminal-box">
      <div className="terminal-title flex justify-between items-center">
        <h1 className="mx-2">{title}</h1>
        <svg
          onClick={handleCopy}
          className={`w-6 h-6 cursor-pointer ${copied ? "text-green-700" : "text-green-400"}`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 5C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5M8 5V7H16V5M8 5V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5M12 15.5V11C12 10.1716 12.6716 9.5 13.5 9.5C14.3284 9.5 15 10.1716 15 11V15.5C15 17.1569 13.6569 18.5 12 18.5C10.3431 18.5 9 17.1569 9 15.5V11.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <textarea
        ref={textareaRef}
        className={readOnly ? "terminal-output" : "terminal-input"}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
      />
    </div>
  );
}
