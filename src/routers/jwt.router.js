import { Router } from 'express'
import * as JWTController from '../controllers/jwt.controller.js'

const router = Router()

router.post('/login',JWTController.login)
router.post('/loginCookie',JWTController.loginCookie)

export default router