import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
    REF: string;
    Poitrine: string;
    Poids: string;
    Flottabilité: string;
    TYPE: string
    subcategoryID: string
}

const ProductSchema: Schema = new Schema({
    REF: { type: String, required: true },
    Poitrine: { type: String, required: true },
    Poids: { type: String, required: true },
    Flottabilité: { type: String, required: true },
    TYPE: { type: String, required: true },
    subcategoryID: { type: String, required: true },

}, { collection: 'Product' });

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;