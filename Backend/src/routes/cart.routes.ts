import express from 'express';
import { createCart, getCart, deletefromcart, updateCart } from '../controllers/cart.controller';

const router = express.Router();

router.post('/additemtocart', createCart);        
router.get('/getcart', getCart);          
router.put('/updatecart/:id', updateCart);
router.delete('/deletefromcart/:id', deletefromcart);   

export default router;