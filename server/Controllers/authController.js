import { User } from "../model/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secretKey';

export const register = async (req, res) => {
    try {
        let { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User Registerd!', user });
    } catch (error) {
        console.error('Error during register: ', error);
        if (error.code === 11000) {
            return res.status(409).json({ message: "User already registered with this email" });
        }
        return res.status(500).json({ message: "Server error" });
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Email not found!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Wrong Password!" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: "User Logged in ", user, token });

    } catch (error) {
        console.error('Error during login: ', error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const profile = async (req, res) => {
    res.json({ userId: req.user.userId });
}