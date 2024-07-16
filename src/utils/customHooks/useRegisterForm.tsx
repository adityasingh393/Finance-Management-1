import { useState } from 'react';
import localforage from 'localforage';
import { newUser } from '../interface/types';

const useRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const register = async (newUser: newUser) => {
    try {
      const savedUsers = (await localforage.getItem<newUser[]>('User')) || [];
      const existingUser = savedUsers.find((dbUser) => dbUser?.user?.email === newUser?.user?.email);

      if (existingUser) {
        throw new Error('User already exists. Please login.');
      } else {
        const updatedUsers = [...savedUsers, newUser];
        await localforage.setItem('User', updatedUsers);
        setSuccess(true);
        console.log('User created successfully');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error('Error during registration:', error);
        throw error;
      }
    }
  };

  return { register, error, success };
};

export default useRegister;
