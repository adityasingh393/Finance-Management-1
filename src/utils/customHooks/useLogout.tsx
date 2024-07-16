export const useLogout = () => {
    // const { setCurrentUser } = useContext(AuthContext);
  
    const logout = async () => {
      // Remove user from sessionStorage
      sessionStorage.removeItem('currentUser');
      sessionStorage.clear();
  
      // Remove user from localForage
    //   await localForage.removeItem('currentUser');
  
      // Update context
    //   setCurrentUser(null);
    };
  
    return logout;
  };