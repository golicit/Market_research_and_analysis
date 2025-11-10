import express from 'express';
import { URL } from 'url'; 

const app = express(); 
app.use(express.json());


app.get('/api/auth/google', (req, res) => {
    try {
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const redirectUri = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3001/api/auth/google/callback";
        const scope = "openid profile email";

        if (!clientId) {
            return res.status(500).json({ message: "Google OAuth not configured" });
        }

        const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
        
        googleAuthUrl.searchParams.append("client_id", clientId);
        googleAuthUrl.searchParams.append("redirect_uri", redirectUri);
        googleAuthUrl.searchParams.append("response_type", "code");
        googleAuthUrl.searchParams.append("scope", scope);
        
        return res.redirect(googleAuthUrl.toString());

    } catch (error) {
        console.error("Google OAuth error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});