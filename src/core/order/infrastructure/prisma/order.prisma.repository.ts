import OrderRepository from '../../domain/order.repository'
import prisma from '../../../../connections/prisma.connection'
import OrderEntity from '../../domain/order.entity'
import axios from 'axios'

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
            price: true,
            quantity: true
          }
        }
      },
      orderBy: {
        orderDate: 'desc'
      }
    })
  }

  async stats(): Promise<{ productName: string, quantity: number }[]> {
    const stast = await prisma.productOrder.groupBy({
      by: ['productOrderName'],
      _sum: {
        quantity: true
      },
      orderBy: {
        productOrderName: 'desc'
      },
      take: 5
    })

    return stast.map(ca => {
      return { productName: ca.productOrderName, quantity: ca._sum.quantity }
    })
  }

  async stats1(): Promise<{ productName: string, price: number }[]> {
    const stast = await prisma.productOrder.groupBy({
      by: ['productOrderName'],
      _sum: {
        price: true
      },
      orderBy: {
        productOrderName: 'desc'
      },
      take: 5
    })

    return stast.map(ca => {
      return { productName: ca.productOrderName, price: ca._sum.price }
    })
  }

  async getOrders(): Promise<OrderEntity[] | null> {
    return await prisma.order.findMany({
      select: {
        orderId: true,
        orderDate: true,
        state: true,
        productOrders: {
          select: {
            productOrderId: true,
            productOrderName: true,
            price: true,
            quantity: true
          }
        }
      },
      orderBy: {
        orderDate: 'desc'
      }
    })
  }

  async getOrder(orderId: string): Promise<OrderEntity> {
    return await prisma.order.findUnique({
      where: {
        orderId
      },
      select: {
        orderId: true,
        orderDate: true,
        state: true,
        productOrders: {
          select: {
            productOrderId: true,
            productOrderName: true,
            price: true,
            quantity: true
          }
        }
      }
    })
  }

  async updateOrderStatus (orderId: string, state: string): Promise<OrderEntity> {
    return await prisma.order.update({
      where: {
        orderId
      },
      data: {
        state
      },
      select: {
        orderId: true,
        orderDate: true,
        state: true,
        productOrders: {
          select: {
            productOrderId: true,
            productOrderName: true,
            price: true,
            quantity: true
          }
        }
      }
    })
  }
}