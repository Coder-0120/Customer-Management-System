import './App.css';
import Navbar from './Components/Navbar';
import LandingPage from './Pages/LandingPage';
import Custlogin from './Pages/Custlogin';
import Ownerlogin from './Pages/Ownerlogin';
import OwnerDashboard from './Pages/OwnerDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterCustomer from './Pages/RegisterCustomer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Custlogin />} />
        <Route path='/register' element={<RegisterCustomer/>}/>
        <Route path="/ownerLogin" element={<Ownerlogin />} /> 
        <Route path='/owner-dashboard' element={<OwnerDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
