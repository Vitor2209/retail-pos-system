import { Request, Response } from 'express';
import * as productService from '../services/product.service';

export const create = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;

    const product = await productService.createProduct(name, price, stock);

    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const products = await productService.getProducts();
  res.json(products);
};

export const getById = async (req: Request, res: Response) => {
  const product = await productService.getProductById(req.params.id);
  res.json(product);
};

export const update = async (req: Request, res: Response) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  res.json(product);
};

export const remove = async (req: Request, res: Response) => {
  await productService.deleteProduct(req.params.id);
  res.json({ message: 'Product deleted' });
};