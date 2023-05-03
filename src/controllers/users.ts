import { Request, Response } from 'express'
import User from '../models/user'
import encryptPassword from '../helpers/encrypt-password'
import { getUserPublicData, getUsersPublicData } from '../helpers/user-without-password'
import Role from '../models/role'
import { CustomRequest } from '../middleware/validate-jwt'

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll({
      where: {
        state: true
      }
    })

    const usersWithoutSensitiveInfo = getUsersPublicData(users)
    res.status(200).json(usersWithoutSensitiveInfo)
  } catch (e) {
    res.status(500).json({
      msg: '500: Internal server error'
    })
  }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier } = req.params

    const user = await User.findByPk(identifier)

    if (user == null) {
      res.status(404).json({
        msg: '404: resource not found'
      })
      return
    }
    const userWithoutSensitiveInfo = getUserPublicData(user)
    res.status(200).json(userWithoutSensitiveInfo)
  } catch (e: any) {
    res.status(400).json({
      msg: e.message
    })
  }
}

export const saveUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role = 'USER_ROLE' } = req.body
    const existByEmail = await User.findOne({
      where: {
        email,
        state: true
      }
    })

    if (existByEmail !== null) {
      throw new Error(`${email as string} is already registered in database`)
    }

    const isValidRole = await Role.findOne({
      where: {
        role
      }
    })

    if (isValidRole === null) {
      throw new Error('Some properties are invalid')
    }

    const passwordEncrypted = encryptPassword(password)
    const user = await User.create({ name, email, password: passwordEncrypted, role })

    const userWithoutSensitiveInfo = getUserPublicData(user)
    res.status(201).json(userWithoutSensitiveInfo)
  } catch (e: any) {
    res.status(400).json({
      msg: e.message
    })
  }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier } = req.params
    const { id, state, ...rest } = req.body

    const existById = await User.findByPk(identifier)

    if (existById === null) {
      throw new Error(`Don't exist an user with Id: ${identifier}`)
    }

    const [user] = await User.update(rest, {
      where: {
        id: identifier
      }
    })

    res.status(200).json(user)
  } catch (e: any) {
    res.status(404).json({
      msg: e.message
    })
  }
}

export const deleteUser = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { identifier } = req.params

    // Verifica si el usuario a eliminar existe en la base de datos.
    const existById = await User.findByPk(identifier)
    if (existById === null) {
      throw new Error(`There is no item with ID: ${identifier}`)
    }

    // Verifica si el usuario ya está desabilitado.
    const isAlreadyDeleted = await User.findOne({
      where: {
        id: identifier,
        state: false
      }
    })
    if (isAlreadyDeleted !== null) {
      throw new Error(`That item is already deleted in database: ${identifier}`)
    }

    // Actualiza el estado del usuario.
    const [user] = await User.update({ state: false }, {
      where: {
        id: identifier
      }
    })

    res.json(user)
  } catch (e: any) {
    res.status(400).json({
      msg: e.message
    })
  }
}
