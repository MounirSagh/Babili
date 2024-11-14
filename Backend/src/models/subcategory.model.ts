import mongoose, { Schema, Document } from 'mongoose';

interface ISubCategory extends Document {
    name: string;
    categoryID: string
}

const SubCategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    categoryID: { type: String, required: true },

}, { collection: 'SubCategory' });

const SubCategory = mongoose.model<ISubCategory>('SubCategory', SubCategorySchema);
export default SubCategory;