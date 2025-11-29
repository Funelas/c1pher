import { useEffect } from "react"
import HashConfig from "./hashconfig"
const ALLOWED = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!.,?"
const N = ALLOWED.length

export default function CipherConfig({
    cipher,
    setCipher,
    cipherKey,
    setCipherKey,
    extraKey,
    setExtraKey,
    setHint,
    setHashAlg,
    hashAlg
  }) {

    const getHint = () => {
      switch (cipher) {
    
        case "caesar":
          if (!cipherKey) return "Enter shift value"
          if (isNaN(cipherKey)) return "Shift must be a number"
          return ""
    
        case "vigenere":
          if (![...cipherKey].every(c => ALLOWED.includes(c)))
            return "Only A–Z, a–z, 0–9, ! ? . , allowed"
          
          return ""
    
        case "substitution":
          if (cipherKey.length !== N) return `Mapping must be exactly ${N} characters`
          if (new Set(cipherKey).size !== N) return "Each character must be unique"
          if (![...cipherKey].every(c => ALLOWED.includes(c)))
            return "Mapping contains invalid characters"

          return ""
    
        case "playfair":
          if (!/^[A-Z]+$/i.test(cipherKey)) return "Playfair only accepts A–Z"
          if (/J/i.test(cipherKey)) return "Remove letter J (combined with I)"

          return ""
    
        case "transposition":
          if (!cipherKey) return "Key required (numbers only)"
          return ""
    
        case "railfence":
          if (cipherKey <= 1) return "Rails must be greater than 1"
          return ""
    
        case "affine":
          let a = Number(cipherKey)
          let b = Number(extraKey)
          if (isNaN(a) || isNaN(b)) return "Both values must be numbers"
          if (gcd(a, 26) !== 1) return "A must be coprime with 26"
          if (extraKey === "") return "Enter shift value";
          return ""
    
        default:
          return ""
      }
    }
    const hint = getHint()
    useEffect(() => {
      setHint(hint)
    }, [hint, cipherKey, extraKey, cipher])
    
    
    
    const renderInputs = () => {
      switch (cipher) {
        case "caesar":
          return (
            <input
              className="cipher-input"
              type="number"
              placeholder="Shift (e.g. 3)"
              value={cipherKey}
              onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "")
              setCipherKey(value)
            }}

            />
          )
  
        case "vigenere":
          return (
            <input
              className="cipher-input"
              type="text"
              placeholder="Keyword (e.g. KEY)"
              value={cipherKey}
              onChange={(e) => {
              const value = e.target.value.replace(new RegExp(`[^${ALLOWED}]`, "g"), "")

              setCipherKey(value.toUpperCase())
            }}

            />
          )
  
        case "substitution":
          return (
            <input
              className="cipher-input"
              type="text"
              placeholder="66-char mapping"
              value={cipherKey}
              onChange={(e) => {
                const value = e.target.value
                .replace(new RegExp(`[^${ALLOWED}]`, "g"), "").slice(0, 66)
              
                setCipherKey(value)
              }}
              
            />
          )
  
        case "playfair":
          return (
            <input
              className="cipher-input"
              type="text"
              placeholder="Keyword (no J)"
              value={cipherKey}
              onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z]/g, "")
              setCipherKey(value.toUpperCase())
            }}

            />
          )
  
        case "transposition":
          return (
            <input
              className="cipher-input"
              type="number"
              placeholder="Key (e.g. 4312)"
              value={cipherKey}
              onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "")
              setCipherKey(value)
            }}

            />
          )
  
        case "railfence":
          return (
            <input
              className="cipher-input"
              type="number"
              placeholder="Rails (e.g. 3)"
              value={cipherKey}
              onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "")
              setCipherKey(value)
            }}

            />
          )
  
        case "affine":
          return (
            <>
              <input
                className="cipher-input"
                type="number"
                placeholder="A (coprime)"
                value={cipherKey}
                onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "")
                setCipherKey(value)
              }}

              />
              <input
                className="cipher-input"
                type="number"
                placeholder="B (shift)"
                value={extraKey}
                onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "")
                setExtraKey(value)
              }}

              />
            </>
          )
  
        default:
          return null
      }
    }
    
    return (
      <div className="cipher-config">
  
        <div className="cipher-title">CIPHER ALGORITHM</div>
  
        <select
          className="cipher-select"
          value={cipher}
          onChange={(e) => setCipher(e.target.value)}
        >
          <option value="none">No Cipher</option>
          <option value="caesar">Caesar</option>
          <option value="vigenere">Vigenère</option>
          <option value="substitution">Substitution</option>
          <option value="playfair">Playfair</option>
          <option value="transposition">Transposition</option>
          <option value="railfence">Rail Fence</option>
          <option value="affine">Affine</option>
        </select>
  
        {renderInputs()}
        {hint && (
          <div className="cipher-hint">
            {hint}
          </div>
        )}
        <HashConfig 
          hashAlg={hashAlg} 
          setHashAlg={setHashAlg}/>

  
      </div>
    )
  }
  
  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b)
  }
  