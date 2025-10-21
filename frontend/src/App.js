import './App.css';
import Navbar from './Components/Navbar';
import LandingPage from './Pages/LandingPage';
import Custlogin from './Pages/Custlogin';
import Ownerlogin from './Pages/Ownerlogin';
import OwnerDashboard from './Pages/OwnerDashboard';
import RegisterCustomer from './Pages/RegisterCustomer';
import CustomerDashboard from "./Pages/CustomerDashboard";
import Payment from './Pages/Payment';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

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
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Custlogin />} />
        <Route path="/register" element={<OwnerProtectedRoute><RegisterCustomer/></OwnerProtectedRoute>} />
        <Route path="/ownerLogin" element={<Ownerlogin />} /> 
        <Route path="/owner-dashboard" element={<OwnerProtectedRoute><OwnerDashboard/></OwnerProtectedRoute>} />
        <Route path="/customer-dashboard" element={<CustomerProtectedRoute><CustomerDashboard/></CustomerProtectedRoute>}/>
        <Route path="/payment" element={<CustomerProtectedRoute><Payment/></CustomerProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
