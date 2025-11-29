export function encrypt(text, cipher, key, extraKey) {
    switch (cipher) {
  
      case "caesar":
        return caesar(text, Number(key))
  
      case "vigenere":
        return vigenere(text, key)
  
      case "substitution":
        return substitution(text, key)
  
      case "playfair":
        return playfair(text, key)
  
      case "transposition":
        return transposition(text, key)
  
      case "railfence":
        return railFence(text, Number(key))
  
      case "affine":
        return affine(text, Number(key), Number(extraKey))
  
      default:
        return text
    }
  }

function caesar(text, shift) {
return text.replace(/[A-Za-z]/g, char => {
    const base = char <= 'Z' ? 65 : 97
    return String.fromCharCode((char.charCodeAt(0) - base + shift) % 26 + base)
})
}

function vigenere(text, key) {
    if (!key) return text
    let result = "", j = 0
    key = key.toUpperCase()
  
    for (let i = 0; i < text.length; i++) {
      let c = text[i]
      if (/[A-Za-z]/.test(c)) {
        let base = c <= 'Z' ? 65 : 97
        let k = key[j++ % key.length].charCodeAt(0) - 65
        result += String.fromCharCode((c.charCodeAt(0) - base + k) % 26 + base)
      } else result += c
    }
    return result
  }
  function substitution(text, map) {
    if (!map || map.length !== 26) return text
    map = map.toLowerCase()
    return text.replace(/[a-z]/gi, c => {
      let i = c.toLowerCase().charCodeAt(0) - 97
      let m = map[i]
      return c === c.toUpperCase() ? m.toUpperCase() : m
    })
  }
  function railFence(text, rails) {
    if (rails <= 1) return text
    let arr = Array.from({ length: rails }, () => [])
    let dir = 1, row = 0
  
    for (const c of text) {
      arr[row].push(c)
      if (row === 0) dir = 1
      if (row === rails - 1) dir = -1
      row += dir
    }
  
    return arr.flat().join("")
  }
  function transposition(text, key) {
    let col = String(key).length
    let result = ""
    for (let i = 0; i < col; i++)
      for (let j = i; j < text.length; j += col)
        result += text[j]
    return result
  }
  function affine(text, a, b) {
    if (isNaN(a) || isNaN(b)) return text
  
    return text.replace(/[A-Za-z]/g, c => {
      let base = c <= 'Z' ? 65 : 97
      let x = c.charCodeAt(0) - base
      return String.fromCharCode((a * x + b) % 26 + base)
    })
  }
  function playfair(text, key) {
    if (!key) return text
  
    key = key.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "")
    text = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "")
  
    // --- Build Key Matrix ---
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ" // J removed
    let matrix = ""
    
    for (const char of (key + alphabet)) {
      if (!matrix.includes(char)) matrix += char
    }
  
    // Convert to 2D array (5x5)
    let grid = []
    for (let i = 0; i < 25; i += 5)
      grid.push(matrix.slice(i, i + 5).split(""))
  
    // --- Helper: locate character ---
    function findPosition(char) {
      for (let r = 0; r < 5; r++)
        for (let c = 0; c < 5; c++)
          if (grid[r][c] === char) return [r, c]
    }
  
    // --- Prepare plaintext digraphs ---
    let prepared = ""
    for (let i = 0; i < text.length; i++) {
      let a = text[i]
      let b = text[i + 1]
  
      if (a === b) {
        prepared += a + "X"
      } else {
        prepared += a
        if (b) {
          prepared += b
          i++
        }
      }
    }
  
    if (prepared.length % 2 !== 0) prepared += "X"
  
    // --- Encrypt pairs ---
    let result = ""
  
    for (let i = 0; i < prepared.length; i += 2) {
      let a = prepared[i]
      let b = prepared[i + 1]
  
      let [r1, c1] = findPosition(a)
      let [r2, c2] = findPosition(b)
  
      if (r1 === r2) {
        // Same row → shift right
        result += grid[r1][(c1 + 1) % 5]
        result += grid[r2][(c2 + 1) % 5]
      } 
      else if (c1 === c2) {
        // Same column → shift down
        result += grid[(r1 + 1) % 5][c1]
        result += grid[(r2 + 1) % 5][c2]
      } 
      else {
        // Rectangle swap
        result += grid[r1][c2]
        result += grid[r2][c1]
      }
    }
  
    return result
  }
  
            