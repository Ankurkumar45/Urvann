const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv')
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
dotenv.config();

const allowedOrigins = [
    'http://localhost:5173',
    'https://urvann-nxtj.vercel.app'
]

app.use(cors(
    {
        origin: allowedOrigins,
        credentials: true,
    }
));
app.use(express.json());

app.use('/api/auth', authRoutes);

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

