import Order from '../models/orderModel.js';

const addOrderItems = async (req,res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;
    if(orderItems && orderItems.length === 0){
        res.status(400);
    } else {
        const order = new Order({
            orderItems: orderItems.map(x => ({
                ...x,
                product: x._id,
                _id: undefined
            }))
        })
        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }
}

const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id});
    res.status(200).json(orders);
}

const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if(order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
}


export default {
    addOrderItems, 
    getMyOrders, 
    getOrderById

};