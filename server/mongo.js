const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://sindhebharath10:root123@cluster0.bm0fk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {
      dbName: 'mern-auth', // Ensure the database name is correct
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('Connection Error:', err));
