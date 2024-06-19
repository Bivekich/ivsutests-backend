import {Router} from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "./user.model";

const router = Router()

router.post('/register', async (req, res) => {
    const {email, password} = req.body
    try {
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({message: 'Пользователь уже существует'})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({email, password: hashedPassword})
        await newUser.save()
        res.status(201).json({message: 'Пользователь успешно создан'})
    } catch (err) {
        res.status(500).json({message: 'Ошибка сервера'})
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: 'Неверные учетные данные'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message: 'Неверные учетные данные'})
        }
        const token = jwt.sign({userId: user._id}, '123', {
            expiresIn: '1h'
        })
        res.status(200).json({token})
    } catch (err) {
        res.status(500).json({message: 'Ошибка сервера'})
    }
})

router.get('/profile', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Не авторизован'})
        }
        const decodedToken: any = jwt.verify(token, '123')
        const user = await User.findById(decodedToken.userId).select('-password')
        if (!user) {
            return res.status(401).json({message: 'Пользователь не найден'})
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({message: 'Ошибка сервера'})
    }
})

export default router