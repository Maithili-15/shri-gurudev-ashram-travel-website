import { config as loadEnv } from 'dotenv'
loadEnv({ path: '.env.development' })

import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { HttpError } from './errors'
import { adminRouter } from './routes/admin'
import { bookingsRouter } from './routes/bookings'
import { paymentsRouter } from './routes/payments'
import { razorpayWebhookRouter } from './routes/razorpayWebhook'
import { usersRouter } from './routes/users'

export const app = express()

// CORS — allow Vite dev server and production frontend
app.use(
  cors({
    origin: [
      'http://localhost:5173', // Vite dev server
      'http://localhost:4173', // Vite preview
      'http://localhost:3001', // alternate dev port
      process.env.FRONTEND_URL ?? '', // production frontend URL
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

app.use('/api/webhooks/razorpay', express.raw({ type: 'application/json' }), razorpayWebhookRouter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/bookings', bookingsRouter)
app.use('/api/payments', paymentsRouter)
app.use('/api/users', usersRouter)
app.use('/api/admin', adminRouter)

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  const status = error instanceof HttpError ? error.status : 500
  const message = error instanceof Error ? error.message : 'Internal server error'

  response.status(status).json({
    error: message,
  })
})

export function startServer() {
  const port = Number(process.env.PORT ?? 3000)

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error('Missing or invalid environment variable: PORT')
  }

  return app.listen(port, () => {
    console.log(`Backend server listening on port ${port}`)
  })
}
