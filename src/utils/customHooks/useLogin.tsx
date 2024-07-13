import localforage from 'localforage';
import { LoginFormInput, newUser } from '../interface/types';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const useLogin = async (loginUser: LoginFormInput) => {
    // const navigate = useNavigate(); // Use useNavigate hook to get navigation function

    try {
        const savedUsers = (await localforage.getItem<newUser[]>('User')) || [];

        const existingUser = savedUsers.find((dbUser) => dbUser?.user?.email === loginUser?.email);

        if (existingUser) {
            if (existingUser?.user.password !== loginUser.password) {
                throw new Error(`Credentials not Match`)
                return;
            }
            return existingUser;
        } else {
            console.log(`User not found`);
        }
    } catch (error) {
        console.error('Error during Login:', error);
        throw error; // Ensure error is propagated correctly
    }
};

export default useLogin;
