import OrderEntity from './order.entity'

export default interface OrderRepository {
  getOrdersByUserId(userId: string): Promise<OrderEntity[] | null>
}
