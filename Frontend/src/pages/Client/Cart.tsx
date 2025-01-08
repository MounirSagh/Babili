// import { useEffect, useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { MinusCircle, PlusCircle } from 'lucide-react'
// import NavBar from '@/components/NavBar'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// type CartItem = {
//   _id: number
//   REF: string;
//   Poitrine: string;
//   Poids: string;
//   Flottabilité: string;
//   TYPE: string
//   subcategoryID: string
//   quantity: number
// }

// export default function Component() {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState<CartItem[]>([])
//   const fetchCart = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/cart/getcart');
//       setCartItems(response.data);
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//     }
//   };
//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const handleAddUpdateCart = async (updatedCart: CartItem) => {
//     try {
//       const response = await axios.put(`http://localhost:3000/api/cart/updatecart/${updatedCart._id}`, {
//         quantity: updatedCart.quantity + 1,
//       });
//       setCartItems(cartItems.map((c) => (c._id === updatedCart._id ? response.data : c)));
//     } catch (error) {
//       console.error('Error updating cart:', error);
//     }
//   };
  
//   const handleMinusUpdateCart = async (updatedCart: CartItem) => {
//     try {
//       const newQuantity = updatedCart.quantity - 1;
  
//       if (newQuantity <= 0) {
//         await axios.delete(`http://localhost:3000/api/cart/deletefromcart/${updatedCart._id}`);
//         setCartItems(cartItems.filter((c) => c._id !== updatedCart._id));
//       } else {
//         const response = await axios.put(`http://localhost:3000/api/cart/updatecart/${updatedCart._id}`, {
//           quantity: newQuantity,
//         });
//         setCartItems(cartItems.map((c) => (c._id === updatedCart._id ? response.data : c)));
//       }
//     } catch (error) {
//       console.error('Error updating cart:', error);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-white">
//       <NavBar />
//       <h1 className="text-2xl px-4 py-5 font-bold text-gray-800 text-center mb-8 mt-10">Shopping Cart</h1>
//       <div className="container mx-auto px-4">
//         {cartItems.length === 0 ? (

//           <div className="bg-white rounded-lg p-6 mb-8 text-center">
//             <p className="text-gray-500 text-xl">Your cart is empty.</p>
//           </div>
//         ) : (
      
//           <div className="bg-white rounded-lg p-6 mb-8">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="w-[100px]">Product</TableHead>
//                   <TableHead>Reference</TableHead>
//                   <TableHead>TYPE</TableHead>
//                   <TableHead>Flottabilité</TableHead>
//                   <TableHead>Poitrine</TableHead>
//                   <TableHead>Poids</TableHead>
//                   <TableHead>Quantity</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {cartItems.map((item) => (
//                   <TableRow key={item._id}>
//                     <TableCell className="font-medium">{item.REF}</TableCell>
//                     <TableCell className="font-medium">{item.REF}</TableCell>
//                     <TableCell className="font-medium">{item.TYPE}</TableCell>
//                     <TableCell className="font-medium">{item.Flottabilité}</TableCell>
//                     <TableCell className="font-medium">{item.Poitrine}</TableCell>
//                     <TableCell className="font-medium">{item.Poids}</TableCell>
//                     <TableCell className="font-medium">{item.quantity}</TableCell>
//                     <TableCell>
//                       <div className="flex space-x-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleAddUpdateCart(item)}
//                         >
//                           <PlusCircle className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleMinusUpdateCart(item)}
//                         >
//                           <MinusCircle className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-center">

//               <div className="flex items-center text-center justify-center md:justify-end w-full md:w-auto">
//                 <Button onClick={() => navigate('/Order')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-3 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
//                   Proceed to Ordering
//                 </Button>
//               </div>
//             </div>
//           </div>
          
//         )}
        
//       </div>
//     </div>
//   );

// }

// 'use client';

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { MinusCircle, PlusCircle } from "lucide-react";
// import NavBar from "@/components/NavBar";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// type Attribute = {
//   key: string;
//   value: any;
// };

// type CartItem = {
//   _id: string;
//   productId: {
//     _id: string;
//     REF: string;
//     attributes: Attribute[];
//   };
//   attributes: Attribute[];
//   quantity: number;
// };

