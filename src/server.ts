import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import bannerRoutes from './banner/banner.controller'
import authRoutes from './auth/auth.controller'
import testsRoutes from './tests/test.controller'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || ''

app.use(cors())
app.use(express.json())

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Подключен к MongoDB')
    }).catch((err) => {
    console.error('Не удалось подключиться к MongoDB', err)
})

app.use('/api/banner', bannerRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/test', testsRoutes)

app.get('/', (req, res) => {
    res.send('Hello IVSU Tests!')
})

app.listen(PORT, () => {
    console.log(`Сервер работает по порту ${PORT}`)
})