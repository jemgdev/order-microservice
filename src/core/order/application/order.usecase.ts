import OrderRepository from '../domain/order.repository'

export default class UserUseCase {
  private readonly orderRepository: OrderRepository

  constructor (orderRepository: OrderRepository) {
    this.orderRepository = orderRepository
  }

  public async getListOfOrdersByUserId (userId: string) {
    const ordersFound = await this.orderRepository.getOrdersByUserId(userId)
    return ordersFound
  }

  public async getListOfOrders () {
    const ordersFound = await this.orderRepository.getOrders()
    return ordersFound
  }

  public async getOrderById (orderId: string) {
    const orderFound = await this.orderRepository.getOrder(orderId)
    return orderFound
  }

  public async updateOrder (orderId: string, state: string) {
    const orderUpdated = await this.orderRepository.updateOrderStatus(orderId, state)
    return orderUpdated
  }
}