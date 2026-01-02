import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { authRouter } from './Routes/authRoutes.js';
import { cartRouter } from './Routes/cartRoute.js';

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.mongoUrl || 'mongodb://localhost:27017/ecommerc';

app.use(express.json());
app.use(cors());

mongoose.connect(mongoUrl).then((req, res) => console.log('connected to mongodb')).catch(err => console.error(err));

app.use('/api/auth', authRouter);
app.use('/api/cart', cartRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// mongodb://localhost:27017/ecommerce 