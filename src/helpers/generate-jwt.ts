import jwt from 'jsonwebtoken'

export const generateJWT = async (uid: any): Promise<any> => {
  return await new Promise((resolve, reject) => {
    const payload = { uid }
    const secret = process.env.SECRET_KEY as string
    jwt.sign(payload, secret, {
      expiresIn: '7d'
    }, (error, token) => {
      if (error !== null) reject(error.message)
      resolve(token)
    })
  })
}
