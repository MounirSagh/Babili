import Sale from '../models/sale.model';
import path from "path";
import fs from "fs";
import { Request, Response } from 'express';


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
  const sales = await Sale.find().populate('cartItems.subcategoryID', 'name'); // Populate only the name of subcategory
  console.log('Fetched Sales:', sales); // Log fetched data
  res.status(200).json(sales);
} catch (error) {    console.error('Error fetching sales:', error);
  res.status(500).json({ message: 'Error fetching sales', error });
}
};



// Download invoice

export const downloadInvoice = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { filePath } = req.params; // Get the file path from the URL parameter

    if (!filePath) {
      res.status(400).json({ message: "File path is required" });
      return res;
    }

    const absolutePath = path.resolve(__dirname, "../../invoices", filePath);

    // Check if the file exists
    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    // Send the file as a download
    res.download(absolutePath, filePath, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).json({ message: "Error downloading file" });
      }
    });
    return res; // Ensure the function always returns a Response object
  } catch (error) {
    console.error("Error in downloadInvoice:", error);
    res.status(500).json({ message: "Server error", error });
    return res; // Ensure the function always returns a Response object
  }
};


