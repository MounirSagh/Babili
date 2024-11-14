// src/controllers/categoryController.ts
import { Request, Response } from 'express';
import SubCategory from '../models/subcategory.model';
import Cart from '../models/cart.model';

// Create a new category
export const createCart = async (req: Request, res: Response) => {
    try {
        console.log('hhhhh')
        const cart = new Cart({ ...req.body, quantity: 1 });
        await cart.save();
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ message: 'Error creating cart', error });
    }
};

// Get all categories
export const getCart = async (req: Request, res: Response) => {
    try {
        console.log("hhh")
        const cart = await Cart.find();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
};


// Delete a category by ID
export const deletefromcart = async (req: Request, res: Response): Promise<void> => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        if (!cart) {
            res.status(404).json({ message: 'Item not found' });
        } else {
            res.status(200).json({ message: 'Item deleted' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting from cart', error });
    }
};

export const updateCart = async (req: Request, res: Response) => {
    try {
      const { quantity } = req.body;
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        { quantity },
        { new: true }
      );
      if (!updatedCart) {
        res.status(404).json({ message: 'Item not found' });
      } else {
        res.status(200).json(updatedCart);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating cart item', error });
    }
  };