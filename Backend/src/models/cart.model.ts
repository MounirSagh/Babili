import mongoose, { Schema, Document } from 'mongoose';

interface ICart extends Document {
    REF: string;
    Poitrine: string;
    Poids: string;
    Flottabilité: string;
    TYPE: string;
    subcategoryID: string;
    quantity: number;
}

const CartSchema: Schema = new Schema({
    REF: { type: String, required: true },
    Poitrine: { type: String, required: true },
    Poids: { type: String, required: true },
    Flottabilité: { type: String, required: true },
    TYPE: { type: String, required: true },
    subcategoryID: { type: String, required: true },
    quantity: { type: Number, required: true },

}, { collection: 'Cart' });

const Cart = mongoose.model<ICart>('Cart', CartSchema);
export default Cart;