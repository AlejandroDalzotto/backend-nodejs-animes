/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { saveUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/users'
import { validateJWT } from '../middleware/validate-jwt'
import { isAdminRole } from '../middleware/validate-roles'

const router = Router()

router.get('/', getAllUsers)

router.get('/:identifier', getUserById)

router.post('/', saveUser)

router.put('/:identifier', updateUser)

router.delete('/:identifier', [validateJWT, isAdminRole], deleteUser)

export default router
