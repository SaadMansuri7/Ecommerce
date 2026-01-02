import { useContext, useState } from "react";
import { login } from "../services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import { useAuthContext } from "../context/AuthContext";

export const Login = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    let navigate = useNavigate();
    const { loginContext } = useContext(AuthContext);

    function handleChange(e: any) {
        let { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleLogin = async (e: any) => {
        e.preventDefault();
        let res = await login(formData);
        console.log('login : ', res.data);
        loginContext(res.data.token)
        navigate('/productPage');
    }

    return (
        <form onSubmit={handleLogin}>
            <input type="email" name="email" placeholder="Email..." onChange={handleChange} />
            <input type="password" name="password" placeholder="Password..." onChange={handleChange} />

            <button type="submit" name="submit" >Login</button>
            <p> Don't have an account? <Link to="/register">Register</Link> </p>
        </form>
    )
}