import express from 'express';
import { createProduct, getProductsByCategory, getProducts, updateProduct, deleteProduct } from '../controllers/product.controller';

const router = express.Router();

router.post('/addproduct', createProduct);         // Create a category
router.get('/getproducts/:id', getProducts);           // Read all categories
router.get('/getproductsbycategory/:id', getProductsByCategory);     // Read a specific category
router.put('/updateproduct/:id', updateProduct);      // Update a category
router.delete('/deleteproduct/:id', deleteProduct);   // Delete a category

export default router;