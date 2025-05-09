import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    const { seller_token } = req.cookies;

    if (!seller_token) {
        return res.json({
            success: false,
            message: "Seller not authorized"
        });
    }

    try {
        const decoded = jwt.verify(seller_token, process.env.JWT_SECRET);

        if (decoded.id) {
            req.body = req.body || {};
            req.body.sellerId = decoded.id;
            next();
        } else {
            return res.json({
                success: false,
                message: "Seller not authorized"
            });
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export default authSeller;
