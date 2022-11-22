export default interface OrderEntity {
  orderId: string
  orderDate: Date
  state: string
  productOrders: {
    productOrderId: string
    productOrderName: string
    price: number
    quantity: number
  }[]
}