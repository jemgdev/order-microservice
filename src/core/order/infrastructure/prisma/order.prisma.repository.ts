import OrderRepository from '../../domain/order.repository'
import prisma from '../../../../connections/prisma.connection'
import OrderEntity from '../../domain/order.entity'

export default class OrderPrismaRepository implements OrderRepository {
  async getOrdersByUserId(userId: string): Promise<OrderEntity[] | null> {
    return await prisma.order.findMany({
      where: {
        userId
      },
      select: {
        orderId: true,
        orderDate: true,
        state: true,
        productOrders: {
          select: {
            productOrderId: true,
            productOrderName: true,
            price: true
          }
        }
      },
      orderBy: {
        orderDate: 'desc'
      }
    })
  }
}