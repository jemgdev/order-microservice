export default interface UserEntity {
  userId?: string
  email: string
  name: string
  lastname: string
  dni: number
  dateOfBirth: Date
  address: string
  avatar: string
  userType?: string
}