// export default function CartPage() {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   const fetchCart = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/cart/getcart");
//       setCartItems(response.data);
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const handleAddUpdateCart = async (updatedCart: CartItem) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:3000/api/cart/updatecart/${updatedCart._id}`,
//         {
//           quantity: updatedCart.quantity + 1,
//         }
//       );
//       setCartItems(cartItems.map((c) => (c._id === updatedCart._id ? response.data : c)));
//     } catch (error) {
//       console.error("Error updating cart:", error);
//     }
//   };

//   const handleMinusUpdateCart = async (updatedCart: CartItem) => {
//     try {
//       const newQuantity = updatedCart.quantity - 1;

//       if (newQuantity <= 0) {
//         await axios.delete(`http://localhost:3000/api/cart/deletefromcart/${updatedCart._id}`);
//         setCartItems(cartItems.filter((c) => c._id !== updatedCart._id));
//       } else {
//         const response = await axios.put(
//           `http://localhost:3000/api/cart/updatecart/${updatedCart._id}`,
//           {
//             quantity: newQuantity,
//           }
//         );
//         setCartItems(cartItems.map((c) => (c._id === updatedCart._id ? response.data : c)));
//       }
//     } catch (error) {
//       console.error("Error updating cart:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <NavBar />
//       <h1 className="text-2xl px-4 py-5 font-bold text-gray-800 text-center mb-8 mt-10">Shopping Cart</h1>
//       <div className="container mx-auto px-4">
//         {cartItems.length === 0 ? (
//           <div className="bg-white rounded-lg p-6 mb-8 text-center">
//             <p className="text-gray-500 text-xl">Your cart is empty.</p>
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg p-6 mb-8">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Product</TableHead>
//                   <TableHead>Attributes</TableHead>
//                   <TableHead>Quantity</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {cartItems.map((item) => (
//                   <TableRow key={item._id}>
//                     <TableCell className="font-medium">{item.productId.REF}</TableCell>
//                     <TableCell>
//                       {item.attributes.map((attr) => (
//                         <p key={attr.key} className="text-sm">
//                           <strong>{attr.key}:</strong> {attr.value}
//                         </p>
//                       ))}
//                     </TableCell>
//                     <TableCell className="font-medium">{item.quantity}</TableCell>
//                     <TableCell>
//                       <div className="flex space-x-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleAddUpdateCart(item)}
//                         >
//                           <PlusCircle className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleMinusUpdateCart(item)}
//                         >
//                           <MinusCircle className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-center">
//               <div className="flex items-center text-center justify-center md:justify-end w-full md:w-auto">
//                 <Button
//                   onClick={() => {
//                     navigate("/Order");
//                   }}
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-3 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
//                 >
//                   Proceed to Ordering
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MinusCircle, PlusCircle } from "lucide-react";
import NavBar from "@/components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Attribute = {
  key: string;
  value: any;
};

type CartItem = {
  _id: string;
  quantity: number;
  productId: {
    REF: string;
    price: number;
    attributes: Attribute[];
    subcategoryID: {
      name: string;
    };
  };
};

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/cart/getcart");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const calculateTotalPrice = (items: CartItem[]) => {
    const total = items.reduce(
      (sum, item) => sum + item.quantity * (item.productId?.price || 0),
      0
    );
    setTotalPrice(total);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    calculateTotalPrice(cartItems);
  }, [cartItems]);

  const handleAddUpdateCart = async (updatedCart: CartItem) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/cart/updatecart/${updatedCart._id}`,
        { quantity: updatedCart.quantity + 1 }
      );
      const updatedItem = {
        ...updatedCart,
        quantity: response.data.quantity, // Only update the quantity
      };
      const updatedCartItems = cartItems.map((c) =>
        c._id === updatedCart._id ? updatedItem : c
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleMinusUpdateCart = async (updatedCart: CartItem) => {
    try {
      const newQuantity = updatedCart.quantity - 1;

      if (newQuantity <= 0) {
        await axios.delete(`http://localhost:3000/api/cart/deletefromcart/${updatedCart._id}`);
        setCartItems(cartItems.filter((c) => c._id !== updatedCart._id));
      } else {
        const response = await axios.put(
          `http://localhost:3000/api/cart/updatecart/${updatedCart._id}`,
          { quantity: newQuantity }
        );
        const updatedItem = {
          ...updatedCart,
          quantity: response.data.quantity, // Only update the quantity
        };
        const updatedCartItems = cartItems.map((c) =>
          c._id === updatedCart._id ? updatedItem : c
        );
        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <h1 className="text-2xl px-4 py-5 font-bold text-gray-800 text-center mb-8 mt-10">Shopping Cart</h1>
      <div className="container mx-auto px-4">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg p-6 mb-8 text-center">
            <p className="text-gray-500 text-xl">Your cart is empty.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 mb-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Attributes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.productId?.REF || "N/A"}</TableCell>
                    <TableCell>{item.productId?.subcategoryID?.name || "N/A"}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {item.productId?.price ? `MAD ${(item.productId.price * item.quantity).toFixed(2)}` : "N/A"}
                    </TableCell>
                    <TableCell>
                      {item.productId?.attributes?.length > 0 ? (
                        <ul>
                          {item.productId.attributes.map((attr, index) => (
                            <li key={index}>
                              <strong>{attr.key}:</strong> {attr.value}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button onClick={() => handleAddUpdateCart(item)}>
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => handleMinusUpdateCart(item)}>
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="text-right mt-6">
              <h2 className="text-lg font-bold">
                Total Price: <span className="text-blue-600">MAD {totalPrice.toFixed(2)}</span>
              </h2>
            </div>
            <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-center">
              <div className="flex items-center text-center justify-center md:justify-end w-full md:w-auto">
                <Button
                  onClick={() => navigate("/Order")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-3 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Proceed to Ordering
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
