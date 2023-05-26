import * as JWTService from '../services/jwt.service.js'
import { generateToken } from '../utils/jwt.utils.js'

export async function login(req, res) {
  try {
    const { email, password } = req.body
    const user = await JWTService.login(email, password)
    delete user.password
    const token = generateToken(user)
    res.json({
      status: 'SUCCESS',
      token
    })
  } catch (error) {
    res.status(403).send(error.message)
  }
}
export async function loginCookie(req, res) {
  try {
    const { email, password } = req.body
    const user = await JWTService.login(email, password)
    delete user.password
    const token = generateToken(user)
    res.cookie('coderhouse', token, { maxAge: 300000, httpOnly:true }).send('logged in!')
  } catch (error) {
    res.status(403).send(error.message)
  }
}