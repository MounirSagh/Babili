import express from 'express';
import { createSubCategory, getSubCategories, getSubCategoryById, getSubCategorybycategory, updateSubCategory, deleteSubCategory } from '../controllers/subcategory.controller';

const router = express.Router();

router.post('/addsubcategory', createSubCategory);        
router.get('/getsubcategories', getSubCategories);           
router.get('/getsubcategory/:id', getSubCategoryById);    
router.get('/getsubcategorybycategory/:id', getSubCategorybycategory); 
router.put('/updatesubcategory/:id', updateSubCategory);     
router.delete('/deletesubcategories/:id', deleteSubCategory);  

export default router;