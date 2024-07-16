export const useLogout = () => {
    sessionStorage.removeItem('currentUser');
    sessionStorage.clear();
}


