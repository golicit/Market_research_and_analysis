import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mock storage for reset tokens - use database in production
const resetTokens = {};

// Forgot Password Route
app.post("/api/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Generate reset token
    const token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    // Store token with expiration (1 hour)
    resetTokens[token] = {
      email,
      expiresAt: Date.now() + 60 * 60 * 1000,
    };

    // In production, send email with reset link (e.g., using nodemailer)
    console.log(`Reset link for ${email}: http://localhost:5173/reset-password?token=${token}`);

    return res.status(200).json({
      message: "If an account exists, a reset link has been sent to your email",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
