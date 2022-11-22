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
}