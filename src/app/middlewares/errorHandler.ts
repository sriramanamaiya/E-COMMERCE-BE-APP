import { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
    res.json(err.message)
}
