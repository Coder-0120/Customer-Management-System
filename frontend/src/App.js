import './App.css';
import Navbar from './Components/Navbar';
import LandingPage from './Pages/LandingPage';
import OwnerDashboard from './Pages/OwnerDashboard';
import RegisterCustomer from './Pages/RegisterCustomer';
import CustomerDashboard from "./Pages/CustomerDashboard";
import Payment from './Pages/Payment';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import ProofSection from './Pages/ProofSection';
import CustNotifications from './Pages/CustNotifications';
import Login from './Pages/Login';
import ScrolltoTop from './Components/ScrolltoTop';
import GoldRatePage from './Pages/GoldRatePage';

const CustomerProtectedRoute = ({ children }) => {

  const isLoggedIn = localStorage.getItem("CustomerDetails"); 
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const OwnerProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("OwnerDetails"); 
  return isLoggedIn ? children : <Navigate to="/ownerLogin" />;
};

function App() {
  return (
    <Router>
      <ScrolltoTop>
              </ScrolltoTop>


      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/register" element={<OwnerProtectedRoute><RegisterCustomer/></OwnerProtectedRoute>} />
        <Route path="/owner-dashboard" element={<OwnerProtectedRoute><OwnerDashboard/></OwnerProtectedRoute>} />
        <Route path="/proof-section" element={<OwnerProtectedRoute><ProofSection/></OwnerProtectedRoute>} />
        <Route path="/customer-dashboard" element={<CustomerProtectedRoute><CustomerDashboard/></CustomerProtectedRoute>}/>
        <Route path="/customer-notifications" element={<CustomerProtectedRoute><CustNotifications/></CustomerProtectedRoute>}/>
        <Route path="/payment" element={<CustomerProtectedRoute><Payment/></CustomerProtectedRoute>}/>
        <Route path="/gold-rate" element={<CustomerProtectedRoute><GoldRatePage/></CustomerProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
