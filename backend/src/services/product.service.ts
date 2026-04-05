import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProduct = async (name: string, price: number, stock: number) => {
  return prisma.product.create({
    data: {
      name,
      price,
      stock,
    },
  });
};

export const getProducts = async () => {
  return prisma.product.findMany();
};

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

export const updateProduct = async (id: string, data: any) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};