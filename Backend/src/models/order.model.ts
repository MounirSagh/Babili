import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
  userDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    postalCode: string;
    country: string;
  };
  cartItems: {
    _id: number;
    REF: string;
    Poitrine: string;
    Poids: string;
    Flottabilité: string;
    TYPE: string;
    subcategoryID: string;
    quantity: number;
  }[];
  date: Date;
}

const OrderSchema: Schema = new Schema({
  userDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  cartItems: [
    {
      REF: { type: String, required: true },
      Poitrine: { type: String, required: true },
      Poids: { type: String, required: true },
      Flottabilité: { type: String, required: true },
      TYPE: { type: String, required: true },
      subcategoryID: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;