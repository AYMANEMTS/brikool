import React, {useState} from 'react';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)
    const handleAuthForm = () => setIsLogin(!isLogin)
    return (
        <>
            {isLogin ? <LoginForm handleAuthForm={handleAuthForm} /> : <RegisterForm handleAuthForm={handleAuthForm} />}
        </>
    );
}

export default AuthForm;
