export default function TerminalBox({ title, value, onChange, readOnly, placeholder }) {
    return (
      <div className="terminal-box">
        <div className="terminal-title">{title}</div>
        <textarea
          className={readOnly ? "terminal-output" : "terminal-input"}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          placeholder={placeholder}
        />
      </div>
    )
  }
  