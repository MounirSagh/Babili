// src/controllers/categoryController.ts
import { Request, Response } from 'express';
import Category from '../models/category.model';
import Product from '../models/product.model';
import SubCategory from '../models/subcategory.model';

// Create a new category
export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Error creating category', error });
    }
};

// Get all categories
export const getProducts = async (req: Request, res: Response) => {
    try {
        const product = await Product.find();
        console.log(product)
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

// Get a single category by ID
export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;  // assuming categoryID is passed as a route parameter
        console.log(id)
        const products = await Product.find({ subcategoryID: id} );  // filter products by categoryID
        
        if (!products || products.length === 0) {
            res.status(404).json({ message: 'No products found for this category' });
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products by category', error });
    }
};

// Update a category by ID
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            res.status(404).json({ message: 'Category not found' });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
};

// Delete a category by ID
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Category not found' });
        } else {
            res.status(200).json({ message: 'Category deleted' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
};