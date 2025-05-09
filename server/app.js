//create express file
import cookieParser from "cookie-parser";
import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes.js";

const app = express(); 
//for port
const port = process.env.PORT || 4000;


//allow multiple origins
const allowedOrigins = ['http://localhost:5173']

//middleware configuration
app.use(express.json()) //all the request coming will be passed through json method
app.use(cookieParser())
app.use(cors({origin: allowedOrigins, credentials: true}))

//this is for route
app.get("/", (req, res) => res.send("API is working"));
app.use('/api/user', userRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
// these all will give output: server is running on ....  It shows that basic express application is successfully working  
export {app};