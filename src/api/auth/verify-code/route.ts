import express from 'express';


const app = express(); 
app.use(express.json());const mockResetCodes = {
    "test@example.com": {
        code: "ABC123",
        expiresAt: Date.now() + (60 * 60 * 1000) 
    }
};app.post('/api/auth/verify-code', async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({ message: "Email and code are required" });
        }

        const codeData = mockResetCodes[email];

        if (!codeData || codeData.code !== code) {
            return res.status(401).json({ message: "Invalid or expired reset code" });
        }
        
        if (codeData.expiresAt < Date.now()) {
            delete mockResetCodes[email];
            return res.status(401).json({ message: "Invalid or expired reset code" });
        }

        return res.status(200).json({
            message: "Code verified successfully",
        });

    } catch (error) {
        console.error("Verify code error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});