import express from 'express';
import { placeOrder } from '../controllers/order.controller';

const router = express.Router();

router.post('/addorder', placeOrder);

export default router;