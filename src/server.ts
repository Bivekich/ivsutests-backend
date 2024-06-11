import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import bannerRoutes from './banner/bannerRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || ''

const allowedOrigins = ['http://localhost:5173', 'https://ivsutests.vercel.app/']

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Не разрешено CORS'))
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Подключен к MongoDB')
    }).catch((err) => {
    console.error('Не удалось подключиться к MongoDB', err)
})

app.use('/api/banner', bannerRoutes)

app.get('/', (req, res) => {
    res.send('Hello IVSU!')
})

app.listen(PORT, () => {
    console.log(`Сервер работает по порту ${PORT}`)
})