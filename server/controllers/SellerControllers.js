import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SELLER_EMAIL = process.env.SELLER_EMAIL;
const SELLER_PASSWORD = process.env.SELLER_PASSWORD;

// Login Seller : /api/seller/login
export const loginSeller = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("ENV EMAIL:", SELLER_EMAIL);
        console.log("ENV PASSWORD:", SELLER_PASSWORD);
        if (!email || !password) {
            return res.json({ success: false, message: "Email and password are required" });
        }

        // Check against hardcoded credentials
        if (email !== SELLER_EMAIL || password !== SELLER_PASSWORD) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('seller_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            success: true,
            seller: { email }
        });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Check Seller Auth : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        const token = req.cookies.seller_token;
        if (!token) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.json({ success: true, seller: { email: decoded.email } });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Logout Seller : /api/seller/logout
export const logoutSeller = async (req, res) => {
    try {
        res.clearCookie('seller_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: "Seller Logged Out" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
