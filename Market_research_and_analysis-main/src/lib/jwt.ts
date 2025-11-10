const SECRET = import.meta.env.VITE_JWT_SECRET || "your-secret-key-change-in-production"

export interface JWTPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}


function base64UrlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
}

function base64UrlDecode(str: string): string {
  str += "=".repeat((4 - (str.length % 4)) % 4)
  str = str.replace(/-/g, "+").replace(/_/g, "/")
  
  const binary = atob(str);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes)
}

async function getSecretKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  )
}

async function createSignature(message: string, secret: string): Promise<string> {
  const key = await getSecretKey(secret)
  const data = new TextEncoder().encode(message)
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, data)
  
  const binary = String.fromCharCode(...new Uint8Array(signatureBuffer));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
}

async function verifySignature(message: string, signature: string, secret: string): Promise<boolean> {
  const key = await getSecretKey(secret)
  const data = new TextEncoder().encode(message)
  
  const paddedSig = signature + '=='.substring(0, (4 - signature.length % 4) % 4)
  const binary = atob(paddedSig.replace(/-/g, '+').replace(/_/g, '/'))
  const signatureBuffer = Uint8Array.from(binary, (char) => char.charCodeAt(0))

  return crypto.subtle.verify("HMAC", key, signatureBuffer, data)
}


export async function signToken(
  payload: Omit<JWTPayload, "iat" | "exp">, 
  expiresIn = "7d"
): Promise<string> {
  const iat = Math.floor(Date.now() / 1000)

  let exp = iat
  if (expiresIn === "7d") {
    exp = iat + 7 * 24 * 60 * 60
  } else if (expiresIn === "24h") {
    exp = iat + 24 * 60 * 60
  } else if (expiresIn === "1h") {
    exp = iat + 60 * 60
  }

  const header = { alg: "HS256", typ: "JWT" }
  const payloadWithTimestamps = { ...payload, iat, exp }

  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payloadWithTimestamps))
  const message = `${encodedHeader}.${encodedPayload}`

  const signature = await createSignature(message, SECRET)

  return `${message}.${signature}`
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null

    const [encodedHeader, encodedPayload, signature] = parts
    const message = `${encodedHeader}.${encodedPayload}`

    const isValid = await verifySignature(message, signature, SECRET)
    
    if (!isValid) {
      console.error("Token signature verification failed")
      return null
    }

    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as JWTPayload

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      console.error("Token has expired")
      return null
    }

    return payload
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null

    const payload = JSON.parse(base64UrlDecode(parts[1])) as JWTPayload
    return payload
  } catch (error) {
    console.error("Token decode failed:", error)
    return null
  }
}