
import express from 'express';

const app = express(); 
app.use(express.json());

const mockUsers = {
    'user123': { email: "test@example.com", password: "Test@1234", fullName: "Test User" },
};

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return re.test(String(email).toLowerCase());
}

app.post('/api/auth/forgot-password', async (req, res) => {
    try {
        const { email } = req.body; 
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const userExists = Object.values(mockUsers).some((u) => u.email === email);

        if (!userExists) {
            return res.json({
                message: "If the email exists, a reset code will be sent",
            });
        }
       
        const mockCode = "ABC123"; 
        console.log(`Reset code for ${email}: ${mockCode}`);

        return res.json({
            message: "If the email exists, a reset code will be sent",
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});