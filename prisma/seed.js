import { PrismaClient } from "@prisma/client"
import { $fetch } from "ofetch"

const prisma = new PrismaClient()
const productsURL = "https://fakestoreapi.com/products" // Corrected endpoint
const products = await $fetch(productsURL)

const seedProducts = async () => {
  try {
    for (const product of products) {
      await prisma.product.create({
        data: {
          title: product.title,
          description: product.description,
          image: product.image,
          category: product.category,
          price: product.price,
          // Optionally set created_at and updated_at if needed
          // created_at: new Date(product.created_at),
          // updated_at: new Date(product.updated_at),
        },
      })
    }
  } catch (e) {
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
}

// Immediately Invoked Function Expression (IIFE) to run the seeding
(async () => {
  await seedProducts()
})()
