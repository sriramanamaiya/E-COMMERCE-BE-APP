import { Router } from 'express'
import UsersController from '../app/controllers/usersController'
import auth from '../app/middlewares/authenticate'

const router = Router()

router.post('/users', UsersController.register)
router.post('/users/login', UsersController.login)
router.put('/users/:id', auth.authenticate, UsersController.update)
router.get('/users/:id', auth.authenticate, UsersController.show)

export default router
