'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2, Search, Tag } from 'lucide-react';
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';


interface Category {
  _id: string;
  name: string;
  description: string;
  productCount: number;
}


interface SubCategory {
  _id: string;
  name: string;
  description: string;
  categoryID: string;
}

export default function CategoryPage() {
  const { user, isLoaded } = useUser(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role !== 'admin') {
      navigate('/');
    }
  }, [isLoaded, user, navigate]);

  if (!isLoaded || user?.publicMetadata?.role !== 'admin') {
    return <h1 className="text-center mt-10">Loading...</h1>; 
  }


  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [subCategories, setSubCategories] = useState<Record<string, SubCategory[]>>({});


  const fetchCategoriesWithSubCategories = async () => {
    try {
      const categoryResponse = await axios.get('http://localhost:3000/api/categories/getcategories');
      const fetchedCategories = categoryResponse.data;


      const subCategoryPromises = fetchedCategories.map((category: Category) =>
        axios
          .get(`http://localhost:3000/api/subcategories/getsubcategorybycategory/${category._id}`)
          .then((res) => ({ categoryID: category._id, subCategories: res.data }))
      );

      const subCategoryResults = await Promise.all(subCategoryPromises);

 
      const subCategoryMap = subCategoryResults.reduce(
        (acc, result) => ({ ...acc, [result.categoryID]: result.subCategories }),
        {}
      );

      setCategories(fetchedCategories);
      setSubCategories(subCategoryMap);
    } catch (error) {
      console.error('Error fetching categories or subcategories:', error);
    }
  };

  useEffect(() => {
    fetchCategoriesWithSubCategories();
  }, []);

  const handleAddCategory = async (newCategory: Omit<Category, '_id' | 'productCount'>) => {
    try {
      const response = await axios.post('http://localhost:3000/api/categories/addcategory', newCategory);
      setCategories([...categories, response.data]);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleUpdateCategory = async (updatedCategory: Category) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/categories/updatecategory/${updatedCategory._id}`, updatedCategory);
      setCategories(categories.map((c) => (c._id === updatedCategory._id ? response.data : c)));
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/categories/deletecategory/${id}`);
      setCategories(categories.filter((c) => c._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      <LeftSideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-2xl font-bold">Category Management</h1>
          <div className="flex items-center space-x-4">
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search categories..."
                className="pl-8 w-64"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              />
            </form>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setCurrentCategory(null)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{currentCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                  <DialogDescription>
                    {currentCategory ? 'Make changes to the category here.' : 'Add the details of the new category here.'}
                  </DialogDescription>
                </DialogHeader>
                <CategoryForm
                  initialData={currentCategory}
                  onSubmit={(data) => {
                    if (currentCategory) {
                      handleUpdateCategory({ ...currentCategory, ...data } as Category);
                    } else {
                      handleAddCategory(data as Omit<Category, '_id' | 'productCount'>);
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
              <CardTitle>Category List</CardTitle>
              <CardDescription>Manage your product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Subategories</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Tag className="mr-2 h-4 w-4" />
                          {category.name}
                        </div>
                      </TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell>
                        <Badge variant="secondary"> {subCategories[category._id]?.length || 0}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setCurrentCategory(category);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteCategory(category._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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


interface CategoryFormProps {
  initialData: Partial<Omit<Category, 'productCount'>> | null;
  onSubmit: (data: Partial<Omit<Category, '_id' | 'productCount'>>) => void;
}

function CategoryForm({ initialData, onSubmit }: CategoryFormProps) {
  const [formData, setFormData] = useState<Partial<Omit<Category, '_id' | 'productCount'>>>(
    initialData || { name: '', description: '' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            className="col-span-3"
            rows={3}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">{initialData ? 'Update Category' : 'Add Category'}</Button>
      </DialogFooter>
    </form>
  );
}

