import express from 'express';
import { createSubCategory, getSubCategories, getSubCategoryById, getSubCategorybycategory, updateSubCategory, deleteSubCategory } from '../controllers/subcategory.controller';

const router = express.Router();

router.post('/addsubcategory', createSubCategory);         // Create a category
router.get('/getsubcategories', getSubCategories);           // Read all categories
router.get('/getsubcategory/:id', getSubCategoryById);     // Read a specific category
router.get('/getsubcategorybycategory/:id', getSubCategorybycategory); 
router.put('/updatesubcategory/:id', updateSubCategory);      // Update a category
router.delete('/deletesubcategories/:id', deleteSubCategory);   // Delete a category

export default router;