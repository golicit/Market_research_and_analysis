import express from 'express';
import bcrypt from 'bcryptjs';


const app = express(); 
app.use(express.json());
const mockUsers = {
    'user123': { id: 'user123', email: "test@example.com", password: "Test@1234", fullName: "Test User" },
};

const mockCodes = {
    "test@example.com": "ABC123" 
};

function validatePassword(password) {
    if (password && password.length < 8) return { isValid: false, errors: ["Password too short"] };
    return { isValid: true, errors: [] };
}

app.post('/api/auth/verify-reset-code', async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;

        if (!email || !code || !newPassword) {
            return res.status(400).json({ message: "Email, code, and new password are required" });
        }

        const passwordValidation = validatePassword(newPassword);
        if (!passwordValidation.isValid) {
            return res.status(400).json({ 
                message: "Password does not meet requirements", 
                errors: passwordValidation.errors 
            });
        }

        const expectedCode = mockCodes[email];
        if (!expectedCode || code !== expectedCode) {
            return res.status(401).json({ message: "Invalid or expired reset code" });
        }
        
        const userEntry = Object.entries(mockUsers).find(([_, u]) => u.email === email);

        if (!userEntry) {
            return res.status(404).json({ message: "User not found" });
        }
        const [userId, user] = userEntry;

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        mockUsers[userId].password = hashedPassword;

        delete mockCodes[email];

        return res.status(200).json({
            message: "Password reset successfully",
        });
    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});