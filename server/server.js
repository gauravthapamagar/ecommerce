import { app } from "./app.js";
import dotenv from 'dotenv'
import connectDB from "./db/db.js";
import connectCloudinary from "./configs/cloudinary.js";

dotenv.config({
    path: './.env'
})

connectDB()
connectCloudinary()
.then(() =>{
    app.listen(process.env.PORT || 8000, () => {
    })
    
})
.catch((error) => {
    console.log("MONGODB connection failed!!!", error);

})