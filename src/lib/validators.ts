export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters")
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain uppercase letter")
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain lowercase letter")
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain number")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateFullName(name: string): boolean {
  return name.trim().length >= 2
}
