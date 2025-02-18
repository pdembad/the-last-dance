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
//app.use(express.static('public'));

// Créer une instance Twilio client
const client = twilio("ACa5b7a1d708145bd59252af14a06d05ef", "801543f695fb985ff39c0161cb1a354b");

// Servez les fichiers statiques depuis la racine du projet
app.use(express.static(path.join(__dirname, '/')));

// Route pour envoyer un message
app.post('/send-message', async (req, res) => {
    const { message } = req.body;
    console.log("here", req.body);
    console.log("Requête reçue sur /send-message"); // Log when the request is received
    console.log("Message reçu:", message);  // Log the message that was received


    try {
        // Log to check if the Twilio client is called
        console.log("Tentative d'envoi du message...");
        
        const response = await client.messages.create({
            body: message,
            from: "+18153653592", // Numéro Twilio à partir des variables d'environnement
            to: "+33767889424" // Numéro du destinataire (remplacer par le numéro réel)
        });

        console.log("Message envoyé:", response);  // Log if the message is successfully sent
        res.json({ success: true, message: 'Message envoyé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l’envoi du message:', error);  // Log any error
        res.status(500).json({ success: false, error: error.message });
    }
});

// 🚀 Serve index.html pour la page d'accueil
app.get('/', (req, res) => {
    console.log('Page d\'accueil demandée');
    res.sendFile(__dirname + '/index.html');
});


// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
