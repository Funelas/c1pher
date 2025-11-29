import { useState, useMemo } from "react"
import TerminalBox from "./terminalbox"
import CipherConfig from "./cypherconfig"
import { encrypt } from "./cipherEngine"
import computeHash from "./computehash"

export default function TerminalContainer() {
  const [input, setInput] = useState("")
  const [cipher, setCipher] = useState("none")
  const [cipherKey, setCipherKey] = useState("")
  const [extraKey, setExtraKey] = useState("")
  const [hint, setHint] = useState("")

  const output = hint ? "" : encrypt(input, cipher, cipherKey, extraKey)
  const [hashAlg, setHashAlg] = useState("sha256")
  const hashOutput = useMemo(() => {
    if (input == "" || hint) return "";
    console.log("Hash: ",  computeHash(output, hashAlg))
    return computeHash(output, hashAlg)
  }, [output, hashAlg])

  return (
    <div className="flex flex-col gap-8 items-center mt-8">

      {/* Top row: input, process, output */}
      <div className="flex justify-center gap-12 items-center w-full">
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
          setHint={setHint}
          setHashAlg = {setHashAlg}
          hashAlg = {hashAlg}
        />

        <TerminalBox
          title="OUTPUT"
          value={output}
          readOnly
          placeholder="Encrypted output..."
        />
      </div>

      {/* Hash terminal below */}
      <div className="flex  w-full">
        <div className="flex w-full justify-center items-center">
          <TerminalBox
            title="HASH"
            value= {hashOutput}
            readOnly
            placeholder="Hash of the output..."
          />
        </div>
      </div>
    </div>
  )
}
