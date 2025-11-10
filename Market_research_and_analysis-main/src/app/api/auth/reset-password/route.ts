import express from 'express';
import bcrypt from 'bcryptjs';

const app = express();

const resetTokens = {}; 
const users = {}; 

app.post('/api/auth/reset-password', async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ message: "Token and password required" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        const resetData = resetTokens[token];
        if (!resetData) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        if (resetData.expiresAt < Date.now()) {
            delete resetTokens[token];
            return res.status(400).json({ message: "Token has expired" });
        }

        const user = users[resetData.email];
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = await bcrypt.hash(password, 10);
        
        delete resetTokens[token];

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});