import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())            // Tillåt CORS (frontend kan anropa backend)
app.use(express.json())    // Parsar JSON i inkommande requests

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
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`)
})