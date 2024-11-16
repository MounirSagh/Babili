import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MinusCircle, PlusCircle } from 'lucide-react'
import NavBar from '@/components/NavBar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type CartItem = {
  _id: number
  REF: string;
  Poitrine: string;
  Poids: string;
  Flottabilité: string;
  TYPE: string
  subcategoryID: string
  quantity: number
}

export default function Component() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cart/getcart');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  const handleAddUpdateCart = async (updatedCart: CartItem) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/cart/updatecart/${updatedCart._id}`, {
        quantity: updatedCart.quantity + 1,
      });
      setCartItems(cartItems.map((c) => (c._id === updatedCart._id ? response.data : c)));
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };
  
  const handleMinusUpdateCart = async (updatedCart: CartItem) => {
    try {
      const newQuantity = updatedCart.quantity - 1;
  
      if (newQuantity <= 0) {
        await axios.delete(`http://localhost:5000/api/cart/deletefromcart/${updatedCart._id}`);
        setCartItems(cartItems.filter((c) => c._id !== updatedCart._id));
      } else {
        const response = await axios.put(`http://localhost:5000/api/cart/updatecart/${updatedCart._id}`, {
          quantity: newQuantity,
        });
        setCartItems(cartItems.map((c) => (c._id === updatedCart._id ? response.data : c)));
      }
    } catch (error) {
      console.error('Error updating cart:', error);
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
                  <TableHead className="w-[100px]">Product</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>TYPE</TableHead>
                  <TableHead>Flottabilité</TableHead>
                  <TableHead>Poitrine</TableHead>
                  <TableHead>Poids</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{item.REF}</TableCell>
                    <TableCell className="font-medium">{item.REF}</TableCell>
                    <TableCell className="font-medium">{item.TYPE}</TableCell>
                    <TableCell className="font-medium">{item.Flottabilité}</TableCell>
                    <TableCell className="font-medium">{item.Poitrine}</TableCell>
                    <TableCell className="font-medium">{item.Poids}</TableCell>
                    <TableCell className="font-medium">{item.quantity}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddUpdateCart(item)}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMinusUpdateCart(item)}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-center">

              <div className="flex items-center text-center justify-center md:justify-end w-full md:w-auto">
                <Button onClick={() => navigate('/Order')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-3 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
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