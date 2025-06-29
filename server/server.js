const express = require('express');
const cors = require('cors');
require('dotenv').config();

const academicRoutes = require('./routes/academicRoutes');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://decus-five.vercel.app/']
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/academics', academicRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
