import { useState } from "react";
import { register } from "../services/authServices";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    let navigate = useNavigate();

    function handleChange(e: any) {
        let { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleRegister = async (e: any) => {
        try {
            e.preventDefault();
            let res = await register(formData);
            console.log('register : ', res.data);
            navigate('/productPage');
        } catch (error: any) {
            if (error.response?.status === 409) {
                alert('Usr Aready Registerd!');
            }

        }
    }

    return (
        <form onSubmit={handleRegister}>
            <input type="email" name="email" placeholder="Email..." onChange={handleChange} />
            <input type="password" name="password" placeholder="Password..." onChange={handleChange} />

            <button type="submit" name="submit" >Register</button>
            <p> Already have an account? <Link to="/login">Login</Link> </p>
        </form>
    )
}