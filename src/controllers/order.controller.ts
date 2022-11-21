import { Router } from 'express'
import BcryptRepository from '../core/encrypt/infrastructure/bcrypt.repository'
import UserUseCase from '../core/user/application/user.usecase'
import UserPrismaRepository from '../core/user/infrastructure/prisma/user.prisma.repository'

const userRouter = Router()
const userUseCase = new UserUseCase(new UserPrismaRepository(), new BcryptRepository())

userRouter.get('/:userId', async (request, response) => {
  const { userId } = request.params

  const user = await userUseCase.getUserById(userId)

  response.status(200).json({
    statusCode: 200,
    message: 'Get user successfully',
    data: user
  })
})

userRouter.put('/password', async (request, response) => {
  const { email, oldPassword, newPassword } = request.body

  const result = await userUseCase.changePassword(email, oldPassword, newPassword)

  response.status(201).json({
    statusCode: 201,
    message: result,
    data: null
  })
})

userRouter.put('/:userId', async (request, response) => {
  const userId = request.params.userId
  const body = request.body

  const result = await userUseCase.updateUserInformation({ userId, ...body })

  response.status(201).json({
    statusCode: 201,
    message: 'Udate user success',
    data: result
  })
})

export default userRouter