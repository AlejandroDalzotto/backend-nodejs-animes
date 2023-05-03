import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import { Model } from 'sequelize'

export interface CustomRequest extends Request {
  user?: Model<any, any> | null
}

export const validateJWT = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('x-token')
  if (token === null || token === undefined) {
    throw new Error('401: Unauthorized or missing token')
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY as string) as { uid: string }
    const user = await User.findOne({
      where: {
        id: uid,
        state: true
      }
    })

    if (user === null) {
      throw new Error('401: Unauthorized or missing token')
    }

    req.user = user
    next()
  } catch (e: any) {
    res.status(401).json({
      msg: e.message
    })
  }
}
