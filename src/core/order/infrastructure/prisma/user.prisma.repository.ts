import UserEntity from '../../domain/user.entity'
import UserRepository from '../../domain/user.repository'
import prisma from '../../../../connections/prisma.connection'
import { User } from '@prisma/client'

export default class UserPrismaRepository implements UserRepository {
  async getUserById(userId: string): Promise<UserEntity | null> {
    return await prisma.user.findUnique({
      where: { userId },
      select: {
        email: true,
        name: true,
        lastname: true,
        dni: true,
        dateOfBirth: true,
        address: true,
        avatar: true,
      }
    })
  }

  async updatePersonalInformation({ userId, name, lastname, dateOfBirth, dni, address, avatar }: { userId: string, name: string; lastname: string; dateOfBirth: Date; dni: number; address: string; avatar: string; }): Promise<{
    name: string;
    lastname: string;
    dni: number;
    dateOfBirth: Date;
    address: string;
    avatar: string;
}> {
    const userUpdated = await prisma.user.update({
      data: {
        name,
        lastname,
        dateOfBirth,
        dni,
        address,
        avatar
      },
      where: {
        userId
      },
      select: {
        address: true,
        avatar: true,
        dni: true,
        name: true,
        lastname: true,
        dateOfBirth: true
      }
    })

    return userUpdated
  }

  async updatePassword({ userId, newPassword }: { userId: string; newPassword: string; }): Promise<string> {
    await prisma.user.update({
      data: {
        password: newPassword
      },
      where: {
        userId
      }
    })

    return 'The password was updated successfully'
  }
}