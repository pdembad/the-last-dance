const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Twilio client
const client = twilio("ACa5b7a1d708145bd59252af14a06d05ef", "15b2db94fb345aca62f026d543764555");

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

// Send message endpoint
app.post('/send-message', async (req, res) => {
    const { message } = req.body;
    console.log("Received message:", message);

    try {
        const response = await client.messages.create({
            body: message,
            from: "+18153653592",
            to: "+33767889424"
        });

        console.log("Message sent:", response.sid);
        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
