import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secretKey';

export const authMiddlewere = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized Access, No token provided!' });
    }

    const token = authHeader.split(" ")[1];

    try {
        let decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = {
            id: decodedToken.id,
            email: decodedToken.email,
        };
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" , error: error.message });
    }
}