import { Router } from 'express'
import OrderUseCase from '../core/order/application/order.usecase'
import OrderPrismaRepository from '../core/order/infrastructure/prisma/order.prisma.repository'

const orderRouter = Router()
const orderUseCase = new OrderUseCase(new OrderPrismaRepository())

orderRouter.get('/', async (request, response) => {
  const orders = await orderUseCase.getListOfOrders()

  response.status(200).json({
    statusCode: 200,
    message: 'Get orders successfully',
    data: orders
  })
})

orderRouter.get('/:userId', async (request, response) => {
  const { userId } = request.params

  const orders = await orderUseCase.getListOfOrdersByUserId(userId)

  response.status(200).json({
    statusCode: 200,
    message: 'Get orders successfully',
    data: orders
  })
})

orderRouter.get('/order/:orderId', async (request, response) => {
  const { orderId } = request.params

  const order = await orderUseCase.getOrderById(orderId)

  response.status(200).json({
    statusCode: 200,
    message: 'Get order successfully',
    data: order
  })
})

orderRouter.put('/:orderId', async (request, response) => {
  const { orderId } = request.params
  const { state } = request.body

  const orderUpdated = await orderUseCase.updateOrder(orderId, state)

  response.status(200).json({
    statusCode: 200,
    message: 'Status of order updated successfully',
    data: orderUpdated
  })
})

orderRouter.get('/stats/stast', async (request, response) => {
  const stats = await orderUseCase.getStats()
  response.status(200).json({
    statusCode: 200,
    message: 'Stats of order get successfully',
    data: stats
  })
})


export default orderRouter