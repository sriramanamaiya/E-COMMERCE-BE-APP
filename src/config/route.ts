import { Router } from 'express'
import UsersController from '../app/controllers/usersController'
import SuppliersController from '../app/controllers/suppliersController'
import auth from '../app/middlewares/authenticate'

const router = Router()

router.post('/users', UsersController.register)
router.post('/users/login', UsersController.login)
router.put('/users/:id', auth.authenticate, UsersController.update)
router.get('/users/:id', auth.authenticate, UsersController.show)

router.post('/suppliers', SuppliersController.register)
router.post('/suppliers/login', SuppliersController.login)
router.put('/suppliers/:id', auth.authenticate, SuppliersController.update)
router.get('/suppliers/:id', auth.authenticate, SuppliersController.show)

export default router
