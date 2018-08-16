import express, {Request, Response} from "express"

const router = express.Router()

// define the home page route
router.post('/login', (req: Request, res: Response) => {
    res.send('login')
})

module.exports = router