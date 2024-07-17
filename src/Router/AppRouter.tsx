import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Here from '../pages/Landing/Hero';
import Dashboard from '../pages/Dashboard/Dashboard';
import Register from '../pages/User/Register';
import Login from '../pages/User/Login';
import ProfilePage from '../pages/Profile/Profile';
import { TransHistoryDetails } from '../pages/Dashboard/TransactionsDetails';
import Income from '../pages/Income';
import Expense from '../pages/Expense';
import BudgetPage from '../pages/Budget';
import Navbar from '../components/common/Navbar';



const AppRouter = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Here />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transcation-details" element={<TransHistoryDetails />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/profile-page" element={<ProfilePage />} />
      <Route path="/income" element={<Income />} />
      <Route path="/expense" element={<Expense />} />
      <Route path="/budget" element={<BudgetPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
