import { DataTypes } from 'sequelize'
import database from '../database/connection'

const Anime = database.define('Anime', {
  name: {
    type: DataTypes.STRING({ length: 255 }),
    allowNull: false,
    unique: true
  },
  episodes: {
    type: DataTypes.INTEGER({ length: 255 })
  },
  state: {
    type: DataTypes.TINYINT,
    defaultValue: 1
  }
}, {
  timestamps: false,
  tableName: 'animes'
})

export default Anime
