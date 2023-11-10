import dotenv from 'dotenv';
import connectDB from './config/db.js'; 
import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import products from './data/products.js';
import users from './data/user.js';
dotenv.config();
connectDB();

const importData = async () => {
    console.log('inside import data');
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createUsers = await User.insertMany(users);
        const adminUser = createUsers[0]._id;
        const sampleProduct = products.map((product) => {
            return {...product, user: adminUser}
        }); 
        await Product.insertMany(sampleProduct);
        console.log('data is imported');
        process.exit();
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('data is destroyed');
        process.exit();
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}

if(process.argv === '-d')
{
    destroyData();
}
else {
    importData();
}