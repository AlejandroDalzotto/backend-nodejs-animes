import { NextFunction, Response } from 'express'
import { CustomRequest } from './validate-jwt'

export const isAdminRole = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  if (req.user === null || req.user === undefined) {
    return res.status(500).json({
      msg: '500: Internal server error'
    })
  }

  const { role, name } = req.user as any
  const admin = process.env.VERIFY_ADMIN as string

  if (role !== admin) {
    return res.status(401).json({
      msg: `401: ${name as string} isn't admin`
    })
  }
  next()
}
