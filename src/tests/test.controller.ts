import {Router, Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import Test from './test.model'

declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
    }
}

const router = Router()

const authMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Не авторизован'})
        }
        try {
            const decodedToken: any = jwt.verify(token, '123')
            req.user = decodedToken
            if (!roles.includes(decodedToken.role)) {
                console.log(decodedToken.role)
                return res.status(403).json({message: 'Нет доступа'})
            }
            next()
        } catch (err) {
            return res.status(401).json({message: 'Не авторизован'})
        }
    }
}

router.post('/teacher/tests', authMiddleware(['teacher', 'admin']), async (req, res) => {
    try {
        const {title, questions} = req.body
        const newTest = new Test({title, questions, creatorId: req.user.userId})
        await newTest.save()
        res.status(201).json(newTest)
    } catch (err) {
        res.status(500).json({message: 'Ошибка сервера'})
    }
})

export default router

