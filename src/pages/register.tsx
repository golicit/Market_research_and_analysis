"use client";

import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RegistrationForm from "@/components/auth/registration-form";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0b1f3a] to-[#090e1d] flex items-center justify-center px-4 py-8 text-gray-100">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">TradeLearn</h1>
          <p className="text-gray-400">Create your account</p>
        </div>

        {/* Registration Card */}
        <Card className="border border-gray-700 bg-[#f3f4f6]/95 backdrop-blur-md text-gray-900 shadow-lg rounded-xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-semibold">Sign Up</CardTitle>
            <CardDescription className="text-gray-600">
              Join our trading education community
            </CardDescription>
          </CardHeader>

          <CardContent>
            <RegistrationForm />

            {/* Already have an account */}
            <p className="text-center text-sm text-gray-700 mt-6">
              Already have an account?{" "}
              <Link
                to="/loginform"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-400 mt-8">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </main>
  );
}
