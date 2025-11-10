import express from 'express';

const app = express();
app.post('/api/auth/logout', async (req, res) => {
    try {
       res.cookie("auth-token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Recommend setting this in production
            sameSite: "lax",
            expires: new Date(0), // Sets the expiry date to the past
        });

        return res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});