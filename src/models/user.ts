import { DataTypes } from 'sequelize'
import database from '../database/connection'

const User = database.define('User', {
  name: {
    type: DataTypes.STRING({ length: 255 }),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING({ length: 255 }),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING({ length: 60 }),
    allowNull: false
  },
  state: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING({ length: 15 }),
    allowNull: false,
    defaultValue: 'USER_ROLE'
  }
}, {
  timestamps: false,
  tableName: 'users'
})

export default User
