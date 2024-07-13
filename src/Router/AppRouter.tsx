// src/router/AppRouter.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Here from '../pages/Landing/Hero';
import Dashboard from '../pages/Dashboard/Dashboard';
import Register from '../pages/User/Register';
import Login from '../pages/User/Login';


const AppRouter = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Here />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path='/income'  />
        </Routes>
    </Router>
);

export default AppRouter;
