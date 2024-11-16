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

// Define Types
interface SubCategory {
  _id: string;
  name: string;
}

interface Product {
  _id?: string;
  REF: string;
  Poitrine: string;
  Poids: string;
  Flottabilité: string;
  TYPE: string;
  subcategoryID: string;
}

export default function ProductPage() {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);

  // Fetch all subcategories and products
  const fetchSubCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/subcategories/getsubcategories');
      setSubCategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/product/getproducts');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchSubCategories();
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct: Product) => {
    try {
      const response = await axios.post('http://localhost:5000/api/product/addproduct', newProduct);
      setProducts([...products, response.data]);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/product/updateproduct/${updatedProduct._id}`,
        updatedProduct
      );
      setProducts(
        products.map((p) => (p._id === updatedProduct._id ? response.data : p))
      );
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productID: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/product/deleteproduct/${productID}`);
      setProducts(products.filter((p) => p._id !== productID));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.REF.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subCategories.find((sc) => sc._id === product.subcategoryID)?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      <LeftSideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-2xl font-bold">Product Management</h1>
          <div className="flex items-center space-x-4">
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-64"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
              />
            </form>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setCurrentProduct(null)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {currentProduct ? 'Edit Product' : 'Add Product'}
                  </DialogTitle>
                </DialogHeader>
                <ProductForm
                  subCategories={subCategories}
                  initialData={currentProduct}
                  onSubmit={(data) => {
                    if (currentProduct) {
                      handleUpdateProduct({ ...currentProduct, ...data } as Product);
                    } else {
                      handleAddProduct(data as Product);
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
              <CardTitle>Product List</CardTitle>
              <CardDescription>Manage your products</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>REF</TableHead>
                    <TableHead>Poitrine</TableHead>
                    <TableHead>Poids</TableHead>
                    <TableHead>Flottabilité</TableHead>
                    <TableHead>TYPE</TableHead>
                    <TableHead>SubCategory</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>{product.REF}</TableCell>
                      <TableCell>{product.Poitrine}</TableCell>
                      <TableCell>{product.Poids}</TableCell>
                      <TableCell>{product.Flottabilité}</TableCell>
                      <TableCell>{product.TYPE}</TableCell>
                      <TableCell>
                        {
                          subCategories.find((sc) => sc._id === product.subcategoryID)
                            ?.name || 'Unknown'
                        }
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCurrentProduct(product);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product._id!)}
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

// Form Component
interface ProductFormProps {
  subCategories: SubCategory[];
  initialData: Partial<Product> | null;
  onSubmit: (data: Partial<Product>) => void;
}

function ProductForm({ subCategories, initialData, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    initialData || {
      REF: '',
      Poitrine: '',
      Poids: '',
      Flottabilité: '',
      TYPE: '',
      subcategoryID: '',
    }
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
        <Input
          id="REF"
          name="REF"
          placeholder="Product REF"
          value={formData.REF || ''}
          onChange={handleChange}
          required
        />
        <Input
          id="Poitrine"
          name="Poitrine"
          placeholder="Poitrine"
          value={formData.Poitrine || ''}
          onChange={handleChange}
          required
        />
        <Input
          id="Poids"
          name="Poids"
          placeholder="Poids"
          value={formData.Poids || ''}
          onChange={handleChange}
          required
        />
        <Input
          id="Flottabilité"
          name="Flottabilité"
          placeholder="Flottabilité"
          value={formData.Flottabilité || ''}
          onChange={handleChange}
          required
        />
        <Input
          id="TYPE"
          name="TYPE"
          placeholder="TYPE"
          value={formData.TYPE || ''}
          onChange={handleChange}
          required
        />
        <select
          id="subcategoryID"
          name="subcategoryID"
          value={formData.subcategoryID || ''}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a SubCategory
          </option>
          {subCategories.map((subcategory) => (
            <option key={subcategory._id} value={subcategory._id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>
      <DialogFooter>
        <Button type="submit">{initialData ? 'Update Product' : 'Add Product'}</Button>
      </DialogFooter>
    </form>
  );
}