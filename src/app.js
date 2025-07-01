const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to our API!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        status: 'healthy'
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Status endpoint
app.get('/status', (req, res) => {
    res.json({
        app: process.env.APP_NAME,
        status: 'operational',
        memoryUsage: process.memoryUsage(),
        nodeVersion: process.version
    });
});

// Example protected route using API key from environment
app.get('/protected', (req, res) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== 'my-secret-key-123') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    res.json({
        message: 'Access granted to protected resource',
        secretData: process.env.SECRET_DATA || 'Default secret'
    });
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Export the Express app (not starting it directly)
module.exports = app;