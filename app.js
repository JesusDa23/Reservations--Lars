const express = require('express');
const app = express();
const reservationRoutes = require('./routes/reservationRoutes');
const sequelize = require('./config/database');
const cors = require('cors');

// Configura CORS para permitir todos los orígenes
app.use(cors({
  origin: '*', // Permite todos los orígenes
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permite los métodos especificados
  allowedHeaders: 'Content-Type, Authorization', // Permite los headers especificados
  credentials: true // Permite el uso de credenciales
}));

app.use(express.json());
app.use('/api', reservationRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    await sequelize.sync();
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
