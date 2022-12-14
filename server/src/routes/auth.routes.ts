import { Request, Response } from 'express'
import { Router } from 'express'
import { check, validationResult } from 'express-validator'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import User from '../models/User.js'
import config from "config";

//@ts-ignore
const authRouter = new Router()

authRouter.post('/registration', [
  check('email', 'Incorrect email').isEmail(),
  check('password', 'incorrect password').isLength({min: 3, max: 12})
  ],
  async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({message: 'Incorrect response', errors})
    }
    const { email, password } = req.body
    const candidate: any = await User.findOne({ email })

    if (candidate) {
      return res.status(400).json(`User with ${email} already exist`)
    }

    //@ts-ignore
    const hashPassword = await bcrypt.hash(password, 8)
    const newUser = new User({ email, password: hashPassword })
    await newUser.save()
    return res.json({ message: 'User created' })
  } catch (e) {
    console.error(e)
  }
})

authRouter.post('/login', async (req: Request, res:Response) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (!user) {
      return res.status(404).json({message: 'User not found'})
    }
    const isPassValid = bcrypt.compareSync(password, user.password)
    if (!isPassValid) {
      return res.status(400).json({message: 'Invalid password'})
    }
    const token = jsonwebtoken.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar
      }
    })
  } catch (e) {
    console.error(e)
  }
})

export default authRouter
