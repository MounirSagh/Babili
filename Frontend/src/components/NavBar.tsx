import { Link } from 'react-router-dom';
import { SignedIn, SignedOut  , UserButton } from '@clerk/clerk-react'
import { ShoppingCart } from 'lucide-react';



const NavBar = () => {
  return (
    <nav className="flex items-center justify-between h-16 px-6 shadow-md border-b bg-white">
      <Link to="/" className="flex items-center gap-4">
        <img src="src/assets/LOGO-Babili-3.png" alt="NeoCode Logo" className="w-24 h-auto" />     
      </Link>
      {/* <div className="flex items-center gap-6 text-gray-600 font-serif text-sm">
        <Link to="/" className="hover:text-blue-500 transition-colors duration-300">
          Home
        </Link>
        <Link to="/Cart" className="hover:text-blue-500 transition-colors duration-300">
          Cart
        </Link>
        <Link to="/Details" className="hover:text-blue-500 transition-colors duration-300">
          Details
        </Link>
        <Link to="/Order" className="hover:text-blue-500 transition-colors duration-300">
          Order
        </Link>
      </div> */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <Link to="/SignIn" className="px-4 py-2 text-sm font-serif text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300">
            Sign In
          </Link>
          <Link to="/SignUp" className="px-4 py-2 text-sm font-serif text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition duration-300">
            Sign Up
          </Link>
        </SignedOut>
        <SignedIn>
          
          <UserButton />
          <Link to="/Cart" className="hover:text-blue-500 transition-colors duration-300">
            <ShoppingCart />
          </Link>
        </SignedIn>
        
      </div>
    </nav>
  );
};

export default NavBar;