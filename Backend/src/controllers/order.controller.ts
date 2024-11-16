import { Request, Response } from 'express';
import Order from '../models/order.model';
import { console } from 'inspector';

export const placeOrder = async (req: Request, res: Response) => {
  try {
    console.log("Received payload:", req.body);
    const { userDetails, cartItems } = req.body;
    console.log('hh',userDetails)
    const order = new Order({
      userDetails,
      cartItems,
      date: new Date(),
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
};