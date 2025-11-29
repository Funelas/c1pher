import { sha256 } from "js-sha256"
import { sha1 } from "js-sha1"
import md5 from "md5"
import CRC32 from "crc-32"
import Adler32 from "adler-32"

export default function computeHash(text, algorithm) {
  switch (algorithm) {
    case "sha256":
      return sha256(text)
    case "sha1":
      return sha1(text)
    case "md5":
      return md5(text)
    case "crc32":
      return (CRC32.str(text) >>> 0).toString(16) // convert to hex
    case "adler32":
      return Adler32.str(text).toString(16)
    case "custom":
      // sum ASCII codes mod 256
      return text.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 256
    default:
      return "" // fallback to avoid undefined
  }
}
