import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Here from '../pages/Landing/Hero';
import Dashboard from '../pages/Dashboard/Dashboard';
import Register from '../pages/User/Register';
import Login from '../pages/User/Login';
import Income from '../pages/Income';
import Expense from '../pages/Expense';
import BudgetPage from '../pages/Budget';

const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "https://via.placeholder.com/150",
  };
  
const AppRouter = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Here />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path='/income' element={<Income />} />
            <Route path='/expense' element={<Expense />} />
            <Route path='/budget' element={<BudgetPage />} />
        </Routes>
    </Router>
);

export default AppRouter;
