export default function CipherConfig({
    cipher,
    setCipher,
    cipherKey,
    setCipherKey,
    extraKey,
    setExtraKey
  }) {
    const renderInputs = () => {
      switch (cipher) {
        case "caesar":
          return (
            <input
              className="cipher-input"
              type="number"
              placeholder="Shift (e.g. 3)"
              value={cipherKey}
              onChange={(e) => setCipherKey(e.target.value)}
            />
          )
  
        case "vigenere":
          return (
            <input
              className="cipher-input"
              type="text"
              placeholder="Keyword (e.g. KEY)"
              value={cipherKey}
              onChange={(e) => setCipherKey(e.target.value)}
            />
          )
  
        case "substitution":
          return (
            <input
              className="cipher-input"
              type="text"
              placeholder="26-char mapping"
              value={cipherKey}
              onChange={(e) => setCipherKey(e.target.value)}
            />
          )
  
        case "playfair":
          return (
            <input
              className="cipher-input"
              type="text"
              placeholder="Keyword (no J)"
              value={cipherKey}
              onChange={(e) => setCipherKey(e.target.value)}
            />
          )
  
        case "transposition":
          return (
            <input
              className="cipher-input"
              type="number"
              placeholder="Key (e.g. 4312)"
              value={cipherKey}
              onChange={(e) => setCipherKey(e.target.value)}
            />
          )
  
        case "railfence":
          return (
            <input
              className="cipher-input"
              type="number"
              placeholder="Rails (e.g. 3)"
              value={cipherKey}
              onChange={(e) => setCipherKey(e.target.value)}
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
                onChange={(e) => setCipherKey(e.target.value)}
              />
              <input
                className="cipher-input"
                type="number"
                placeholder="B (shift)"
                value={extraKey}
                onChange={(e) => setExtraKey(e.target.value)}
              />
            </>
          )
  
        default:
          return null
      }
    }
  
    return (
      <div className="cipher-config">
  
        <div className="cipher-title">PROCESS</div>
  
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
  
      </div>
    )
  }
  