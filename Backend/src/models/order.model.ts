

import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
  userDetails: {
    userId: string;
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
    productId: mongoose.Types.ObjectId;
    quantity: number;
    REF: string;
    attributes: [{ key: String, value: String }],
    price: number;
    subcategoryID: { name: string };
  }[];
  date: Date;
  totalPrice: number;
  status: "Pending" | "Approved" | "Rejected";
}

const OrderSchema: Schema = new Schema({
  userDetails: {
    userId: { type: String, required: true },
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
      productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      REF: { type: String, required: true },
      attributes: [
        {
          key: { type: String, required: true },
          value: { type: Schema.Types.Mixed, required: true },
        },
      ],
      price: { type: Number, required: true },
      subcategoryID: { type: Schema.Types.ObjectId, ref: "SubCategory" }, 
    },
  ],
  date: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
});

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
