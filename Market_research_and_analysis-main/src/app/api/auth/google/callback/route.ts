
import express from 'express';

const CLIENT_BASE_URL = 'http://localhost:3000'; 


const app = express(); 
app.use(express.json());

app.get('/api/auth/google/callback', async (req, res) => {
    try {
        const code = req.query.code;
        const error = req.query.error;

        const redirectToLogin = (errorMessage) => {
            const redirectUrl = new URL(`/login`, CLIENT_BASE_URL);
            if (errorMessage) {
                redirectUrl.searchParams.set("error", errorMessage);
            }
            return res.redirect(redirectUrl.toString());
        };

        if (error) {
            return redirectToLogin(error);
        }

        if (!code) {
            return redirectToLogin("missing_code");
        }

        const sessionData = JSON.stringify({ provider: "google" });
        const maxAgeSeconds = 7 * 24 * 60 * 60;


        res.cookie("session", sessionData, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: maxAgeSeconds * 1000, 
        });

        const dashboardUrl = new URL("/dashboard", CLIENT_BASE_URL);
        return res.redirect(dashboardUrl.toString());

    } catch (error) {
        console.error("Google OAuth callback error:", error);
        return res.redirect(`${CLIENT_BASE_URL}/login?error=callback_error`);
    }
});