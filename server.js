const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Routes
app.post('/api/payment', (req, res) => {
    try {
        const { paymentType, plan, customer, timestamp } = req.body;
        
        // Log payment data
        console.log('Payment received:', {
            paymentType,
            plan,
            customer,
            timestamp
        });
        
        // Here you would integrate with actual payment gateways
        // For now, we'll simulate a successful payment
        
        // Simulate processing delay
        setTimeout(() => {
            res.json({
                success: true,
                message: 'Payment processed successfully',
                transactionId: generateTransactionId(),
                timestamp: new Date().toISOString()
            });
        }, 1000);
        
    } catch (error) {
        console.error('Payment processing error:', error);
        res.status(500).json({
            success: false,
            message: 'Payment processing failed',
            error: error.message
        });
    }
});

// YooKassa webhook endpoint
app.post('/api/yookassa/webhook', (req, res) => {
    try {
        const { event, object } = req.body;
        
        console.log('YooKassa webhook received:', { event, object });
        
        // Handle different payment events
        switch (event) {
            case 'payment.succeeded':
                handlePaymentSuccess(object);
                break;
            case 'payment.canceled':
                handlePaymentCanceled(object);
                break;
            case 'payment.waiting_for_capture':
                handlePaymentWaiting(object);
                break;
            default:
                console.log('Unhandled event:', event);
        }
        
        res.json({ success: true });
        
    } catch (error) {
        console.error('Webhook processing error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Sberbank installment endpoint
app.post('/api/sberbank/installment', (req, res) => {
    try {
        const { customer, plan, bank } = req.body;
        
        console.log('Sberbank installment request:', { customer, plan, bank });
        
        // Simulate installment application processing
        setTimeout(() => {
            res.json({
                success: true,
                message: 'Installment application submitted',
                applicationId: generateApplicationId(),
                status: 'pending',
                estimatedResponseTime: '24 hours'
            });
        }, 2000);
        
    } catch (error) {
        console.error('Sberbank installment error:', error);
        res.status(500).json({
            success: false,
            message: 'Installment application failed',
            error: error.message
        });
    }
});

// Tinkoff installment endpoint
app.post('/api/tinkoff/installment', (req, res) => {
    try {
        const { customer, plan, bank } = req.body;
        
        console.log('Tinkoff installment request:', { customer, plan, bank });
        
        // Simulate installment application processing
        setTimeout(() => {
            res.json({
                success: true,
                message: 'Installment application submitted',
                applicationId: generateApplicationId(),
                status: 'pending',
                estimatedResponseTime: '24 hours'
            });
        }, 2000);
        
    } catch (error) {
        console.error('Tinkoff installment error:', error);
        res.status(500).json({
            success: false,
            message: 'Installment application failed',
            error: error.message
        });
    }
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        console.log('Contact form submitted:', { name, email, message });
        
        // Here you would send email notification
        // For now, we'll just log it
        
        res.json({
            success: true,
            message: 'Message sent successfully'
        });
        
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message',
            error: error.message
        });
    }
});

// Analytics endpoint
app.post('/api/analytics', (req, res) => {
    try {
        const { event, data } = req.body;
        
        console.log('Analytics event:', { event, data, timestamp: new Date().toISOString() });
        
        // Here you would send to analytics service
        // For now, we'll just log it
        
        res.json({ success: true });
        
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Utility functions
function generateTransactionId() {
    return 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateApplicationId() {
    return 'APP_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function handlePaymentSuccess(paymentData) {
    console.log('Payment succeeded:', paymentData);
    // Here you would:
    // 1. Update database
    // 2. Send confirmation email
    // 3. Grant access to course
    // 4. Update analytics
}

function handlePaymentCanceled(paymentData) {
    console.log('Payment canceled:', paymentData);
    // Here you would:
    // 1. Update database
    // 2. Send cancellation email
    // 3. Update analytics
}

function handlePaymentWaiting(paymentData) {
    console.log('Payment waiting for capture:', paymentData);
    // Here you would:
    // 1. Update database
    // 2. Send reminder email
    // 3. Update analytics
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the landing page`);
});

module.exports = app; 