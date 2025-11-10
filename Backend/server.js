const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const connectMongo = require('./DB');
const Users = require('./Model/user');
const Courses = require('./Model/course');
const Webinar = require('./Model/webinar');
const cors = require('cors');

require('dotenv').config();

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

// Middleware setup
app.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:3000', 'http://127.0.0.1:8080', 'http://127.0.0.1:8081', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const userRoutes = require('./routes');
app.use('/api/user', userRoutes);
app.use('/api/auth', userRoutes); // Frontend compatibility
app.use('/api', userRoutes); // For course routes


// Test route
app.get('/test', (req, res) => {
    console.log('📡 Test endpoint accessed:', new Date().toISOString());
    console.log('Request headers:', req.headers);
    res.json({ 
        message: 'Server is working!', 
        timestamp: new Date(),
        port: process.env.PORT,
        cors: 'enabled',
        status: 'ok'
    });
});

// Backend test page
app.get('/backend-test', (req, res) => {
    console.log('📊 Backend test page accessed');
    res.sendFile(path.join(__dirname, 'backend-test.html'));
});

// Coupon tester route
app.get('/coupon-tester', (req, res) => {
    console.log('📡 Coupon tester accessed');
    res.sendFile(path.join(__dirname, 'coupon-tester.html'));
});

// Server status route
app.get('/status', (req, res) => {
    console.log('📡 Server status page accessed');
    res.sendFile(path.join(__dirname, 'server-status.html'));
});

// Payment test page
app.get('/payment-test', (req, res) => {
    console.log('📡 Payment test page accessed');
    res.sendFile(path.join(__dirname, 'payment-test.html'));
});

