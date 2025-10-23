import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import dotenv from "dotenv"
import userRouter from './routes/userRoutes.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
const allowedOrigin = process.env.CLIENT_URL || '*'

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}))

app.use(express.json())    // Parsar JSON i inkommande request

app.use('/api/user', userRouter)

// Här lägger ni era endpoints för användare, lösenord etc.

// Starta servern
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server körs på http://localhost:${PORT}`);
  });
};

startServer();