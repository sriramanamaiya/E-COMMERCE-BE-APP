import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import USER from '../models/User'
import { Login } from '../models/interface'

class UsersController {
    constructor() {}

    static async register(req: Request, res: Response) {
        const newUser = new USER(req.body)

        try {
            const savedUser = await newUser.save()
            const newUserCreated = await USER.findById(savedUser._id).select('-password')
            res.json(newUserCreated)
        } catch (error) {
            res.json(error)
        }
    }

    static async login(req: Request, res: Response) {
        const userLoginData: Login = req.body

        try {
            const user = await USER.findOne({ email: userLoginData.email })

            if (!user) {
                res.json({ errors: 'Invalid ID or Password' })
            } else {
                bcryptjs
                    .compare(userLoginData.password, user.password)
                    .then((match) => {
                        if (match) {
                            const tokenData = { id: user.id, isAdmin: user.isAdmin }
                            const accessToken = jwt.sign(tokenData, 'e-commerce-user@#$', {
                                expiresIn: '1d'
                            })
                            res.json({
                                token: `Bearer ${accessToken}`
                            })
                        } else {
                            res.json({ errors: 'Invalid ID or Password' })
                        }
                    })
                    .catch((error) => {
                        res.json(error)
                    })
            }
        } catch (error) {
            res.json(error)
        }
    }

    static async update(req: Request<{ id: string }>, res: Response) {
        const body = req.body
        const id = req.params.id

        try {
            const updatedUser = await USER.findByIdAndUpdate(id, body, {
                new: true,
                runValidators: true
            }).select('-password')
            res.json(updatedUser)
        } catch (error) {
            res.json(error)
        }
    }

    static async show(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id

        try {
            const user = await USER.findById(id).select('-password')
            res.json(user)
        } catch (error) {
            res.json(error)
        }
    }
}

export default UsersController
