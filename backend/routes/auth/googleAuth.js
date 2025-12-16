const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../../Model/user.js');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /api/auth/google-login
router.post('/', async (req, res) => {
  try {
    console.log('🔐 Google auth endpoint hit!');
    const { token, userInfo } = req.body;

    if (!token && !userInfo) {
      return res.status(400).json({ 
        success: false,
        error: 'Token or userInfo is required' 
      });
    }

    let userData;

    if (userInfo) {
      // If user info is sent from frontend, use it directly
      userData = userInfo;
      console.log('✅ Using userInfo from request:', userData);
    } else {
      // Otherwise, verify token with Google
      try {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        userData = ticket.getPayload();
        console.log('✅ Token verified with Google');
      } catch (tokenError) {
        console.error('❌ Token verification failed:', tokenError.message);
        return res.status(401).json({ 
          success: false,
          error: 'Invalid token' 
        });
      }
    }

    const { email, name, picture, sub } = userData;

    if (!email) {
      return res.status(400).json({ 
        success: false,
        error: 'Email not provided' 
      });
    }

    console.log('👤 Google user:', { email, name });

    // Check if user exists → if not, create
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        picture,
        provider: 'google',
        googleId: sub // Store Google ID
      });
      console.log('✅ New user created:', user._id);
    } else {
      console.log('✅ Existing user found:', user._id);
    }

    // Generate JWT for your app
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture
      },
    });
  } catch (err) {
    console.error('❌ Google auth error:', err);
    res.status(400).json({ 
      success: false,
      error: 'Authentication failed',
      message: err.message
    });
  }
});

module.exports = router;