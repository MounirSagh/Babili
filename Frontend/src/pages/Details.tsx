'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star} from 'lucide-react'
import NavBar from '@/components/NavBar'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Component() {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState()
  const location = useLocation()
  const subcategory = location.state?.product
  const subcategoryID = location.state?.product._id

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/product/getproductsbycategory/${subcategoryID}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [subcategoryID]);

  const Addtocart = async (product: any) => {
    try {
      console.log(product)
      const response = await axios.post('http://localhost:5000/api/cart/additemtocart', product);
      console.log(response)
      alert("Item added to cart")
    } catch (error) {
      console.error('Error fetching categories:', error);
    } 
  }

  const handleSelect = (selectedValue: any) => {
    setSelectedProduct(selectedValue)
    console.log("Selected product:", selectedValue);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-3xl font-extrabold text-gray-900">{subcategory.name}</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Product details and specifications</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Image</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="">image</span>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Price</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="text-xl font-bold text-blue-600">$500</span>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Availability</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Rating</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-gray-600">(50 reviews)</span>
                  </div>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">References</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex items-center">
                  <Select onValueChange={handleSelect}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="References" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product: any) => (
                        <SelectItem
                          key={product._id}
                          value={product}
                        >
                          {product.REF}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button onClick={() => Addtocart(selectedProduct)} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}