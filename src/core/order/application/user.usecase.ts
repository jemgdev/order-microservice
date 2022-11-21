import axios from 'axios'
import UserRepository from '../domain/user.repository'
import EncryptRepository from '../../encrypt/domain/encrypt.repository'

export default class UserUseCase {
  private readonly userRepository: UserRepository
  private readonly encryptRepository: EncryptRepository

  constructor (userRepository: UserRepository, encryptRepository: EncryptRepository) {
    this.userRepository = userRepository
    this.encryptRepository = encryptRepository
  }

  public async getUserById (userId: string) {
    const userFound = await this.userRepository.getUserById(userId)
    return userFound
  }

  public async updateUserInformation ({ userId, name, lastname, dateOfBirth, dni, address, avatar }: { userId: string, name?: string, lastname?: string, dateOfBirth?: Date, dni?: number, address?: string, avatar?: string }) {
    const userFound = await this.userRepository.getUserById(userId)

    console.log({ userId, name, lastname, dateOfBirth, dni, address, avatar })
    const userData = {
      userId,
      name: typeof name === 'undefined' ? userFound.name : name,
      lastname: typeof lastname === 'undefined' ? userFound.lastname: lastname,
      dateOfBirth: typeof dateOfBirth === 'undefined' ? userFound.dateOfBirth: new Date(dateOfBirth),
      dni: typeof dni === 'undefined' ? userFound.dni: dni,
      address: typeof address === 'undefined' ? userFound.address: address,
      avatar: typeof avatar === 'undefined' ? userFound.avatar: avatar
    }

    const result = await this.userRepository.updatePersonalInformation(userData)
    return result
  }

  public async changePassword (email: string, oldPassword: string, newPassword: string) {
    if (oldPassword === newPassword) {
      return 'Las contraseñas son iguales'
    }
    
    try {
      const response1 = await axios.post('https://autentication-microservice-production.up.railway.app/api/v1/auth/login', { 
        email, 
        password: oldPassword 
      })
      
      const userId = response1.data.data.userId
      const newPasswordEncrypted = await this.encryptRepository.generateEncryptPassword(newPassword)
      const result = await this.userRepository.updatePassword({ userId, newPassword: newPasswordEncrypted })

      return result
    } catch (error: any) {
      return error.response.data.message
    }
  }
}