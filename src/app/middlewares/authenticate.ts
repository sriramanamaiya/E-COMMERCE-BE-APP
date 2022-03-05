import { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface Property extends Request {
    [key: string]: any
}

class auth {
    constructor() {}

    static authenticate(req: Property, res: Response) {
        console.log(req.headers)
        const auth = (req.headers as { token: string }).token
        const token = auth.split(' ')[1]

        let tokenData: JwtPayload
        try {
            tokenData = jwt.verify(token, 'e-commerce-user@#$') as JwtPayload
            req.tokenData = tokenData
        } catch (error) {
            res.json(error)
        }
    }
}

export default auth
