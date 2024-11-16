import { Request, Response } from 'express';
import Sale from '../models/sale.model';

export const createSale = async (req: Request, res: Response) => {
    try {
        const sale = new Sale(req.body);
        await sale.save();
        res.status(201).json(sale);
    } catch (error) {
        res.status(400).json({ message: 'Error creating sale', error });
    }
};

export const getSales = async (req: Request, res: Response) => {
    try {
        const sales = await Sale.find();
        console.log(sales)
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sales', error });
    }
};
