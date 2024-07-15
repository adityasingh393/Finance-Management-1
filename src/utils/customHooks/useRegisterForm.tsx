import localforage from 'localforage';
import { newUser } from '../interface/types';

 const useRegister = async (newUser: newUser) => {
    try {
        const savedUsers = (await localforage.getItem<newUser[]>('User')) || [];
        const updatedUsers = [...savedUsers, newUser];
        const existingUser = savedUsers.find((dbUser) => dbUser?.user?.email === newUser?.user?.email);
        // console.log(newUser.user.email);
        // return ;
        if (existingUser) {
            throw new Error(`User already exists. Please login.`);
        } else {
            await localforage.setItem('User', updatedUsers);
            console.log(`create succfully`)
        }
    } catch (error) {
        console.error('Error during registration:', error);
        throw error; // Ensure error is propagated correctly
    }
};
export default useRegister;