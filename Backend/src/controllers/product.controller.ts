// import { Request, Response } from 'express';
// import Category from '../models/category.model';
// import Product from '../models/product.model';
// import SubCategory from '../models/subcategory.model';

// export const createProduct = async (req: Request, res: Response) => {
//     try {
//         const product = new Product(req.body);
//         await product.save();
//         res.status(201).json(product);
//     } catch (error) {
//         res.status(400).json({ message: 'Error creating product', error });
//     }
// };

// // Get all categories
// export const getProducts = async (req: Request, res: Response) => {
//     try {
//         const product = await Product.find();
//         console.log(product)
//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching products', error });
//     }
// };

// // Get a single category by ID
// export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id } = req.params;  
//         console.log(id)
//         const products = await Product.find({ subcategoryID: id} );  
        
//         if (!products || products.length === 0) {
//             res.status(404).json({ message: 'No products found for this subcategory' });
//         } else {
//             res.status(200).json(products);
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching products by subcategory', error });
//     }
// };


// export const updateProduct = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const product = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!product) {
//             res.status(404).json({ message: 'product not found' });
//         } else {
//             res.status(200).json(product);
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating product', error });
//     }
// };

// // Delete a category by ID
// export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const product = await Product.findByIdAndDelete(req.params.id);
//         if (!product) {
//             res.status(404).json({ message: 'product not found' });
//         } else {
//             res.status(200).json({ message: 'product deleted' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting product', error });
//     }
// };

import { Request, Response } from "express";
import Product from "../models/product.model";
import SubCategory from "../models/subcategory.model";

// Create a Product
export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { subcategoryID, REF, attributes, stock, price, isActive } = req.body;

    if (!subcategoryID || !REF || !attributes || stock === undefined || price === undefined) {
      return res.status(400).json({ message: "Missing required product fields" });
    }

    const subcategory = await SubCategory.findById(subcategoryID);
    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const product = new Product({
      subcategoryID,
      REF,
      attributes,
      stock,
      price,
      isActive: isActive !== undefined ? isActive : true,
    });
    await product.save();

    return res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(400).json({ message: "Error creating product", error });
  }
};

// Get all Products
export const getProducts = async (req: Request, res: Response): Promise<Response> => {
    try {
      const products = await Product.find().populate("subcategoryID", "name");
      console.log("Products sent to frontend:", products); // Debug log
      return res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ message: "Error fetching products", error });
    }
  };
  

// Get Products by Subcategory
export const getProductsByCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const products = await Product.find({ subcategoryID: id }).populate("subcategoryID", "name");

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this subcategory" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by subcategory:", error);
    return res.status(500).json({ message: "Error fetching products by subcategory", error });
  }
};

// Update a Product
export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a Product
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Error deleting product", error });
  }
};