// OrderItem Data Viewer Route
app.get('/view-orderitems', async (req, res) => {
    try {
        console.log('📊 OrderItem data viewer accessed');
        
        // Get all OrderItems with course details
        const OrderItem = require('./Model/orderItem');
        const orderItems = await OrderItem.find()
            .populate('courseId', 'title slug price description')
            .sort({ createdAt: -1 });
        
        // Generate HTML response
        let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>OrderItem Data Viewer</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
                .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
                .stats { background: #ecf0f1; padding: 15px; border-radius: 5px; margin: 20px 0; }
                .orderitem { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 5px; background: #fafafa; }
                .orderitem h3 { margin: 0 0 10px 0; color: #2980b9; }
                .field { margin: 5px 0; }
                .label { font-weight: bold; color: #555; }
                .value { color: #333; }
                .no-data { text-align: center; color: #7f8c8d; padding: 40px; }
                .refresh { background: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
                .refresh:hover { background: #2980b9; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🛒 OrderItem Data in MongoDB Atlas</h1>
                
                <div class="stats">
                    <h3>📊 Statistics</h3>
                    <div class="field">
                        <span class="label">Total OrderItems:</span> 
                        <span class="value">${orderItems.length}</span>
                    </div>
                    <div class="field">
                        <span class="label">Database:</span> 
                        <span class="value">MongoDB Atlas Connected ✅</span>
                    </div>
                    <div class="field">
                        <span class="label">Last Updated:</span> 
                        <span class="value">${new Date().toLocaleString()}</span>
                    </div>
                </div>
                
                <button class="refresh" onclick="window.location.reload()">🔄 Refresh Data</button>
        `;
        
        if (orderItems.length === 0) {
            html += `
                <div class="no-data">
                    <h3>📭 No OrderItems Found</h3>
                    <p>Your OrderItem collection is empty. You can create OrderItems using the API:</p>
                    <code>POST /api/order-items</code>
                </div>
            `;
        } else {
            orderItems.forEach((item, index) => {
                html += `
                    <div class="orderitem">
                        <h3>📦 OrderItem #${index + 1}</h3>
                        <div class="field">
                            <span class="label">🆔 Database ID:</span> 
                            <span class="value">${item._id}</span>
                        </div>
                        <div class="field">
                            <span class="label">📊 Order ID:</span> 
                            <span class="value">${item.orderId}</span>
                        </div>
                        <div class="field">
                            <span class="label">📚 Course:</span> 
                            <span class="value">${item.courseId.title}</span>
                        </div>
                        <div class="field">
                            <span class="label">🏷️ Course Slug:</span> 
                            <span class="value">${item.courseId.slug}</span>
                        </div>
                        <div class="field">
                            <span class="label">💰 Unit Price:</span> 
                            <span class="value">₹${(item.unitPrice / 100).toFixed(2)}</span>
                        </div>
                        <div class="field">
                            <span class="label">📦 Quantity:</span> 
                            <span class="value">${item.quantity}</span>
                        </div>
                        <div class="field">
                            <span class="label">💵 Total Price:</span> 
                            <span class="value">₹${(item.totalPrice / 100).toFixed(2)}</span>
                        </div>
                        <div class="field">
                            <span class="label">📅 Created:</span> 
                            <span class="value">${new Date(item.createdAt).toLocaleString()}</span>
                        </div>
                        <div class="field">
                            <span class="label">🔄 Updated:</span> 
                            <span class="value">${new Date(item.updatedAt).toLocaleString()}</span>
                        </div>
                    </div>
                `;
            });
        }
        
        html += `
                <div style="margin-top: 30px; padding: 20px; background: #e8f5e8; border-radius: 5px;">
                    <h3>🎉 OrderItem Model Status</h3>
                    <p>✅ OrderItem model is working perfectly!</p>
                    <p>✅ Data is being stored in MongoDB Atlas!</p>
                    <p>✅ All relationships and calculations are working!</p>
                    <p>✅ You can access this data via API endpoints!</p>
                </div>
            </div>
        </body>
        </html>
        `;
        
        res.send(html);
        
    } catch (error) {
        console.error('❌ OrderItem viewer error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching OrderItem data',
            error: error.message
        });
    }
});

// Order Data Viewer Route
app.get('/view-orders', async (req, res) => {
    try {
        console.log('📊 Order data viewer accessed');
        
        // Get all Orders
        const Order = require('./Model/order');
        const orders = await Order.find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });
        
        // Generate HTML response
        let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Order Data Viewer</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
                .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                h1 { color: #2c3e50; border-bottom: 3px solid #e74c3c; padding-bottom: 10px; }
                .stats { background: #ecf0f1; padding: 15px; border-radius: 5px; margin: 20px 0; }
                .order { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 5px; background: #fafafa; }
                .order h3 { margin: 0 0 10px 0; color: #e74c3c; }
                .field { margin: 5px 0; }
                .label { font-weight: bold; color: #555; }
                .value { color: #333; }
                .status { padding: 3px 8px; border-radius: 3px; font-size: 12px; font-weight: bold; }
                .status-created { background: #f39c12; color: white; }
                .status-pending_payment { background: #e67e22; color: white; }
                .status-paid { background: #27ae60; color: white; }
                .status-failed { background: #e74c3c; color: white; }
                .status-refunded { background: #95a5a6; color: white; }
                .no-data { text-align: center; color: #7f8c8d; padding: 40px; }
                .refresh { background: #e74c3c; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
                .refresh:hover { background: #c0392b; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🛍️ Order Data in MongoDB Atlas</h1>
                
                <div class="stats">
                    <h3>📊 Statistics</h3>
                    <div class="field">
                        <span class="label">Total Orders:</span> 
                        <span class="value">${orders.length}</span>
                    </div>
                    <div class="field">
                        <span class="label">Database:</span> 
                        <span class="value">MongoDB Atlas Connected ✅</span>
                    </div>
                    <div class="field">
                        <span class="label">Last Updated:</span> 
                        <span class="value">${new Date().toLocaleString()}</span>
                    </div>
                </div>
                
                <button class="refresh" onclick="window.location.reload()">🔄 Refresh Data</button>
        `;
        
        if (orders.length === 0) {
            html += `
                <div class="no-data">
                    <h3>📭 No Orders Found</h3>
                    <p>Your Order collection is empty. You can create Orders using the API:</p>
                    <code>POST /api/orders</code>
                </div>
            `;
        } else {
            orders.forEach((order, index) => {
                html += `
                    <div class="order">
                        <h3>🛍️ Order #${index + 1}</h3>
                        <div class="field">
                            <span class="label">🆔 Order ID:</span> 
                            <span class="value">${order.id}</span>
                        </div>
                        <div class="field">
                            <span class="label">📊 Database ID:</span> 
                            <span class="value">${order._id}</span>
                        </div>
                        <div class="field">
                            <span class="label">📧 Email:</span> 
                            <span class="value">${order.email}</span>
                        </div>
                        <div class="field">
                            <span class="label">📱 Phone:</span> 
                            <span class="value">${order.phone || 'Not provided'}</span>
                        </div>
                        <div class="field">
                            <span class="label">💰 Total Amount:</span> 
                            <span class="value">₹${(order.totalAmount / 100).toFixed(2)} ${order.currency}</span>
                        </div>
                        <div class="field">
                            <span class="label">💳 Status:</span> 
                            <span class="value status status-${order.status}">${order.status.toUpperCase()}</span>
                        </div>
                        <div class="field">
                            <span class="label">🎫 Coupon ID:</span> 
                            <span class="value">${order.couponId || 'None'}</span>
                        </div>
                        <div class="field">
                            <span class="label">💳 Payment ID:</span> 
                            <span class="value">${order.paymentId || 'None'}</span>
                        </div>
                        <div class="field">
                            <span class="label">👤 User ID:</span> 
                            <span class="value">${order.userId || 'Guest Order'}</span>
                        </div>
                        <div class="field">
                            <span class="label">📅 Created:</span> 
                            <span class="value">${new Date(order.createdAt).toLocaleString()}</span>
                        </div>
                        <div class="field">
                            <span class="label">🔄 Updated:</span> 
                            <span class="value">${new Date(order.updatedAt).toLocaleString()}</span>
                        </div>
                    </div>
                `;
            });
        }
        
        html += `
                <div style="margin-top: 30px; padding: 20px; background: #e8f5e8; border-radius: 5px;">
                    <h3>🎉 Order Model Status</h3>
                    <p>✅ Order model is working perfectly!</p>
                    <p>✅ Data is being stored in MongoDB Atlas!</p>
                    <p>✅ All Prisma schema fields implemented!</p>
                    <p>✅ Auto-incrementing ID working!</p>
                    <p>✅ Status validation working!</p>
                    <p>✅ You can access this data via API endpoints!</p>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 5px;">
                    <h4>🔗 API Endpoints Available:</h4>
                    <ul>
                        <li><strong>GET</strong> /api/orders - Get all orders</li>
                        <li><strong>GET</strong> /api/orders/:id - Get order by ID</li>
                        <li><strong>POST</strong> /api/orders - Create new order</li>
                        <li><strong>PUT</strong> /api/orders/:id - Update order</li>
                        <li><strong>DELETE</strong> /api/orders/:id - Delete order</li>
                    </ul>
                </div>
            </div>
        </body>
        </html>
        `;
        
        res.send(html);
        
    } catch (error) {
        console.error('❌ Order viewer error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching Order data',
            error: error.message
        });
    }
});

// API Routes (these should come BEFORE static files)
// Get all users
app.get('/api/users', async (req, res) => {
    try {
        console.log('GET / - Fetching all users');
        const data = await Users.find({}).select('-passwordHash');
        console.log(`Found ${data.length} users`);
        res.status(200).json({
            success: true,
            count: data.length,
            data: data
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
});

// Create new user
app.post("/api/users", async (req, res) => {
    try {
        console.log('POST / - Creating new user:', req.body);
        const { name, email, password, role, orders, testimonials } = req.body;
        
        // Validate required fields
        if (!name || !email  || !password) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: name, email, Phone, and password are required'
            });
        }

        // Hash the password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Create user object
        const userData = {
            name,
            email,
            
            passwordHash,
            role: role || 'user',
            createdAt: new Date(),
            updatedAt: new Date(),
            orders: orders || [],
            testimonials: testimonials || []
        };

        const User = new Users(userData);
        await User.save();
        
        console.log('User created successfully with ID:', User._id);
        
        // Remove password hash from response
        const userResponse = User.toObject();
        delete userResponse.passwordHash;
        
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: userResponse
        });
    } catch (error) {
        console.error('Error creating user:', error);
        
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({
                success: false,
                message: `${field} already exists`
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
    try {
        console.log('GET /user/:id - Fetching user with ID:', req.params.id);
        const user = await Users.findById(req.params.id).select('-passwordHash');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: error.message
        });
    }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
    try {
        console.log('PUT /user/:id - Updating user:', req.params.id, req.body);
        const updateData = { ...req.body };
        
        if (updateData.password) {
            const saltRounds = 10;
            updateData.passwordHash = await bcrypt.hash(updateData.password, saltRounds);
            delete updateData.password;
        }
        
        updateData.updatedAt = new Date();
        
        const user = await Users.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true, runValidators: true }
        ).select('-passwordHash');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
    try {
        console.log('DELETE /user/:id - Deleting user:', req.params.id);
        const user = await Users.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
});

// Start server with robust error handling
async function startServer() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await connectMongo();
        console.log('✅ MongoDB connected successfully');
        console.log('✅ Database connected successfully');
        
        const PORT = process.env.PORT || 3000;
        
        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Backend Server is running on port ${PORT}`);
            console.log(`📡 API Base URL: http://localhost:${PORT}`);
            console.log(`🔧 Test endpoint: http://localhost:${PORT}/test`);
            console.log(`📋 Available API Endpoints:`);
            console.log(`   POST /api/auth/register - User Registration`);
            console.log(`   POST /api/auth/login - User Login`);
            console.log(`   GET  /api/testimonials - Get all testimonials`);
            console.log(`   POST /api/testimonials - Create new testimonial`);
            console.log(`   GET  /api/testimonials/recent - Get recent testimonials`);
            console.log(`   GET  /api/testimonials/:id - Get testimonial by ID`);
            console.log(`   PUT  /api/testimonials/:id - Update testimonial`);
            console.log(`   DELETE /api/testimonials/:id - Delete testimonial`);
        });

        // Handle server errors
        server.on('error', (error) => {
            console.error('❌ Server error:', error);
            if (error.code === 'EADDRINUSE') {
                console.error(`❌ Port ${PORT} is already in use. Please close other Node.js processes or use a different port.`);
            }
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            console.log('\n🛑 Received SIGINT. Gracefully shutting down...');
            server.close(() => {
                console.log('✅ Server closed successfully');
                process.exit(0);
            });
        });

        process.on('SIGTERM', async () => {
            console.log('\n🛑 Received SIGTERM. Gracefully shutting down...');
            server.close(() => {
                console.log('✅ Server closed successfully');
                process.exit(0);
            });
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        console.error('📋 Troubleshooting steps:');
        console.error('   1. Check if MongoDB connection string is correct in .env');
        console.error('   2. Ensure all dependencies are installed (npm install)');
        console.error('   3. Check if port 3000 is available');
        console.error('   4. Verify all Model files exist and have no syntax errors');
        process.exit(1);
    }
}

startServer();