import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import bannerRoutes from './banner/bannerRoutes'

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

app.get('/', (req, res) => {
    res.send('Hello IVSU!')
})

app.listen(PORT, () => {
    console.log(`Сервер работает по порту ${PORT}`)
})