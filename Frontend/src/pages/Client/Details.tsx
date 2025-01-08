
// 'use client';

// import { useEffect, useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { ShoppingCart } from 'lucide-react';
// import NavBar from '@/components/NavBar';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function Component() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const subcategory = location.state?.product; // Safely access the product from state
//   const subcategoryID = subcategory?._id; // Use optional chaining to handle undefined state

//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState<any>(null);
//   const [quantity, setQuantity] = useState(1); // New state for quantity

//   // Redirect to home if subcategory is undefined
//   useEffect(() => {
//     if (!subcategory) {
//       console.error("Subcategory is undefined. Redirecting to Home.");
//       navigate("/"); // Redirect to home
//     }
//   }, [subcategory, navigate]);

//   const fetchProducts = async () => {
//     if (!subcategoryID) return; // Exit if subcategoryID is undefined
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/product/getproductsbycategory/${subcategoryID}`
//       );
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [subcategoryID]);

//   const AddToCart = async (product: any) => {
//     if (!product) {
//       alert("Please select a product before adding to cart.");
//       return;
//     }

//     if (quantity < 1) {
//       alert("Please select a valid quantity.");
//       return;
//     }

//     try {
//       const payload = {
//         productId: product._id, // Pass the product ID
//         attributes: product.attributes, // Pass attributes (if applicable)
//         quantity: quantity, // Pass selected quantity
//       };

//       console.log("Payload for AddToCart:", payload); // Debugging log
//       await axios.post("http://localhost:3000/api/cart/addcart", payload);
//       alert("Item added to cart successfully!");
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//       alert("Failed to add item to cart.");
//     }
//   };

//   const handleSelect = (selectedValue: any) => {
//     const selected = products.find((p: any) => p._id === selectedValue);
//     setSelectedProduct(selected);
//     console.log("Selected product:", selected);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <NavBar />
//       {subcategory ? (
//         <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//           <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
//             <div className="px-4 py-5 sm:px-6">
//               <h2 className="text-3xl font-extrabold">{subcategory.name}</h2>
//               <p className="mt-1 max-w-2xl text-sm text-gray-500">Product details and specifications</p>
//             </div>
//             <div className="border-t border-gray-200">
//               <dl>
//                 <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                   <dt className="text-sm font-medium text-gray-500">Image</dt>
//                   <dd>
//                     <img
//                       src={subcategory.image}
//                       alt={subcategory.name}
//                       className="w-64 h-48 object-cover rounded"
//                       onError={(e) => {
//                         e.currentTarget.src = "/path-to-placeholder.jpg";
//                       }}
//                     />
//                   </dd>
//                 </div>
//                 <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                   <dt className="text-sm font-medium text-gray-500">Price</dt>
//                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                     <span className="text-xl font-bold text-blue-600">
//                       {selectedProduct ? `MAD ${selectedProduct.price}` : "Select a product"}
//                     </span>
//                   </dd>
//                 </div>
//                 <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                   <dt className="text-sm font-medium text-gray-500">Availability</dt>
//                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                     {selectedProduct ? (
//                       selectedProduct.stock > 0 ? (
//                         <Badge className="bg-green-100 text-green-800">In Stock</Badge>
//                       ) : (
//                         <Badge className="bg-red-100 text-red-800">Unavailable</Badge>
//                       )
//                     ) : (
//                       "Select a product to view availability"
//                     )}
//                   </dd>
//                 </div>
//                 <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                   <dt className="text-sm font-medium text-gray-500">References</dt>
//                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                     <Select onValueChange={handleSelect}>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="References" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {products.map((product: any) => (
//                           <SelectItem key={product._id} value={product._id}>
//                             {product.REF}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </dd>
//                 </div>
//               </dl>
//             </div>

//             <div className="mt-8 flex flex-col items-center space-y-4">
//               <div className="flex items-center space-x-4">
//                 <label htmlFor="quantity" className="text-sm font-medium text-gray-500">Quantity:</label>
//                 <input
//                   id="quantity"
//                   type="number"
//                   className="border rounded px-4 py-2 w-20 text-center focus:ring focus:ring-blue-300"
//                   min={1}
//                   value={quantity}
//                   onChange={(e) => setQuantity(Number(e.target.value))}
//                 />
//               </div>
//               <Button
//                 onClick={() => AddToCart(selectedProduct)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-full shadow-lg"
//               >
//                 <ShoppingCart className="mr-2 h-5 w-5" />
//                 Add to Cart
//               </Button>
//             </div>
//           </div>
//           <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
// <dt className="font-bold text-lg">Table Image</dt> {/* Added font-bold and text-lg for larger bold text */}
// <dd>
// {subcategory.tableImage ? (
// <div className="flex justify-center items-center"> {/* Centering container */}
// <img
//   src={subcategory.tableImage}
//   alt="Table"
//   className="object-contain rounded"
//   style={{ height: "350px", maxWidth: "250%" }} // Custom styles for size
//   onError={(e) => {
//     e.currentTarget.src = "/path-to-placeholder.jpg";
//   }}
// />
// </div>
// ) : (
// <div className="flex justify-center items-center h-64">
// <span>No table image available</span>
// </div>
// )}
// </dd>
// </div>
//         </div>
        
//       ) : (
//         <div className="text-center mt-20">
//           <h2>Subcategory not found</h2>
//           <Button onClick={() => navigate("/")} className="mt-4">
//             Go Back to Home
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import NavBar from "@/components/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Component() {
  const navigate = useNavigate();
  const location = useLocation();
  const subcategory = location.state?.product; // Safely access the product from state
  const subcategoryID = subcategory?._id; // Use optional chaining to handle undefined state

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  // Redirect to home if subcategory is undefined
  useEffect(() => {
    if (!subcategory) {
      console.error("Subcategory is undefined. Redirecting to Home.");
      navigate("/"); // Redirect to home
    }
  }, [subcategory, navigate]);

  const fetchProducts = async () => {
    if (!subcategoryID) return; // Exit if subcategoryID is undefined
    try {
      const response = await axios.get(
        `http://localhost:3000/api/product/getproductsbycategory/${subcategoryID}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [subcategoryID]);

  const AddToCart = async (product: any) => {
    if (!product) {
      toast.warn("Please select a product before adding to cart.");
      return;
    }

    if (quantity < 1) {
      toast.warn("Please select a valid quantity.");
      return;
    }

    try {
      const payload = {
        productId: product._id, // Pass the product ID
        attributes: product.attributes, // Pass attributes (if applicable)
        quantity: quantity, // Pass selected quantity
      };

      console.log("Payload for AddToCart:", payload); // Debugging log
      await axios.post("http://localhost:3000/api/cart/addcart", payload);
      toast.success("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart.");
    }
  };

  const handleSelect = (selectedValue: any) => {
    const selected = products.find((p: any) => p._id === selectedValue);
    setSelectedProduct(selected);
    console.log("Selected product:", selected);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <ToastContainer position="top-center" autoClose={3000} />
      {subcategory ? (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-1/2 p-6 bg-white flex justify-center items-center">
              <img
                src={subcategory.image}
                alt={subcategory.name}
                className="w-full h-auto object-contain max-h-96"
                onError={(e) => {
                  e.currentTarget.src = "/path-to-placeholder.jpg";
                }}
              />
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{subcategory.name}</h1>
              <p className="text-sm text-gray-500 mb-4">
                Select from the available References table below to customize your product.
              </p>

              {/* References */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-600 mb-2 block">References:</label>
                <select
                  onChange={(e) => handleSelect(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full focus:ring focus:ring-blue-300"
                >
                  <option value="" disabled selected>
                    Select a product
                  </option>
                  {products.map((product: any) => (
                    <option key={product._id} value={product._id}>
                      {product.REF}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-semibold text-blue-600">
                  {selectedProduct ? `MAD ${selectedProduct.price}` : "Select a product"}
                </span>
                {selectedProduct && (
                  <Badge
                    className={`px-3 py-1 ${
                      selectedProduct.stock > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedProduct.stock > 0 ? "In Stock" : "Out of Stock"}
                  </Badge>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-600 mb-2 block">
                  Quantity:
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border rounded-lg px-4 py-2 w-20 text-center focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Add to Cart Button */}
              <div>
                <Button
                  onClick={() => AddToCart(selectedProduct)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-3 text-lg rounded-lg shadow-lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Table Image Section */}
          <div className="mt-12 bg-white p-8 shadow-md rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Reference table</h2>
            {subcategory.tableImage ? (
              <div className="flex justify-center">
                <img
                  src={subcategory.tableImage}
                  alt="Table"
                  className="object-contain rounded-lg max-h-80"
                  onError={(e) => {
                    e.currentTarget.src = "/path-to-placeholder.jpg";
                  }}
                />
              </div>
            ) : (
              <p className="text-gray-500 text-center">No table image available.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold text-gray-800">Subcategory not found</h2>
          <Button onClick={() => navigate("/")} className="mt-4 bg-blue-500 text-white">
            Go Back to Home
          </Button>
        </div>
      )}
    </div>
  );
}
