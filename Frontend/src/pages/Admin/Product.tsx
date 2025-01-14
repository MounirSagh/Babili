'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import LeftSideBar from '@/components/SideBar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react'; // Import Trash icon

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

interface SubCategory {
  _id: string;
  name: string;
}

interface Attribute {
  key: string;
  value: string;
}

interface CartItem {
  productId: Product;
  quantity: number;
}

interface Product {
  _id?: string;
  REF: string;
  subcategoryID: SubCategory | string;
  attributes: Attribute[];
  stock: number;
  price: number;
  isActive: boolean;
}

export default function ProductPage() {
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


  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // For order placement
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
  }); // Store user details

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user/me');
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Fetch subcategories
  const fetchSubCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/subcategories/getsubcategories');
      setSubCategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products/getproducts');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchSubCategories();
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct: Product) => {
    try {
      const response = await axios.post('http://localhost:3000/api/products/addproduct', newProduct);
      setProducts([...products, response.data]);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/products/updateproduct/${updatedProduct._id}`,
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
      await axios.delete(`http://localhost:3000/api/products/deleteproduct/${productID}`);
      setProducts(products.filter((p) => p._id !== productID));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Place order and update stock
  const handleOrderPlacement = async () => {
    try {
      const orderData = {
        userDetails,
        cartItems: cartItems.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
      };

      // Send order data to the server
      const response = await axios.post('http://localhost:3000/api/order/place', orderData);
      console.log(response.data.message);

      // Show success message
      setOrderSuccess(true);

      // Refetch products to update stock
      fetchProducts();

      // Optional: Clear cart items locally
      setCartItems([]);
    } catch (error) {
      console.error('Order placement failed:', error);
      alert('Failed to place the order. Please try again.');
    }
  };

 // Filter products by either REF or subcategory name
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
            <Input
              type="search"
              placeholder="Search products..."
              className="w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setCurrentProduct(null)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{currentProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
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
              <CardDescription>Manage your products effectively.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>REF</TableHead>
                      <TableHead>Attributes</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>SubCategory</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>{product.REF}</TableCell>
                        <TableCell>
                          {product.attributes.length > 0
                            ? product.attributes.map((attr, index) => (
                                <div key={index}>
                                  {attr.key}: {attr.value}
                                </div>
                              ))
                            : 'No attributes'}
                        </TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          {typeof product.subcategoryID === 'object'
                            ? (product.subcategoryID as SubCategory).name
                            : 'Unknown'}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
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
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

interface ProductFormProps {
  subCategories: SubCategory[];
  initialData: Partial<Product> | null;
  onSubmit: (data: Partial<Product>) => void;
}

function ProductForm({ subCategories, initialData, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    initialData || {
      REF: '',
      subcategoryID: '',
      attributes: [],
      stock: 0,
      price: 0,
      isActive: true,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttributesChange = (index: number, key: string, value: string) => {
    setFormData((prev) => {
      const updatedAttributes = [...(prev.attributes || [])];
      updatedAttributes[index] = { key, value };
      return { ...prev, attributes: updatedAttributes };
    });
  };

  const addAttribute = () => {
    setFormData((prev) => ({
      ...prev,
      attributes: [...(prev.attributes || []), { key: '', value: '' }],
    }));
  };

  const handleRemoveAttribute = (index: number) => {
    setFormData((prev) => {
      const updatedAttributes = prev.attributes?.filter((_, i) => i !== index);
      return { ...prev, attributes: updatedAttributes || [] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        <div className="col-span-1">
          <label htmlFor="REF" className="block text-sm font-medium text-gray-700">
            Product REF
          </label>
          <Input
            id="REF"
            name="REF"
            placeholder="Enter Product REF"
            value={formData.REF || ''}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <Input
            id="stock"
            name="stock"
            type="number"
            placeholder="Enter Stock Quantity"
            value={formData.stock?.toString() || ''}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="Enter Product Price"
            value={formData.price?.toString() || ''}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="subcategoryID" className="block text-sm font-medium text-gray-700">
            Subcategory
          </label>
          <select
            id="subcategoryID"
            name="subcategoryID"
            value={typeof formData.subcategoryID === 'string' ? formData.subcategoryID : ''}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded-md p-2"
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
        <div className="col-span-2">
          <h4 className="text-md font-bold">Attributes</h4>
          {formData.attributes?.map((attr, index) => (
            <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-2">
            <Input
              placeholder="Key"
              value={attr.key}
              onChange={(e) => handleAttributesChange(index, e.target.value, attr.value)}
              className="w-full"
            />
            <Input
              placeholder="Value"
              value={attr.value}
              onChange={(e) => handleAttributesChange(index, attr.key, e.target.value)}
              className="w-full"
            />
            <Trash
              className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700"
              onClick={() => handleRemoveAttribute(index)} // Remove attribute on click
            />
          </div>
          
          ))}
          <Button type="button" onClick={addAttribute} className="mt-2">
            Add Attribute
          </Button>
        </div>
      </div>
      <DialogFooter className="flex justify-end">
        <Button type="submit" className="px-6">
          {initialData ? 'Update Product' : 'Add Product'}
        </Button>
      </DialogFooter>
    </form>
  );
}