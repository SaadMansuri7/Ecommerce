import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const savedToken = localStorage.getItem('token');
    const [token, setToken] = useState(savedToken);
    const [isAuthenticated, setIsAuthenticated] = useState(!!savedToken);

    function loginContext(jwtToken) {
        localStorage.setItem('token', jwtToken);
        setToken(jwtToken);
        console.log('logged in, token set in context');
        setIsAuthenticated(true);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
    <AuthContext.Provider value={{ loginContext, logout, token, isAuthenticated }}>
        {children}
    </AuthContext.Provider>)
}

// export function useAuthContext() {
//     let context = useContext(AuthContext);
//     if (!context) {
//         console.log('can only be used inside the auth contex!');
//     }
//     return context;
// }