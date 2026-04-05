import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SaleItemInput {
  productId: string;
  quantity: number;
}

export const createSale = async (
  userId: string,
  items: SaleItemInput[],
  discount: number = 0
) => {
  return prisma.$transaction(async (tx) => {
    let total = 0;

    const products = await tx.product.findMany({
      where: {
        id: {
          in: items.map(i => i.productId),
        },
      },
    });

    const saleItemsData = items.map(item => {
      const product = products.find(p => p.id === item.productId);

      if (!product) throw new Error('Product not found');

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      return {
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      };
    });

    const finalTotal = total - discount;

    const sale = await tx.sale.create({
      data: {
        userId,
        total,
        discount,
        finalTotal,
        items: {
          create: saleItemsData,
        },
      },
      include: {
        items: true,
      },
    });

    // Atualizar estoque
    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return sale;
  });
};

export const getSales = async () => {
  return prisma.sale.findMany({
    include: {
      items: true,
    },
  });
};