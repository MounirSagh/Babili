'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import LeftSideBar from "@/components/SideBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";


interface Category {
  _id: string;
  name: string;
}

interface SubCategory {
  _id: string;
  name: string;
  categoryID: string;
  productCount: number;
}

export default function SubCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSubCategory, setCurrentSubCategory] = useState<Partial<SubCategory> | null>(null);


  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories/getcategories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/subcategories/getsubcategories');
      const enrichedSubCategories = await Promise.all(
        response.data.map(async (subcategory: SubCategory) => {
          const productCount = await getProductCountBySubCategory(subcategory._id);
          return { ...subcategory, productCount };
        })
      );
      setSubCategories(enrichedSubCategories);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const getProductCountBySubCategory = async (subcategoryID: string): Promise<number> => {
    try {
      console.log("hhh", subcategoryID)
      const response = await axios.get(
        `http://localhost:5000/api/product/getproductsbycategory/${subcategoryID}`
      );
      return response.data.length || 0;
    } catch (error) {
      console.error('Error fetching product count:', error);
      return 0;
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const handleAddSubCategory = async (newSubCategory: Partial<SubCategory>) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/subcategories/addsubcategory',
        newSubCategory
      );
      setSubCategories([...subCategories, { ...response.data, productCount: 0 }]);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  const handleUpdateSubCategory = async (updatedSubCategory: SubCategory) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/subcategories/updatesubcategory/${updatedSubCategory._id}`,
        updatedSubCategory
      );
      setSubCategories(
        subCategories.map((sc) =>
          sc._id === updatedSubCategory._id ? { ...response.data, productCount: sc.productCount } : sc
        )
      );
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating subcategory:', error);
    }
  };

  const handleDeleteSubCategory = async (subcategoryID: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/subcategories/deletesubcategories/${subcategoryID}`);
      setSubCategories(subCategories.filter((sc) => sc._id !== subcategoryID));
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  const filteredSubCategories = subCategories.filter(
    (subcategory) =>
      subcategory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      categories.find((cat) => cat._id === subcategory.categoryID)?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      <LeftSideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-2xl font-bold">SubCategory Management</h1>
          <div className="flex items-center space-x-4">
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <Input
                type="search"
                placeholder="Search subcategories..."
                className="w-64"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              />
            </form>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setCurrentSubCategory(null)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add SubCategory
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {currentSubCategory ? 'Edit SubCategory' : 'Add SubCategory'}
                  </DialogTitle>
                </DialogHeader>
                <SubCategoryForm
                  categories={categories}
                  initialData={currentSubCategory}
                  onSubmit={(data) => {
                    if (currentSubCategory) {
                      handleUpdateSubCategory({ ...currentSubCategory, ...data } as SubCategory);
                    } else {
                      handleAddSubCategory(data);
                    }
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle>SubCategory List</CardTitle>
              <CardDescription>Manage your subcategories</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubCategories.map((subcategory) => (
                    <TableRow key={subcategory._id}>
                      <TableCell>{subcategory.name}</TableCell>
                      <TableCell>
                        {
                          categories.find((category) => category._id === subcategory.categoryID)
                            ?.name || 'Unknown'
                        }
                      </TableCell>
                      <TableCell>{subcategory.productCount}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCurrentSubCategory(subcategory);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteSubCategory(subcategory._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}


interface SubCategoryFormProps {
  categories: Category[];
  initialData: Partial<SubCategory> | null;
  onSubmit: (data: Partial<SubCategory>) => void;
}

function SubCategoryForm({ categories, initialData, onSubmit }: SubCategoryFormProps) {
  const [formData, setFormData] = useState<Partial<SubCategory>>(
    initialData || { name: '', categoryID: '' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div>
          <Label htmlFor="name">SubCategory Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="categoryID">Category</Label>
          <select
            id="categoryID"
            name="categoryID"
            value={formData.categoryID || ''}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a Category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{initialData ? 'Update SubCategory' : 'Add SubCategory'}</Button>
      </DialogFooter>
    </form>
  );
}