import express from 'express';
import categoriesrouter from './category.routes';
import subcategoriesrouter from './subcategory.routes';
import cartrouter from './cart.routes';
import productrouter from './product.routes';

const router = express.Router();

router.use("/categories", categoriesrouter);
router.use("/subcategories", subcategoriesrouter);
router.use("/cart", cartrouter);
router.use("/product", productrouter);

export default router;