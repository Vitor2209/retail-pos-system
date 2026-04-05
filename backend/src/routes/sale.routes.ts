import { Router } from 'express';
import * as saleController from '../controllers/sale.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, saleController.create);
router.get('/', authMiddleware, saleController.getAll);

export default router;