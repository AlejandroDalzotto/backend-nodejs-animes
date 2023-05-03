
export const getUserPublicData = (user: any): any => {
  const { id, name, email } = user
  return ({ id, name, email })
}

export const getUsersPublicData = (users: any[]): any[] => {
  const usersWithoutSensitiveInfo = users.map(({ id, name, email }) => ({ id, name, email }))
  return usersWithoutSensitiveInfo
}
