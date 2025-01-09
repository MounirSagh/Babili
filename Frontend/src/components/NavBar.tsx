import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { ShoppingCart, ShoppingBag } from "lucide-react";

const NavBar = () => {
  const location = useLocation(); // Get the current URL path

  return (
    <nav className="flex items-center justify-between h-16 px-6 shadow-md border-b bg-white">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-4">
        <img
          src="src/assets/LOGO-Babili-3.png"
          alt="NeoCode Logo"
          className="w-24 h-auto"
        />
      </Link>

      {/* Order History (Visible only on Home Page and for Signed-In Users) */}
      {location.pathname === "/" && (
        <SignedIn>
          <Link
            to="/order-history"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            <ShoppingBag className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Order History</span>
          </Link>
        </SignedIn>
      )}

      {/* Authentication and Cart */}
      <div className="flex items-center gap-4">
        {/* Signed Out Links */}
        <SignedOut>
          <Link
            to="/SignIn"
            className="px-4 py-2 text-sm font-serif text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </Link>
          <Link
            to="/SignUp"
            className="px-4 py-2 text-sm font-serif text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Sign Up
          </Link>
        </SignedOut>

        {/* Signed In Links */}
        <SignedIn>
          <UserButton />
          <Link
            to="/Cart"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            <ShoppingCart />
          </Link>
        </SignedIn>
      </div>
    </nav>
  );
};

export default NavBar;
