const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv')
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
// app.use('/api/auth', authRoutes);

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

