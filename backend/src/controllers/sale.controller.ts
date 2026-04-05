import { Request, Response } from 'express';
import * as saleService from '../services/sale.service';

export const create = async (req: Request, res: Response) => {
  try {
    const { userId, items, discount } = req.body;

    const sale = await saleService.createSale(userId, items, discount);

    res.status(201).json(sale);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const sales = await saleService.getSales();
  res.json(sales);
};