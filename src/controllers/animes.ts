import { Request, Response } from 'express'
import Anime from '../models/anime'

export const getAllAnimes = async (_req: Request, res: Response): Promise<void> => {
  try {
    const animes = await Anime.findAll({
      where: {
        state: true
      }
    })
    res.status(200).json(animes)
  } catch (e) {
    console.error(e)
    res.status(500).json({
      msg: '500: Internal server error'
    })
  }
}

export const getAnimeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier } = req.params

    const anime = await Anime.findByPk(identifier)

    if (anime == null) {
      res.status(404).json({
        msg: '404: resource not found'
      })
      return
    }

    res.status(200).json(anime)
  } catch (e) {
    console.error(e)
    res.status(400).json({
      msg: '400: Bad request'
    })
  }
}

export const saveAnime = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, episodes } = req.body

    const existByName = await Anime.findOne({
      where: {
        name,
        state: true
      }
    })

    if (existByName !== null) {
      throw new Error(`${name as string} is already registered in database`)
    }

    const anime = await Anime.create({ name, episodes })
    res.status(201).json(anime)
  } catch (e: any) {
    res.status(500).json({
      msg: e.message
    })
  }
}

export const updateAnime = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier } = req.params
    const { id, state, ...rest } = req.body

    const existById = await Anime.findByPk(identifier)

    if (existById === null) {
      throw new Error(`Don't exist an anime with Id: ${identifier}`)
    }

    const [anime] = await Anime.update(rest, {
      where: {
        id: identifier
      }
    })

    res.status(200).json(anime)
  } catch (e: any) {
    console.error(e)
    res.status(404).json({
      msg: e.message
    })
  }
}

export const deleteAnime = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier } = req.params

    const existById = await Anime.findByPk(identifier)

    if (existById === null) {
      throw new Error(`There is no item with ID: ${identifier}`)
    }

    const isAlreadyDeleted = await Anime.findOne({
      where: {
        id: identifier,
        state: false
      }
    })

    if (isAlreadyDeleted !== null) {
      throw new Error(`That item is already deleted in database: ${identifier}`)
    }

    const [anime] = await Anime.update({ state: false }, {
      where: {
        id: identifier
      }
    })

    res.json(anime)
  } catch (e: any) {
    console.error(e)
    res.status(400).json({
      msg: e.message
    })
  }
}
