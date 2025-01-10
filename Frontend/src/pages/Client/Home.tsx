// "use client";

// import { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import NavBar from '@/components/NavBar';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


// type Product = {
//   _id: string;
//   name: string;
//   categoryID: string;
// };

// interface Category {
//   _id: string;
//   name: string;
// }

// export default function Component() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [priceRange, setPriceRange] = useState([0, 300]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   // Fetch categories from backend
//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/categories/getcategories');
//       setCategories(response.data);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };


//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchSubCategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/subcategories/getsubcategories');
//       setProducts(response.data);
//       console.log('Fetched Products:', response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   useEffect(() => {
//     fetchSubCategories();
//   }, []);

//   useEffect(() => {
//     const filtered = products.filter((product) => 
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (selectedCategory === "All" || product.categoryID === selectedCategory)
//     );
//     setFilteredProducts(filtered);
//   }, [searchTerm, selectedCategory, priceRange, products]); 


//   return (
//     <div className="min-h-screen bg-gray-100">
//       <NavBar />
//       <main>
//         <div className="">
//           <div className="relative h-[850px] mb-8 overflow-hidden ">
//             <video
//               className="absolute top-0 left-0 w-full h-full object-cover"
//               src="src/assets/vid001.mp4" 
//               autoPlay
//               loop
//               muted
//             />
//             <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-50 p-8">
//               <h2 className="text-2xl font-medium mb-2">Explore the Colourful World</h2>
//               <div className="w-52 h-[2px] bg-blue-500 mb-4"></div>
//               <h1 className="text-6xl font-bold mb-6">A WONDERFUL GIFT</h1>
//               <button className="px-6 py-3 text-lg font-semibold bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300">
//                 LEARN MORE
//               </button>
//             </div>
//           </div>


//           <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//             <div className="col-span-2">
//               <Input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full"
//               />
//             </div>
//             <Select onValueChange={setSelectedCategory}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select category" />
//               </SelectTrigger>
//               <SelectContent>
//                 {categories.map((category) => (
//                   <SelectItem key={category._id} value={category._id}>
//                     {category.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <div className="flex items-center space-x-2">
//               <span>${priceRange[0]}</span>
//               <Slider
//                 min={0}
//                 max={300}
//                 step={1}
//                 value={priceRange}
//                 onValueChange={setPriceRange}
//                 className="flex-grow"
//               />
//               <span>${priceRange[1]}</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//             {filteredProducts.map((product) => (
//               <Card key={product._id} className="flex flex-col h-full">
//                 <CardHeader className="flex-grow">
//                   {/* <img src={product.image} alt={product.name} className="w-full h-48 object-cover" /> */}
//                   image
//                 </CardHeader>

//                 {/* Separator */}
//                 <div className="w-full h-[1px] bg-gray-200 my-2"></div>

//                 <CardContent className="flex flex-col items-start space-y-2">
//                   <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
//                     {categories.find(category => category._id === product.categoryID)?.name || "Unknown Category"}
//                   {/* <p className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</p> */}
//                 </CardContent>

//                 <CardFooter className="mt-auto w-full">
//                 <Button onClick={() => navigate('/Details', { state: { product } })} className="w-full">View </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

type SubCategory = {
  _id: string;
  name: string;
  categoryID: string;
  image: string; // Added image field
};

interface Category {
  _id: string;
  name: string;
}

export default function Component() {
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<SubCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<Category[]>([]);
  const { user, isLoaded } = useUser(); 

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role == 'admin') {
      navigate('/Admin/Dashboard'); 
    }
  }, [isLoaded, user, navigate]);



  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/categories/getcategories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch subcategories from backend
  const fetchSubCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/subcategories/getsubcategories");
      setSubcategories(response.data);
      setFilteredSubcategories(response.data); // Initialize filteredSubcategories
      console.log("Fetched Subcategories:", response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  // Filter subcategories based on search and category
  useEffect(() => {
    const filtered = subcategories.filter((subcategory) =>
      subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || subcategory.categoryID === selectedCategory)
    );
    setFilteredSubcategories(filtered);
  }, [searchTerm, selectedCategory, subcategories]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main>
        <div>
          {/* Hero Section */}
          <div className="relative h-[850px] mb-8 overflow-hidden">
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
        </div>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-white shadow rounded p-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <Input
              type="text"
              placeholder="Search subcategories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <Select onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Subcategories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {filteredSubcategories.map((subcategory) => (
            <Card key={subcategory._id} className="flex flex-col h-full shadow-lg">
              <CardHeader>
                <img
                  src={subcategory.image}
                  alt={subcategory.name}
                  className="w-full h-48 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = "/path-to-placeholder.jpg";
                  }}
                />
              </CardHeader>
              <CardContent className="flex flex-col items-start space-y-2">
                <CardTitle>{subcategory.name}</CardTitle>
                <p>
                  {categories.find((category) => category._id === subcategory.categoryID)?.name ||
                    "Unknown Category"}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => navigate("/Details", { state: { product: subcategory } })}
                  className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
