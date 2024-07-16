import { newUser } from "../interface/types";

export const fetchData = (): newUser | null => {
    const userString = sessionStorage.getItem('currentUser');
    
    if (userString) {
      try {
        const userData: newUser = JSON.parse(userString);
        // console.log(userData,"userdata")
        return userData;
        
      } catch (error) {
        console.error('Error parsing user data from sessionStorage:', error);
        return null;
      }
    } else {
      return null;
    }
  };
  
  