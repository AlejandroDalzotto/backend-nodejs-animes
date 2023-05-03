/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { login } from '../controllers/auth'
import { checkFields, isEmailAndString, isPasswordStringAndNotNull, validateFields } from '../middleware/validate-fields'

const router = Router()

router.post('/login', [checkFields(['email', 'password']), isEmailAndString(), isPasswordStringAndNotNull(), validateFields], login)

export default router
