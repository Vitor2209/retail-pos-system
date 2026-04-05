import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import saleRoutes from './routes/sale.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/sales', saleRoutes);

app.get('/', (req, res) => {
  res.send('API running...');
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

export default app;