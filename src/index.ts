import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan'
import orderController from './controllers/order.controller'
import cors from 'cors'
const app = express()

app.set('PORT', process.env.PORT || 3005)

app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
  origin: '*'
}))

app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Order microservice v.1'
  })
})

app.use('/api/v1/orders', orderController)

app.use((_req, res) => {
  res.status(404).json({
    message: 'Error 404, recurso no encontrado'
  }).end()
})

app.listen(app.get('PORT'), () => {
  console.log(`Server on port ${app.get('PORT')} 😄`)
})
