const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); // <-- Esto carga variables desde .env

// Conexión a MongoDB usando variable de entorno
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));

const app = express();
app.use(bodyParser.json());

// Modelo de lectura
const Reading = mongoose.model('Reading', {
  nfc_id: String,
  timestamp: String
});

// Ruta POST para guardar NFC
app.post('/api/nfc', async (req, res) => {
  const data = new Reading(req.body);
  await data.save();
  res.send({ success: true });
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor listo en puerto ${PORT}`));
