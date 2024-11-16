import { Request, Response } from 'express';
import SubCategory from '../models/subcategory.model';

export const createSubCategory = async (req: Request, res: Response) => {
    try {
        const subcategory = new SubCategory(req.body);
        await subcategory.save();
        res.status(201).json(subcategory);
    } catch (error) {
        res.status(400).json({ message: 'Error creating subcategory', error });
    }
};


export const getSubCategories = async (req: Request, res: Response) => {
    try {
        console.log("hhh")
        const subcategories = await SubCategory.find();
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subcategories', error });
    }
};


export const getSubCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const subcategory = await SubCategory.findById(req.params.id);
        if (!subcategory) {
            res.status(404).json({ message: 'subcategory not found' });
        } else {
            res.status(200).json(subcategory);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subcategory', error });
    }
};


export const getSubCategorybycategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const subcategories = await SubCategory.find({ categoryID: id });
      res.status(200).json(subcategories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching subcategories', error });
    }
  };


export const updateSubCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const subcategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subcategory) {
            res.status(404).json({ message: 'subcategory not found' });
        } else {
            res.status(200).json(subcategory);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating subcategory', error });
    }
};


export const deleteSubCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
        if (!subcategory) {
            res.status(404).json({ message: 'subcategory not found' });
        } else {
            res.status(200).json({ message: 'subcategory deleted' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting subcategory', error });
    }
};