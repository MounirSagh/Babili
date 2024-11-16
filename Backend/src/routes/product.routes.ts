import express from 'express';
import { createProduct, getProductsByCategory, getProducts, updateProduct, deleteProduct } from '../controllers/product.controller';

const router = express.Router();

router.post('/addproduct', createProduct);         
router.get('/getproducts', getProducts);           
router.get('/getproductsbycategory/:id', getProductsByCategory);    
router.put('/updateproduct/:id', updateProduct);     
router.delete('/deleteproduct/:id', deleteProduct);  

export default router;