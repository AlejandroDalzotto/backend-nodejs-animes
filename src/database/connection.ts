import { Sequelize } from 'sequelize'

const database = new Sequelize('testnode', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: true
})

export default database
