
import express from 'express';
import bcrypt from 'bcryptjs';

const app = express(); 
app.use(express.json());

const mockUsers = {
    'user123': { 
        id: 'user123', 
        email: "test@example.com", 
        password: "$2a$10$abcdefghijklmnopqrstuvwxyza", 
        fullName: "Test User" 
    },
};

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return re.test(String(email).toLowerCase());
}

function generateToken(userId, email) {
    return `mock_jwt_token_for_${userId}_${email}`;
}
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }


        const userEntry = Object.entries(mockUsers).find(([_, u]) => u.email === email);
        if (!userEntry) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        const [userId, user] = userEntry;

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(userId, email);

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: userId,
                email: user.email,
                fullName: user.fullName,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});