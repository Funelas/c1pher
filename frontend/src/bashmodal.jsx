import { useState } from "react"
export default function BashModal({ visible, onClose, bashValue }) {
    const [typed, setTyped] = useState("")

    if (!visible) return null
  
    const diff = bashValue
    ? diffText(bashValue, typed)
    : [] // if bashValue is empty, show nothing


    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-black border border-green-400 rounded-lg w-[70%] h-[70%] flex flex-col">
  
          {/* HEADER */}
          <div className="flex justify-between items-center px-4 py-2 border-b border-green-400">
            <span className="text-green-400 font-mono">HASH CHECKER</span>
            <button onClick={onClose} className="text-red-400">✕</button>
          </div>
  
          {/* BODY */}
          <div className="flex flex-col flex-1">
  
            {/* INPUT PANEL */}
            <div className="flex-1 p-3 border-b border-green-400">
            <textarea
            className="w-full h-full bg-black text-green-400 font-mono outline-none resize-none"
            placeholder="$ type here..."
            value={typed}
            onChange={e => setTyped(e.target.value)}
            />

            </div>
  
            {/* OUTPUT PANEL (SYNCED WITH MAIN TERMINAL) */}
            <div className="flex-1 p-3 bg-black font-mono overflow-y-auto text-left">
            <pre className="whitespace-pre-wrap break-words">
                {diff.map((item, i) => (
                <span
                    key={i}
                    className={
                    item.type === "ok"
                        ? "text-green-500"
                        : item.type === "wrong"
                        ? "text-red-500 underline"
                        : "bg-red-900/60 text-red-300"
                    }
                >
              
                    {item.char}
                </span>
                ))}
            </pre>
            </div>

  
          </div>
        </div>
      </div>
    )
  }

  function diffText(expected, actual) {
    const max = Math.max(expected.length, actual.length)
    const result = []
  
    for (let i = 0; i < max; i++) {
      const exp = expected[i]
      const act = actual[i]
  
      if (exp === act) {
        result.push({ char: exp || "", type: "ok" })
      } 
      else if (act === undefined) {
        result.push({ char: exp || " ", type: "missing" })
      }      
      else {
        result.push({ char: exp || act, type: "wrong" })
      }
    }
  
    return result
  }
  