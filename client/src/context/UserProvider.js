import {createContext, useContext, useState} from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    return (
        <AuthContext.Provider value={{ isLoading,setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};