import { Router } from 'express'
import OrderUseCase from '../core/order/application/order.usecase'
import OrderPrismaRepository from '../core/order/infrastructure/prisma/order.prisma.repository'

const orderRouter = Router()
const orderUseCase = new OrderUseCase(new OrderPrismaRepository())

orderRouter.get('/:userId', async (request, response) => {
  const { userId } = request.params

  const orders = await orderUseCase.getListOfOrdersByUserId(userId)

  response.status(200).json({
    statusCode: 200,
    message: 'Get orders successfully',
    data: orders
  })
})


export default orderRouter