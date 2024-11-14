import express from 'express';
import { createCart, getCart, deletefromcart, updateCart } from '../controllers/cart.controller';

const router = express.Router();

router.post('/additemtocart', createCart);         // Create a category
router.get('/getcart', getCart);           // Read all categories
router.put('/updatecart/:id', updateCart);
router.delete('/deletefromcart/:id', deletefromcart);   // Delete a category

export default router;