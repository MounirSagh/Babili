"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from '@/components/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


type Product = {
  _id: string;
  name: string;
  categoryID: string;
};

interface Category {
  _id: string;
  name: string;
}

export default function Component() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [categories, setCategories] = useState<Category[]>([]);
  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories/getcategories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const Addtocart = async (product: Product) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/additemtocart', product);
      console.log(response)
      alert("Item added to cart")
    } catch (error) {
      console.error('Error fetching categories:', error);
    } 
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/subcategories/getsubcategories');
      setProducts(response.data);
      console.log('Fetched Products:', response.data); // Log response data directly
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || product.categoryID === selectedCategory)
    );
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, products]); // Add products as a dependency


  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main>
        <div className="">
          <div className="relative h-[850px] mb-8 overflow-hidden ">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="src/assets/vid001.mp4" 
              autoPlay
              loop
              muted
            />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-50 p-8">
              <h2 className="text-2xl font-medium mb-2">Explore the Colourful World</h2>
              <div className="w-52 h-[2px] bg-blue-500 mb-4"></div>
              <h1 className="text-6xl font-bold mb-6">A WONDERFUL GIFT</h1>
              <button className="px-6 py-3 text-lg font-semibold bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300">
                LEARN MORE
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="col-span-2">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <span>${priceRange[0]}</span>
              <Slider
                min={0}
                max={300}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="flex-grow"
              />
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {filteredProducts.map((product) => (
              <Card key={product._id} className="flex flex-col h-full">
                <CardHeader className="flex-grow">
                  {/* <img src={product.image} alt={product.name} className="w-full h-48 object-cover" /> */}
                  image
                </CardHeader>

                {/* Separator */}
                <div className="w-full h-[1px] bg-gray-200 my-2"></div>

                <CardContent className="flex flex-col items-start space-y-2">
                  <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                    {categories.find(category => category._id === product.categoryID)?.name || "Unknown Category"}
                  {/* <p className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</p> */}
                </CardContent>

                <CardFooter className="mt-auto w-full">
                <Button onClick={() => navigate('/Details', { state: { product } })} className="w-full">View </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}