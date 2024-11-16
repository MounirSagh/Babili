import { Request, Response } from 'express';
import Order from '../models/order.model';
import { console } from 'inspector';

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { userDetails, cartItems } = req.body;
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

export const getOrders = async (req: Request, res: Response) => {
  try {
      const orders = await Order.find();
      console.log(orders)
      res.status(200).json(orders);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error });
  }
};