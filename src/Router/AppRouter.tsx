// src/router/AppRouter.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Here from '../pages/Landing/Hero';


const AppRouter = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Here />} />
            <Route path="/login" element={<Here/>} />
           
        </Routes>
    </Router>
);

export default AppRouter;
