export default function HashConfig({ hashAlg, setHashAlg }) {
    return (
      <div className="cipher-config mt-4">
        <div className="cipher-title">HASH ALGORITHM</div>
        <select
          className="cipher-select"
          value={hashAlg}
          onChange={(e) => setHashAlg(e.target.value)}
        >
          <option value="sha256">SHA-256</option>
          <option value="sha1">SHA-1</option>
          <option value="md5">MD5</option>
          <option value="crc32">CRC32</option>
          <option value="adler32">Adler-32</option>
          <option value="custom">Custom Checksum</option>
        </select>
      </div>
    )
  }
  