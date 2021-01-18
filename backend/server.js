import path from 'path'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

//middleware for error-checking
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

//routing db--> API
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

//dev tools for logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//allows json object on body of requests
app.use(express.json())

app.use((req, res, next) => {
  next()
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

//taking it to the upload folder and making it static
//static folder is not available for web app by default
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  //making frontend static folder
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  5000,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode at port ${PORT}`.yellow
      .bold
  )
)
