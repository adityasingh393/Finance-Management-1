import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Here from '../pages/Landing/Hero';
import Dashboard from '../pages/Dashboard/Dashboard';
import Register from '../pages/User/Register';
import Login from '../pages/User/Login';
import ProfilePage from '../pages/Profile/Profile';

const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "https://via.placeholder.com/150",
  };
  
const AppRouter = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Here />} />

            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            {/* <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> */}
            {/* Add more routes as needed */}
            <Route path="/signup" element={<Register />} /> 
            <Route path="/profile-page" element={<ProfilePage user={user}/>}/>
           <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
);

export default AppRouter;
