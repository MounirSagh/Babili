// import { Request, Response } from 'express';
// import SubCategory from '../models/subcategory.model';

// export const createSubCategory = async (req: Request, res: Response) => {
//     try {
//         const subcategory = new SubCategory(req.body);
//         await subcategory.save();
//         res.status(201).json(subcategory);
//     } catch (error) {
//         res.status(400).json({ message: 'Error creating subcategory', error });
//     }
// };


// export const getSubCategories = async (req: Request, res: Response) => {
//     try {
//         console.log("hhh")
//         const subcategories = await SubCategory.find();
//         res.status(200).json(subcategories);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching subcategories', error });
//     }
// };


// export const getSubCategoryById = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const subcategory = await SubCategory.findById(req.params.id);
//         if (!subcategory) {
//             res.status(404).json({ message: 'subcategory not found' });
//         } else {
//             res.status(200).json(subcategory);
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching subcategory', error });
//     }
// };


// export const getSubCategorybycategory = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const { id } = req.params;
//       const subcategories = await SubCategory.find({ categoryID: id });
//       res.status(200).json(subcategories);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching subcategories', error });
//     }
//   };


// export const updateSubCategory = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const subcategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!subcategory) {
//             res.status(404).json({ message: 'subcategory not found' });
//         } else {
//             res.status(200).json(subcategory);
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating subcategory', error });
//     }
// };


// export const deleteSubCategory = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
//         if (!subcategory) {
//             res.status(404).json({ message: 'subcategory not found' });
//         } else {
//             res.status(200).json({ message: 'subcategory deleted' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting subcategory', error });
//     }
// };

// cloudinary configuration
// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';



// Configure storage for uploads folder
// const uploadsStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'uploads', // Cloudinary folder name
//     allowed_formats: ['jpg', 'png', 'jpeg'],
//   },
// });

// Configure storage for tables folder
// const tablesStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'tables', // Cloudinary folder name
//     allowed_formats: ['jpg', 'png', 'jpeg'],
//   },
// });




// good last one
// import { Request, Response } from 'express';
// import SubCategory from '../models/subcategory.model';
// // Create a new subcategory
// export const createSubCategory = async (req: Request, res: Response): Promise<void> => {
//   const { name, categoryID, image } = req.body;
//   try {
//     const newSubCategory = new SubCategory({ name, categoryID, image });
//     await newSubCategory.save();
//     res.status(201).json(newSubCategory);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating subcategory', error });
//   }
// };

// // Get all subcategories
// export const getSubCategories = async (_req: Request, res: Response) => {
//   try {
//     const subcategories = await SubCategory.find();
//     res.status(200).json(subcategories);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching subcategories', error });
//   }
// };

// // Get a subcategory by ID
// export const getSubCategoryById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const subcategory = await SubCategory.findById(req.params.id);
//     if (!subcategory) {
//       res.status(404).json({ message: 'Subcategory not found' });
//     } else {
//       res.status(200).json(subcategory);
//     }
//   } catch (error: any) {
//     if (error.name === 'CastError') {
//       res.status(400).json({ message: 'Invalid subcategory ID format', error });
//     } else {
//       res.status(500).json({ message: 'Error fetching subcategory', error });
//     }
//   }
// };

// // Get subcategories by category ID
// export const getSubCategorybycategory = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const subcategories = await SubCategory.find({ categoryID: id });
//     res.status(200).json(subcategories);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching subcategories', error });
//   }
// };

// // Update a subcategory
// export const updateSubCategory = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { name, categoryID, image } = req.body;
//     const subcategory = await SubCategory.findByIdAndUpdate(
//       req.params.id,
//       { name, categoryID, image },
//       { new: true }
//     );
//     if (!subcategory) {
//       res.status(404).json({ message: 'Subcategory not found' });
//     } else {
//       res.status(200).json(subcategory);
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating subcategory', error });
//   }
// };

// // Delete a subcategory
// export const deleteSubCategory = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
//     if (!subcategory) {
//       res.status(404).json({ message: 'Subcategory not found' });
//     } else {
//       res.status(200).json({ message: 'Subcategory deleted' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting subcategory', error });
//   }
// };


import { Request, Response } from 'express';
import SubCategory from '../models/subcategory.model'; // Adjust path as necessary

// Create a new subcategory
export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const { name, categoryID } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const image = files?.['image']?.[0]?.path; // Cloudinary URL for the main image
    const tableImage = (req.files as { [fieldname: string]: Express.Multer.File[] })?.['tableImage']?.[0]?.path; // Cloudinary URL for the table image

    const newSubCategory = new SubCategory({ name, categoryID, image, tableImage });
    await newSubCategory.save();

    res.status(201).json(newSubCategory);
  } catch (error) {
    console.error('Error creating subcategory:', error);
    res.status(500).json({ message: 'Failed to create subcategory' });
  }
};

// Get all subcategories
export const getSubCategories = async (_req: Request, res: Response) => {
  try {
    const subcategories = await SubCategory.find();
    res.status(200).json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ message: 'Failed to fetch subcategories' });
  }
};

// Get subcategory by ID
export const getSubCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subcategory = await SubCategory.findById(id);

    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json(subcategory);
  } catch (error) {
    console.error('Error fetching subcategory by ID:', error);
    res.status(500).json({ message: 'Failed to fetch subcategory' });
  }
};

// Update subcategory
export const updateSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, categoryID } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const image = files?.['image']?.[0]?.path; // Cloudinary URL for the main image
    const tableImage = (req.files as { [fieldname: string]: Express.Multer.File[] })?.['tableImage']?.[0]?.path; // Cloudinary URL for the table image
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      id,
      { name, categoryID, ...(image && { image }), ...(tableImage && { tableImage }) },
      { new: true }
    );

    if (!updatedSubCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json(updatedSubCategory);
  } catch (error) {
    console.error('Error updating subcategory:', error);
    res.status(500).json({ message: 'Failed to update subcategory' });
  }
};

// Delete subcategory
export const deleteSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedSubCategory = await SubCategory.findByIdAndDelete(id);

    if (!deletedSubCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    res.status(500).json({ message: 'Failed to delete subcategory' });
  }
};

// Get subcategories by category ID
export const getSubCategoryByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const subcategories = await SubCategory.find({ categoryID: id });
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategories', error });
  }
};