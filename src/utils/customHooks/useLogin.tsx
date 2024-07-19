import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import localforage from 'localforage';
import { LoginFormInput, newUser } from '../interface/types';

const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (loginUser: LoginFormInput) => {
    try {
      const savedUsers = (await localforage.getItem<newUser[]>('User')) || [];

      const existingUser = savedUsers.find((dbUser) => dbUser?.user?.email === loginUser?.email);

      if (existingUser) {
        if (existingUser?.user.password !== loginUser.password) {
          throw new Error('Credentials not Match');
        }

        // Convert existingUser to string format using JSON.stringify()
        const userString = JSON.stringify(existingUser);

        // Store the serialized user string in sessionStorage
        sessionStorage.setItem('currentUser', userString);

        // Navigate to the desired page after login, e.g., dashboard
        navigate('/dashboard');

        return existingUser;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
        if(error instanceof Error){
            setError(error.message);
            console.error('Error during Login:', error);
            throw error; 
        }
      // Ensure error is propagated correctly
    }
  };

  return { login, error };
};

export default useLogin;
