import express from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/category.controller';

const router = express.Router();

router.post('/addcategory', createCategory);         // Create a category
router.get('/getcategories', getCategories);           // Read all categories
router.get('/getcategory/:id', getCategoryById);     // Read a specific category
router.put('/updatecategory/:id', updateCategory);      // Update a category
router.delete('/deletecategory/:id', deleteCategory);   // Delete a category

export default router;