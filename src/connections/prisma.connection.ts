import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.$connect()
  .then(() => console.log('MySQL was connected successfully'))
  .catch(error => console.log('Error from prisma conecction', error))

export default prisma
