import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import dotenv from "dotenv"
import userRouter from './routes/userRoutes.js'
import passwordRouter from "./routes/passwordRoutes.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

console.log("CLIENT_URL från env:", process.env.CLIENT_URL);

// Middleware
const allowedOrigin = process.env.CLIENT_URL

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}))

app.use(express.json())

app.use('/api/user', userRouter)
app.use("/api/passwords", passwordRouter)

// Starta servern
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server körs på http://localhost:${PORT}`);
  });
};

startServer();