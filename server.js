const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const PORT = 3000;

// 🟢 Active CORS
app.use(cors());
app.use(bodyParser.json());

// 🟢 Serve les fichiers statiques
app.use(express.static('public'));

// Créer une instance Twilio client
const client = twilio("ACa5b7a1d708145bd59252af14a06d05ef", "9070aa8b29a3c38d8623b68fe2fffa93");

// Servez les fichiers statiques depuis la racine du projet
app.use(express.static(path.join(__dirname, '/')));

// Route pour envoyer un message
app.post('/send-message', async (req, res) => {
    const { message } = req.body;
    console.log("process.env:");
    console.log("SID Twilio:", process.env.TWILIO_ACCOUNT_SID);
    console.log("Token Twilio:", process.env.TWILIO_AUTH_TOKEN);
    console.log("Numéro Twilio:", process.env.TWILIO_PHONE_NUMBER);
    try {
        console.log("Message reçu:", message);  // Vérifie ce qui est reçu
        const response = await client.messages.create({
            body: message,
            from: "+18153653592", // Numéro Twilio à partir des variables d'environnement
            to: "+33767889424" // Numéro du destinataire (remplacer par le numéro réel)
        });
        console.log("Message envoyé:", response);  // Vérifie si le message a été envoyé
        res.json({ success: true, message: 'Message envoyé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l’envoi du message:', error);  // Log l'erreur
        res.status(500).json({ success: false, error: error.message });
    }
});

// 🚀 Serve index.html pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
