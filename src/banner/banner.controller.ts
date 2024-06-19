import {Router} from 'express'
import Banner from './banner.model'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const banner = await Banner.findOne()
        if (!banner) {
            return res.status(404).json({message: 'Баннер не найден'})
        }
        res.json(banner)
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
        res.status(500).json({message: errorMessage})
    }
})

router.put('/', async (req, res) => {
    const {titles, features} = req.body
    try {
        let banner = await Banner.findOne()
        if (!banner) {
            banner = new Banner({titles, features})
        } else {
            banner.titles = titles
            banner.features = features
        }
        await banner.save()
        res.json(banner)
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка'
        res.status(500).json({message: errorMessage})
    }
})

export default router