import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import dotenv from "dotenv"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())            // Tillåt CORS (frontend kan anropa backend
app.use(express.json())    // Parsar JSON i inkommande request

// Dummy route för test
app.get('/', (req, res) => {
  res.send('Backend server is running')
})

// Exempel API-route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Här lägger ni era endpoints för användare, lösenord etc.

// Starta servern
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server körs på http://localhost:${PORT}`);
  });
};

startServer();