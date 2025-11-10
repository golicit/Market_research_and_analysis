import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors'; 
const users = {};

const app = express();
const PORT = 3001; 

app.use(cors()); 
app.use(express.json()); 

app.post('/api/auth/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        if (users[email]) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        users[email] = {
            id: Math.random().toString(36).substring(7),
            firstName,
            lastName,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        };

        console.log('New User Registered:', users[email].id);

        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Registration endpoint: POST http://localhost:${PORT}/api/auth/register`);
});