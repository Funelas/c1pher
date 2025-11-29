import { useState } from "react"
import TerminalBox from "./terminalbox"
import CipherConfig from "./cypherconfig"
import { encrypt  } from "./cipherEngine"
export default function TerminalContainer() {
  const [input, setInput] = useState("")
  const [cipher, setCipher] = useState("none")
  const [cipherKey, setCipherKey] = useState("")
  const [extraKey, setExtraKey] = useState("")

  const [hint, setHint] = useState("")
  const output = hint ? "" : encrypt(input, cipher, cipherKey, extraKey)
  return (
    <div className="flex justify-center gap-12 mt-8 items-center">
      
      <TerminalBox
        title="INPUT"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message..."
      />

      <CipherConfig
        cipher={cipher}
        setCipher={setCipher}
        cipherKey={cipherKey}
        setCipherKey={setCipherKey}
        extraKey={extraKey}
        setExtraKey={setExtraKey}
        setHint = {setHint}
      />

      <TerminalBox
        title="OUTPUT"
        value={output}
        readOnly={true}
        placeholder="Encrypted output..."
      />

    </div>
  )
}
