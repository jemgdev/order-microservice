import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan'
import userController from './controllers/user.controller'
import cors from 'cors'
const app = express()

app.set('PORT', process.env.PORT || 3003)

app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
  origin: '*'
}))

app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'User microservice v.1'
  })
})

app.use('/api/users', userController)

app.use((_req, res) => {
  res.status(404).json({
    message: 'Error 404, recurso no encontrado'
  }).end()
})

app.listen(app.get('PORT'), () => {
  console.log(`Server on port ${app.get('PORT')} 😄`)
})
