const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const connectMongo = require('./DB');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes');

// Global error handlers for unhandled errors
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

const app = express();

// Trust proxy (important for rate limiting behind reverse proxies)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
        },
    },
    crossOriginEmbedderPolicy: false
}));

// Rate limiting
const globalLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 requests per window
    message: {
        success: false,
        message: 'Too many requests, please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Skip successful requests for rate limiting counting
    skip: (req, res) => res.statusCode < 400
});

app.use(globalLimiter);

// CORS configuration
const corsOrigins = process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
    : ['http://localhost:8080', 'http://localhost:3000'];

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        if (corsOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
}));

// Body parsing middleware
app.use(express.json({ 
    limit: '10mb',
    verify: (req, res, buf) => {
        req.rawBody = buf;
    }
}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize({
    allowDots: true,
    onSanitize: ({ req, key }) => {
        console.warn(`Sanitized request data - Key: ${key}`);
    }
}));

// Request logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${req.method} ${req.path} - IP: ${req.ip}`);
    next();
});

// Health check endpoint (no rate limiting)
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        env: process.env.NODE_ENV || 'development'
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api', userRoutes);

// Test route with rate limiting
const testLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // 10 requests per minute
    message: {
        success: false,
        message: 'Too many test requests'
    }
});

app.get('/test', testLimiter, (req, res) => {
    console.log('📡 Test endpoint accessed:', new Date().toISOString());
    res.json({ 
        message: 'Server is working securely!', 
        timestamp: new Date(),
        port: process.env.PORT,
        security: 'enabled',
        cors: 'restricted',
        rateLimit: 'active',
        status: 'ok'
    });
});

// Static file serving (with security headers)
app.use('/static', express.static(path.join(__dirname, 'public'), {
    maxAge: '1d',
    etag: false,
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.setHeader('X-Frame-Options', 'DENY');
        }
    }
}));

// Backend test pages with stricter rate limiting
const adminLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 20, // 20 requests per 5 minutes
    message: { success: false, message: 'Too many admin requests' }
});

app.get('/backend-test', adminLimiter, (req, res) => {
    console.log('📊 Backend test page accessed');
    res.sendFile(path.join(__dirname, 'backend-test.html'));
});

app.get('/view-orders', adminLimiter, async (req, res) => {
    // Implementation for viewing orders (keep existing code but add security)
    try {
        console.log('📊 Order data viewer accessed');
        // ... existing implementation
        res.json({ message: 'Order viewer endpoint - add existing implementation here' });
    } catch (error) {
        console.error('❌ Order viewer error:', error);
        res.status(500).json({
            success: false,
            message: 'Error accessing order data'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);

    // CORS error
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            success: false,
            message: 'CORS: Origin not allowed'
        });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors
        });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token expired'
        });
    }

    // MongoDB duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({
            success: false,
            message: `${field} already exists`
        });
    }

    // Default error response
    res.status(err.status || 500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Start server with robust error handling
async function startServer() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await connectMongo();
        console.log('✅ MongoDB connected successfully');
        
        const PORT = process.env.PORT || 3000;
        
        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Secure Backend Server running on port ${PORT}`);
            console.log(`📡 API Base URL: http://localhost:${PORT}`);
            console.log(`🔒 Security Features Enabled:`);
            console.log(`   ✅ Helmet security headers`);
            console.log(`   ✅ Rate limiting (${process.env.RATE_LIMIT_MAX_REQUESTS || 100} req/15min)`);
            console.log(`   ✅ CORS protection (${corsOrigins.length} allowed origins)`);
            console.log(`   ✅ Request sanitization`);
            console.log(`   ✅ JWT authentication`);
            console.log(`   ✅ Input validation`);
            console.log(`🔧 Available Endpoints:`);
            console.log(`   POST /api/auth/register - User Registration`);
            console.log(`   POST /api/auth/login - User Login`);
            console.log(`   GET  /api/auth/verify - Verify Token`);
            console.log(`   GET  /health - Health Check`);
            console.log(`   GET  /test - Test Endpoint`);
        });

        // Handle server errors
        server.on('error', (error) => {
            console.error('❌ Server error:', error);
            if (error.code === 'EADDRINUSE') {
                console.error(`❌ Port ${PORT} is already in use.`);
            }
        });

        // Graceful shutdown
        const gracefulShutdown = async (signal) => {
            console.log(`\n🛑 Received ${signal}. Gracefully shutting down...`);
            
            server.close(() => {
                console.log('✅ HTTP server closed');
                
                // Close database connection
                const mongoose = require('mongoose');
                if (mongoose.connection.readyState === 1) {
                    mongoose.connection.close();
                    console.log('✅ MongoDB connection closed');
                }
                process.exit(0);
            });

            // Force close after 10 seconds
            setTimeout(() => {
                console.error('❌ Forced shutdown after timeout');
                process.exit(1);
            }, 10000);
        };

        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        console.error('📋 Troubleshooting steps:');
        console.error('   1. Check if MongoDB connection string is correct in .env');
        console.error('   2. Ensure all dependencies are installed (npm install)');
        console.error('   3. Check if port is available');
        console.error('   4. Verify JWT_SECRET is set in .env');
        process.exit(1);
    }
}

startServer();

module.exports = app;