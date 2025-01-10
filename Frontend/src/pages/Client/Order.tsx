"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, CreditCard, CheckCircle } from "lucide-react";
import NavBar from "@/components/NavBar";

type CartItem = {
  productId: {
    REF: string;
    price: number;
    attributes: { key: string; value: any }[];
    subcategoryID: { name: string };
  };
  quantity: number;
};

type UserDetails = {
  phone: string;
  city: string;
  address: string;
  postalCode: string;
  country: string;
};

export default function InvoiceOrderPage() {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    phone: "",
    city: "",
    address: "",
    postalCode: "",
    country: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/cart/getcart");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true); 
    try {
      const orderData = {
        userDetails: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.primaryEmailAddress?.emailAddress,
          userId: user?.id,
          ...userDetails,
        },
        cartItems,
      };

      console.log("Order data being sent:", orderData);

      const response = await axios.post("http://localhost:3000/api/order/addorder", orderData);

      console.log("Order response:", response.data.message);

     
      setCartItems([]);
      await axios.delete("http://localhost:3000/api/cart/clearcart", {
        data: { userId: user?.id },
      });

     
      fetchCart();

      setOrderSuccess(true);

      await axios.post("http://localhost:3000/api/mail/confirmation", {
        toEmail: orderData.userDetails.email, 
      });
      alert("Order has been placed and confirmation email sent.");
    } catch (error) {
      console.error("Error placing order:", error);
      if (axios.isAxiosError(error)) {
        console.log("Axios error details:", error.response?.data);
      }
      alert("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-5xl mx-auto">
          {orderSuccess ? (
            <div className="text-center py-90">
              <Card className="bg-green-100 border border-green-300 shadow-md">
                <CardHeader className="flex flex-col items-center">
                  <CheckCircle className="text-green-600 w-16 h-16 mb-4" />
                  <CardTitle className="text-3xl font-extrabold text-green-600 mb-2">
                    Order Placed Successfully!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-gray-700 mb-4">
                    Thank you, <span className="font-bold">{user?.firstName}</span>. Your order has
                    been placed and will be processed shortly. You will receive an email with
                    confirmation details.
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-3xl font-bold">Invoice Order</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={user?.firstName || ""}
                        readOnly
                        className="bg-gray-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={user?.lastName || ""}
                        readOnly
                        className="bg-gray-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={user?.primaryEmailAddress?.emailAddress || ""}
                        readOnly
                        className="bg-gray-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={userDetails.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={userDetails.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={userDetails.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={userDetails.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={userDetails.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </form>
                <Separator className="my-8" />
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold flex items-center">
                    <ShoppingCart className="mr-2" />
                    Cart Items
                  </h2>
                  {cartItems.length > 0 ? (
                    <ul className="space-y-2">
                      {cartItems.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center py-2 border-b"
                        >
                          <span className="flex flex-col">
                            <strong>Reference:</strong> {item.productId.REF}
                            <strong>Subcategory:</strong> {item.productId.subcategoryID.name}
                            <strong>Price:</strong> MAD {item.productId.price.toFixed(2)}
                            <strong>Attributes:</strong>
                            <ul>
                              {item.productId.attributes.map((attr, i) => (
                                <li key={i}>
                                  {attr.key}: {attr.value}
                                </li>
                              ))}
                            </ul>
                          </span>
                          <span className="font-semibold">Qty: {item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">No items in the cart.</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handlePlaceOrder}
                  className="w-full"
                  disabled={isLoading || cartItems.length === 0}
                >
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <CreditCard className="mr-2" />
                      Place Order
                    </>
                  )}
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </main>
    </div>
  );
}
