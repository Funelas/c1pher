import { useState } from 'react'
import './App.css'
import HackerTitle from './hackertiles.jsx'
function App() {
  const [input, setInput] = useState("")
  return (
    <>
       <HackerTitle />

       <div className="terminal-container">
        
        {/* INPUT BOX */}
        <div className="terminal-box">
          <div className="terminal-title">INPUT</div>
          <textarea
            className="terminal-input"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* OUTPUT BOX */}
        <div className="terminal-box">
          <div className="terminal-title">OUTPUT</div>
          <textarea
            className="terminal-output"
            value={input}
            readOnly
            placeholder="Output will appear here..."
          />
        </div>

      </div>
    </>
  )
}

export default App
