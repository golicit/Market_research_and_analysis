"use client"

// CHANGED: Replace Next.js useSearchParams with React Router DOM's useSearchParams
import { useSearchParams } from "react-router-dom" 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import ResetPasswordForm from "@/components/auth/reset-password-form"

export default function ResetPasswordPage() {
  // CORRECTED: Call the hook. It returns an array in React Router DOM, where the first element is the searchParams object.
  const [searchParams] = useSearchParams() 
  
  // CORRECTED: Access the parameters using the .get() method on the first element of the array.
  const token = searchParams.get("token")

  if (!token) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-primary via-background to-background flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <Card className="border-destructive/50 bg-destructive/10">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-destructive">Invalid Reset Link</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This password reset link is invalid or has expired. Please request a new one.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary via-background to-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-accent mb-2">TradeLearn</h1>
          <p className="text-muted-foreground">Set a new password</p>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-foreground">Reset Password</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter a new password to reset your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm token={token} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}