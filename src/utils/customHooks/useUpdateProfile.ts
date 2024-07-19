import { useState } from 'react';

import localforage from 'localforage';
import { newUser } from '../interface/types';
import { fetchData } from './fetchData';

const useUpdateProfile = () => {
  const [error, setError] = useState<string | null>(null);


  // Function to update user's name
  const updateName = async (updatedName: string) => {
    try {
      // Fetch current user data
      const currentUser: newUser | null = fetchData();

      if (currentUser) {
        // Retrieve saved users from localforage
        const savedUsers: newUser[] = (await localforage.getItem<newUser[]>('User')) || [];

        // Find the user to update by email
        const existingUser = savedUsers.find((dbUser) => dbUser?.user?.email === currentUser?.user.email);

        if (existingUser) {
          // Update the name in session storage
          currentUser.user.name = updatedName;
          sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
          //  console.log(`updateusername`)
          // Update the name in localforage
          existingUser.user.name = updatedName;
          await localforage.setItem('User', savedUsers);

          // Navigate or perform any other actions after successful update
          //   navigate('/profile'); // Example navigation to profile page
            return fetchData();
        } else {
          throw new Error('User not found');
        }


      } else {
        throw new Error('Current user not available');
      }
    } catch (error) {
      if (error instanceof Error) {

        setError(error.message);
        console.error('Error during name update:', error);
        throw error; // Propagate error for handling in components
      }
    }
  };
  const updatePassword = async (updatepassword: string, oldpassword: string) => {
    try {
      // Fetch current user data
      const currentUser: newUser | null = fetchData(); // Adjust based on fetchData implementation

      if (currentUser) {
        // Retrieve saved users from localforage
        const savedUsers: newUser[] = (await localforage.getItem<newUser[]>('User')) || [];

        // Find the user to update by email
        const existingUser = savedUsers.find((dbUser) => dbUser?.user?.email === currentUser?.user.email);

        if (existingUser) {
          // Update the name in session storage
          if (currentUser.user.password === oldpassword) {


            currentUser.user.password = updatepassword;
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            console.log(`updateusername`)
            // Update the name in localforage
            existingUser.user.password = updatepassword;
            await localforage.setItem('User', savedUsers);
          }
          else {
            throw new Error(`old Password Not Match`);
          }

        } else {
          throw new Error('User not found');
        }
      } else {
        throw new Error('Current user not available');
      }
    } catch (error) {
      if (error instanceof Error) {

        setError(error.message);
        console.error('Error during name update:', error);
        throw error; // Propagate error for handling in components
      }
    }
  };

  return { updateName, error, updatePassword };
};

export default useUpdateProfile;
