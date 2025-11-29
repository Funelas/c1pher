const ALLOWED = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?.," 
const N = ALLOWED.length

function idx(c) {
    return ALLOWED.indexOf(c)
  }
  
function shiftChar(c, shift) {
const i = idx(c)
if (i === -1) return c   // ignore unknown characters
return ALLOWED[(i + shift + N) % N]
}

function unshiftChar(c, shift) {
const i = idx(c)
if (i === -1) return c
return ALLOWED[(i - shift + N) % N]
}
  
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
  export function decrypt(text, cipher, key, extraKey) {
    switch (cipher) {
      case "caesar":       return caesarDecrypt(text, Number(key))           // shift backwards
      case "vigenere":     return vigenereDecrypt(text, key)           // new decrypt function
      case "substitution": return substitutionDecrypt(text, key)      // new decrypt function
      case "playfair":     return playfairDecrypt(text, key)           // new decrypt function
      case "transposition":return transpositionDecrypt(text, key)     // new decrypt function
      case "railfence":    return railFenceDecrypt(text, Number(key)) // new decrypt function
      case "affine":       return affineDecrypt(text, Number(key), Number(extraKey)) // new decrypt function
      default:             return text
    }
  }
// Caesar Functions
  function caesar(text, shift) {
    return [...text].map(c => shiftChar(c, shift)).join("")
  }
  
  function caesarDecrypt(text, shift) {
    return [...text].map(c => unshiftChar(c, shift)).join("")
  }
  

//   Vigenere Functions
function vigenere(text, key) {
    if (!key) return text
    let j = 0
  
    return [...text].map(c => {
      const i = idx(c)
      if (i === -1) return c
  
      const k = idx(key[j % key.length])
      j++
      return shiftChar(c, k)
    }).join("")
  }
  
  function vigenereDecrypt(text, key) {
    if (!key) return text
    let j = 0
  
    return [...text].map(c => {
      const i = idx(c)
      if (i === -1) return c
  
      const k = idx(key[j % key.length])
      j++
      return unshiftChar(c, k)
    }).join("")
  }
// Substitution Functions  
function substitution(text, map) {
    if (!map || map.length !== N) return text
  
    return [...text].map(c => {
      const i = idx(c)
      return i === -1 ? c : map[i]
    }).join("")
  }
  
  function substitutionDecrypt(text, map) {
    if (!map || map.length !== N) return text
    const reverse = {}
  
    for (let i = 0; i < N; i++) reverse[map[i]] = ALLOWED[i]
  
    return [...text].map(c => reverse[c] || c).join("")
  }
//   RailFence Functions
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
  function railFenceDecrypt(text, rails) {
    if (rails <= 1) return text
    let len = text.length
    let arr = Array.from({ length: rails }, () => Array(len).fill(null))
    let dir = 1, row = 0
    // mark positions
    for (let i = 0; i < len; i++) {
      arr[row][i] = "*"
      if (row === 0) dir = 1
      if (row === rails - 1) dir = -1
      row += dir
    }
    // fill chars
    let idx = 0
    for (let r = 0; r < rails; r++)
      for (let c = 0; c < len; c++)
        if (arr[r][c] === "*") arr[r][c] = text[idx++]
    // read row-wise
    let result = "", rowPos = 0, dir2 = 1
    for (let i = 0; i < len; i++) {
      result += arr[rowPos][i]
      if (rowPos === 0) dir2 = 1
      if (rowPos === rails - 1) dir2 = -1
      rowPos += dir2
    }
    return result
  }
//   Transposition Functions
  function transposition(text, key) {
    let col = String(key).length
    let result = ""
    for (let i = 0; i < col; i++)
      for (let j = i; j < text.length; j += col)
        result += text[j]
    return result
  }
  function transpositionDecrypt(text, key) {
    let col = String(key).length
    let row = Math.ceil(text.length / col)
    let result = Array(text.length)
    let idx = 0
    for (let i = 0; i < col; i++)
      for (let j = 0; j < row; j++) {
        let pos = j * col + i
        if (pos < text.length) result[pos] = text[idx++]
      }
    return result.join("")
  }

  
  function modInverse(a, m) {
    a = ((a % m) + m) % m
    for (let x = 1; x < m; x++) if ((a * x) % m === 1) return x
    return null
  }
//   Affine Functions
function affine(text, a, b) {
    return [...text].map(c => {
      const i = idx(c)
      if (i === -1) return c
      return ALLOWED[(a * i + b) % N]
    }).join("")
  }
  
  function affineDecrypt(text, a, b) {
    const inv = modInverse(a, N)
    if (!inv) return text
  
    return [...text].map(c => {
      const i = idx(c)
      if (i === -1) return c
      return ALLOWED[(inv * (i - b + N)) % N]
    }).join("")
  }
//   Playfair Functions
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
  function playfairDecrypt(text, key) {
    if (!key) return text
  
    key = key.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "")
    text = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "")
  
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"
    let matrix = ""
    for (const char of (key + alphabet)) if (!matrix.includes(char)) matrix += char
  
    let grid = []
    for (let i = 0; i < 25; i += 5) grid.push(matrix.slice(i, i + 5).split(""))
  
    function findPosition(char) {
      for (let r = 0; r < 5; r++)
        for (let c = 0; c < 5; c++)
          if (grid[r][c] === char) return [r, c]
    }
  
    let result = ""
    for (let i = 0; i < text.length; i += 2) {
      let a = text[i]
      let b = text[i + 1]
      let [r1, c1] = findPosition(a)
      let [r2, c2] = findPosition(b)
  
      if (r1 === r2) {
        result += grid[r1][(c1 + 4) % 5] // shift left
        result += grid[r2][(c2 + 4) % 5]
      } else if (c1 === c2) {
        result += grid[(r1 + 4) % 5][c1] // shift up
        result += grid[(r2 + 4) % 5][c2]
      } else {
        result += grid[r1][c2]
        result += grid[r2][c1]
      }
    }
  
    return result
  }
            