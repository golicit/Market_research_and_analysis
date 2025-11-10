import express from 'express';
import bcrypt from 'bcryptjs';

interface User {
    email: string;
    password: string; 
    fullName: string;
    id: string; 
}

const app = express(); 
app.use(express.json());

const mockUsers: Record<string, User> = {}; 

function validateFullName(name: string) { return name && name.length >= 2; }
function validateEmail(email: string) { const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; return re.test(String(email).toLowerCase()); }
function validatePassword(password: string) { 
    if (password.length < 8) return { isValid: false, errors: ["Password too short"] };
    return { isValid: true, errors: [] };
}
function generateToken(userId: string, email: string) {
    return `mock_jwt_token_for_${userId}_${email}`;
}


app.post('/api/auth/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body as { fullName: string, email: string, password: string };
        if (Object.values(mockUsers).some((u) => u.email === email)) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = "user" + Date.now();
        const newUser: User = { 
            email, 
            password: hashedPassword,
            fullName,
            id: userId 
        };
        mockUsers[userId] = newUser; 

        const token = generateToken(userId, email);

        return res.status(201).json({
            message: "Registration successful",
            token,
            user: {
                id: userId,
                email,
                fullName,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});