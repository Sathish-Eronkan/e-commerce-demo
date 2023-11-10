import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
connectDB();
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
const app = express();
const port = process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send('API is running');
})

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser middleware
app.use(cookieParser());
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);

//Error Handler middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port,() => console.log(`server is running on port ${port}`));