// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import connectDB from './utils/db';
import router from './routes/router';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use category routes
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});