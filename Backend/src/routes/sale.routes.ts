import express from 'express';
import { createSale, getSales } from '../controllers/sale.controller';

const router = express.Router();

router.post('/addsale', createSale);
router.get('/getsales', getSales)

export default router;