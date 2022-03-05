import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import SUPPLIER from '../models/Supplier'
import { Login } from '../models/interface'

class SuppliersController {
    constructor() {}

    static async register(req: Request, res: Response) {
        const body = req.body
        const supplier = new SUPPLIER(body)

        try {
            const newSupplier = await supplier.save()
            res.json(newSupplier)
        } catch (error) {
            res.json(error)
        }
    }

    static async login(req: Request, res: Response) {
        const supplierLoginData: Login = req.body

        try {
            const supplier = await SUPPLIER.findOne({ email: supplierLoginData.email })

            if (!supplier) {
                res.json({ errors: 'Invalid ID or Password' })
            } else {
                bcryptjs
                    .compare(supplierLoginData.password, supplier.password)
                    .then((match) => {
                        if (match) {
                            const tokenData = { id: supplier.id, isAdmin: supplier.isAdmin }
                            const token = jwt.sign(tokenData, 'e-commerce-user@#$', {
                                expiresIn: '1d'
                            })
                            res.json({
                                token: `Bearer ${token}`
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
        const id = req.params.id
        const body = req.body

        try {
            const updatedSupplier = await SUPPLIER.findByIdAndUpdate(id, body, {
                new: true,
                runValidators: true
            }).select('-password')
            res.json(updatedSupplier)
        } catch (error) {
            res.json(error)
        }
    }

    static async show(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id

        try {
            const supplier = await SUPPLIER.findById(id).select('-password')
            res.json(supplier)
        } catch (error) {
            res.json(error)
        }
    }
}

export default SuppliersController
