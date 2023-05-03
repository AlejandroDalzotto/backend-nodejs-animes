import { DataTypes } from 'sequelize'
import database from '../database/connection'

const Role = database.define('Role', {
  role: {
    type: DataTypes.STRING({ length: 15 }),
    allowNull: false,
    primaryKey: true,
    defaultValue: 'USER_ROLE'
  }
}, {
  timestamps: false,
  tableName: 'roles'
})

export default Role
