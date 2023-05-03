/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { saveAnime, deleteAnime, getAllAnimes, getAnimeById, updateAnime } from '../controllers/animes'

const router = Router()

router.get('/', getAllAnimes)

router.get('/:identifier', getAnimeById)

router.post('/', saveAnime)

router.put('/:identifier', updateAnime)

router.delete('/:identifier', deleteAnime)

export default router
