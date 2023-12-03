import { PrismaClient } from '@prisma/client'
import { products } from './products.js'

const prisma = new PrismaClient()

const main = async () => {
  const adminRole = await prisma.role.upsert({
    where: {
      name: 'ADMIN'
    },
    update: {},
    create: {
      name: 'ADMIN',
      description:
        'Este es el rol principal que tiene control total sobre el sistema. Puede gestionar todos los aspectos del sitio, incluyendo la adición y eliminación de productos, gestión de pedidos, manejo de descuentos y promociones, y supervisión de las ventas.'
    }
  })

  const documentTypeCC = await prisma.documentType.upsert({
    where: { name: 'Cedula de ciudadania' },
    update: {},
    create: {
      name: 'Cedula de ciudadania'
    }
  })

  await prisma.category.createMany({
    data: [
      { name: 'Perros', description: 'Cannis Lupus' },
      { name: 'Alimento', description: 'Alimento para cualquier animal.c' }
    ],
    skipDuplicates: true
  })

  await prisma.brand.createMany({
    data: [
      { name: 'Monchilu', image: 'https://monchilu.com/images/logo.png' },
      { name: 'Benito', image: 'https://benitomoda.mx/cdn/shop/files/pp_grande.jpg' },
      { name: 'Chunky', image: 'https://www.agrocampo.com.co/media/catalog/product/cache/d51e0dc10c379a6229d70d752fc46d83/1/1/111100173-v1-min.jpg' }
    ],
    skipDuplicates: true
  })

  await prisma.user.upsert({
    where: { email: 'garcianaranjodairo@gmail.com' },
    update: {},
    create: {
      name: 'Dairo Garcia Naranjo',
      email: 'garcianaranjodairo@gmail.com',
      password: '12345',
      documentId: documentTypeCC.id,
      roleId: adminRole.id,
      phone: '3027485520',
      nit: '1117531976',
      image:
        'https://th.bing.com/th/id/OIP.Y6Tw5wohNFH0w1_QUC_KlgHaEK?pid=ImgDet&rs=1'
    }
  })

  await prisma.product.createMany({
    data: products,
    skipDuplicates: true
  })
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
