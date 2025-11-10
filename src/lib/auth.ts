
import { verifyToken, type JWTPayload } from "./jwt"

const TOKEN_NAME = "auth-token"
const MAX_AGE_SECONDS = 7 * 24 * 60 * 60 


function setCookie(name: string, value: string, maxAge: number) {
  if (typeof document === 'undefined') return

  const attributes = [
    `max-age=${maxAge}`,
    'path=/',
    'HttpOnly=false', 
    'SameSite=Lax',
    'Secure' 
  ].join('; ')

  document.cookie = `${name}=${value}; ${attributes}`
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function deleteCookie(name: string) {
  if (typeof document === 'undefined') return

  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}


export function setAuthToken(token: string): void {
  setCookie(TOKEN_NAME, token, MAX_AGE_SECONDS)
}

export function getAuthToken(): string | null {
  return getCookie(TOKEN_NAME)
}

export function clearAuthToken(): void {
  deleteCookie(TOKEN_NAME)
}

export async function getCurrentUser(): Promise<JWTPayload | null> {
  try {
    const token = getAuthToken()
    if (!token) return null

    const payload = await verifyToken(token) 
    return payload
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}