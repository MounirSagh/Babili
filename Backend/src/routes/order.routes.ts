import express from 'express';
import { placeOrder, getOrders } from '../controllers/order.controller';

const router = express.Router();

router.post('/addorder', placeOrder);
router.get('/getorsers', getOrders)

export default router;