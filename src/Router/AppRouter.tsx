// src/router/AppRouter.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Here from '../pages/Landing/Hero';
import Dashboard from '../pages/Dashboard/Dashboard';


const AppRouter = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Here />} />
            <Route path="/Dashboard" element={<Dashboard/>}/>
            {/* <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> */}
            {/* Add more routes as needed */}
        </Routes>
    </Router>
);

export default AppRouter;
