import bcryptjs from 'bcryptjs'

const encryptPassword = (password: string): string => {
  const salt = bcryptjs.genSaltSync(15)
  const passwordEncrypted = bcryptjs.hashSync(password, salt)
  return passwordEncrypted
}

export default encryptPassword
