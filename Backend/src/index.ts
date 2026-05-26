/**
 * Express API placeholder — not wired to frontend yet.
 * Run `npm run dev` when you're ready to build real endpoints.
 */
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'ashram-travel-api' })
})

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
