import express, { Application } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import animeRouter from '../routes/animes'
import userRouter from '../routes/users'
import authRouter from '../routes/auth'
import database from '../database/connection'

export default class Server {
  app: Application
  port: string
  paths

  constructor () {
    this.app = express()
    this.port = process.env.PORT ?? '8080'

    this.paths = {
      animes: '/api/animes/',
      users: '/api/users/',
      auth: '/api/auth/'
    }

    void this.connectDB()
    this.middlewares()
    this.routes()
  }

  async connectDB (): Promise<void> {
    try {
      await database.authenticate()
      console.log('Database online')
    } catch (err) {
      throw new Error('Error connecting to database')
    }
  }

  middlewares (): void {
    this.app.use(bodyParser.json())
    this.app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'] }))
  }

  routes (): void {
    this.app.use(this.paths.auth, authRouter)
    this.app.use(this.paths.animes, animeRouter)
    this.app.use(this.paths.users, userRouter)
  }

  listen (): void {
    this.app.listen(this.port, () => {
      console.log('App corriendo en puerto', this.port)
    })
  }
}
