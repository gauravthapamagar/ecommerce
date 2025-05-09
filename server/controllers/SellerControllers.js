import Seller from "../models/Seller.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register Seller : /api/seller/register
export const registerSeller = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        const existingSeller = await Seller.findOne({ email });
        if (existingSeller) {
            return res.json({ success: false, message: 'Seller already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const seller = await Seller.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

        return res.json({
            success: true,
            seller: { email: seller.email, name: seller.name }
        });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Login Seller : /api/seller/login
export const loginSeller = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "Email and password are required" });
        }

        const seller = await Seller.findOne({ email });
        if (!seller || !(await bcrypt.compare(password, seller.password))) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('seller_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            success: true,
            seller: { email: seller.email, name: seller.name }
        });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Check Seller Auth : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        const { sellerId } = req.body;
        const seller = await Seller.findById(sellerId).select("-password");

        return res.json({ success: true, seller });
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
