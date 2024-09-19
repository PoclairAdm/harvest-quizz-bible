const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost/harvestquiz', { useNewUrlParser: true, useUnifiedTopology: true });

// Modèle de joueur
const Player = mongoose.model('Player', {
    name: String,
    phone: String,
    country: String,
    city: String,
    score: Number
});

// Routes
app.post('/api/players', async (req, res) => {
    try {
        const player = new Player(req.body);
        await player.save();
        res.status(201).json(player);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/players', async (req, res) => {
    try {
        const players = await Player.find();
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/players/:id', async (req, res) => {
    try {
        const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(player);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
