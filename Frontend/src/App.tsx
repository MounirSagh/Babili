import { Route, Routes } from 'react-router-dom';
import Home from '../src/pages/Home';
import Cart from '../src/pages/Cart';
import Order from './pages/Admin/Sales';
import Details from '../src/pages/Details';
import SignIn from '../src/pages/Sign-In';
import SignUp from '../src/pages/Sign-Up';
import NotFound from '../src/pages/NotFound'; 
import Dashbord from './pages/Admin/Dashbord';
import Products from './pages/Admin/Product';
import Categories from './pages/Admin/Categories';
import Sales from './pages/Admin/Sales';
import SalesAnalytics from './pages/Admin/SalesAnalytics';
import Subcategories from './pages/Admin/SubCategories';
import Notifications from './pages/Admin/Notifications';


export default function App() {
  return (
    <div className="h-screen w-full flex">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Order" element={<Order />} />
          <Route path="/Details" element={<Details />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          {/* Admin Side */}
          <Route path="/Admin/Dashboard" element={<Dashbord />} />
          <Route path="/Admin/Products" element={<Products />} />
          <Route path="/Admin/Categories" element={<Categories />} />
          <Route path="/Admin/Sales" element={<Sales />} />
          <Route path="/Admin/Subcategories" element={<Subcategories />} />
          <Route path="/Admin/Sales-Analytics" element={<SalesAnalytics />} />
          <Route path="/Admin/Notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </div>
    </div>
  );
}