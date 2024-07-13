import { newUser } from "../interface/types";

const getCurrentUser = (): newUser | null => {
    const userString = sessionStorage.getItem('currentUser');
    
    if (userString) {
      try {
        const user: newUser = JSON.parse(userString);
        return user;
      } catch (error) {
        console.error('Error parsing user data from sessionStorage:', error);
        return null;
      }
    } else {
      return null;
    }
  };
  
  export default getCurrentUser