import express from 'express';
import {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  getSubCategoryByCategory,
  updateSubCategory,
  deleteSubCategory,
} from '../controllers/subcategory.controller';
import { uploadSubcategoryImage } from '../utils/multer'; // Multer config for Cloudinary

const router = express.Router();
// Middleware wrapper for async functions
const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);
const uploadMiddleware = uploadSubcategoryImage.fields([
  { name: 'image', maxCount: 1 }, // Primary image
  { name: 'tableImage', maxCount: 1 }, // Table image
]);

router.post('/addsubcategory', uploadMiddleware, createSubCategory);
router.get('/getsubcategories', getSubCategories);
router.get('/getsubcategory/:id', asyncHandler(getSubCategoryById));
router.get('/getsubcategorybycategory/:id', asyncHandler(getSubCategoryByCategory));
router.put('/updatesubcategory/:id', uploadMiddleware, asyncHandler(updateSubCategory));
router.delete('/deletesubcategories/:id', asyncHandler(deleteSubCategory));

export default router;
