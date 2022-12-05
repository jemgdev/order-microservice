import OrderEntity from './order.entity'

export default interface OrderRepository {
  getOrdersByUserId(userId: string): Promise<OrderEntity[] | null>
  getOrders(): Promise<OrderEntity[] | null>
  getOrder(orderId: string): Promise<OrderEntity | null>
  updateOrderStatus(orderId: string, state: string): Promise<OrderEntity | null>
  stats(): Promise<{ productName: string, quantity: number }[]>
  stats1(): Promise<{ productName: string, price: number }[]>
}
