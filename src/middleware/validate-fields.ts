import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'

const message = 'Incorrect or missing email or password'

export const checkFields = (fields: string[]): any => check(fields, message)

export const isEmailAndString = (): any => check('email', message).isEmail().isString()

export const isPasswordStringAndNotNull = (): any => check('password', message).isString().not().isEmpty()

export const validateFields = (req: Request, res: Response, next: NextFunction): any => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  next()
}
