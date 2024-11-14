
import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(400).json({ success: false, error: "Token not provided" })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decodedToken) {
            return res.status(400).json({ success: false, error: "Token not valid" })
        }

        const user = await User.findById({ _id: decodedToken._id }).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" })
        }

        req.user = user;
        // req.token = token;
        next();

    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server error' })
    }
}


