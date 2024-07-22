import AppRouter from './Router/AppRouter';
import { ToastContainer } from 'react-toastify';

const App = () => {
  

    return (
        
          <>
            <ToastContainer position="top-center" autoClose={3000} />
            <AppRouter />
          </>
       
    );
};

export default App;
