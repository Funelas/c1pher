import { useState, useMemo } from "react"
import TerminalBox from "./terminalbox"
import CipherConfig from "./cypherconfig"
import { encrypt, decrypt } from "./cipherEngine"
import computeHash from "./computehash"

export default function TerminalContainer() {
  const [mode, setMode] = useState("encrypt") // new state
  const [input, setInput] = useState("")
  const [cipher, setCipher] = useState("none")
  const [cipherKey, setCipherKey] = useState("")
  const [extraKey, setExtraKey] = useState("")
  const [hint, setHint] = useState("")
  const [hashAlg, setHashAlg] = useState("sha256")

  // Compute output based on mode
  const output = useMemo(() => {
    if (hint) return ""
    return mode === "encrypt"
      ? encrypt(input, cipher, cipherKey, extraKey)
      : decrypt(input, cipher, cipherKey, extraKey)
  }, [input, cipher, cipherKey, extraKey, mode, hint])

  const hashOutput = useMemo(() => {
    if (input == "" || hint) return ""
    return computeHash(output, hashAlg)
  }, [output, hashAlg, hint])

  return (
    <div className="flex flex-col gap-8 items-center mt-8">
          {/* Mode selector at the top */}
          <div className="flex gap-4 items-center justify-center mb-4">
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          value="encrypt"
          checked={mode === "encrypt"}
          onChange={(e) => setMode(e.target.value)}
          className="hidden" // hide default radio
        />
        <span
          className={`px-4 py-2 rounded-l-2xl border border-[#157a0c] ${
            mode === "encrypt" ? "bg-[#157a0c] text-black" : "bg-black text-[#157a0c]"
          } font-mono transition-colors duration-200`}
        >
          Encrypt
        </span>
      </label>

      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          value="decrypt"
          checked={mode === "decrypt"}
          onChange={(e) => setMode(e.target.value)}
          className="hidden"
        />
        <span
          className={`px-4 py-2 rounded-r-2xl border border-[#157a0c] ${
            mode === "decrypt" ? "bg-[#157a0c] text-black" : "bg-black text-[#157a0c]"
          } font-mono transition-colors duration-200`}
        >
          Decrypt
        </span>
      </label>
    </div>


      {/* Top row: input, process, output */}
      <div className="flex justify-center gap-12 items-center w-full">
        <TerminalBox
          title= {mode === "encrypt" ? "ORIGINAL_TEXT" : "ENCRYPTED_TEXT"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Type ${mode === "encrypt" ? "message" : "encrypted message"}...`}
        />

        <CipherConfig
          cipher={cipher}
          setCipher={setCipher}
          cipherKey={cipherKey}
          setCipherKey={setCipherKey}
          extraKey={extraKey}
          setExtraKey={setExtraKey}
          setHint={setHint}
          setHashAlg={setHashAlg}
          hashAlg={hashAlg}
        />

        <TerminalBox
          title= {mode === "decrypt" ? "ORIGINAL_TEXT" : "ENCRYPTED_TEXT"}
          value={output}
          readOnly
          placeholder={mode === "decrypt" ? "Original output..." : "Encrypted output..."}
        />
      </div>

      {/* Hash terminal below */}
      <div className="flex w-full">
        <div className="flex w-full justify-center items-center">
          <TerminalBox
            title="HASH"
            value={hashOutput}
            readOnly
            placeholder="Hash of the output..."
          />
        </div>
      </div>
    </div>
  )
}
