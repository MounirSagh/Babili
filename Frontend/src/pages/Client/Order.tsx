'use client'

import { useState, useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Package, CreditCard } from 'lucide-react'
import NavBar from "@/components/NavBar"

type CartItem = {
  _id: number
  REF: string
  Poitrine: string
  Poids: string
  Flottabilité: string
  TYPE: string
  subcategoryID: string
  quantity: number
}

type UserDetails = {
  phone: string
  city: string
  address: string
  postalCode: string
  country: string
}

export default function InvoiceOrderPage() {
  const { user } = useUser()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [userDetails, setUserDetails] = useState<UserDetails>({
    phone: "",
    city: "",
    address: "",
    postalCode: "",
    country: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cart/getcart")
      setCartItems(response.data)
    } catch (error) {
      console.error("Error fetching cart:", error)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async () => {
    setIsLoading(true)
    try {
      const orderData = {
        userDetails: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.primaryEmailAddress?.emailAddress,
          ...userDetails,
        },
        cartItems,
      }
      console.log(orderData)
      const response = await axios.post("http://localhost:5000/api/order/addorder", orderData)
      console.log(response)
      alert("Order placed successfully!")
    } catch (error) {
      console.error("Error placing order:", error)
      alert("Failed to place order.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto">
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
                  {cartItems.map((item) => (
                    <li key={item._id} className="flex justify-between items-center py-2 border-b">
                      <span className="flex items-center">
                        <Package className="mr-2" />
                        {item.REF} - {item.TYPE}
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
        </Card>
      </main>
    </div>
  )
}