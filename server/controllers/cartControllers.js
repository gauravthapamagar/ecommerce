//update user cartdata

import User from "../models/User"

export const updateCart = async (req, res) => {
    try {
        const {userId, cartItems} = req.body
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({
            success: true,
            message: "Cart Updated"
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            success: false, 
            message: error.message
        })
    }
productRouter.post('/add', upload.array([images]), authSeller, addProduct)
}