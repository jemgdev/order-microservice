import UserEntity from './user.entity'
export default class User implements UserEntity {
  email: string
  name: string
  lastname: string
  dni: number
  dateOfBirth: Date
  address: string
  avatar: string
  userType?: string
  
  constructor({ email, name, lastname, dni, dateOfBirth, address, avatar }: { email: string, name: string, lastname: string, dni: number, dateOfBirth: Date, address: string, avatar: string }) {
    this.email = email
    this.name = name
    this.lastname = lastname
    this.dni = dni
    this.dateOfBirth = dateOfBirth
    this.address = address
    this.avatar = avatar
  }
}