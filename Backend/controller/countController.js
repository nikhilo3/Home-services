const User = require('../models/regiModel');
const Order = require('../models/orderModel');

const getUserCount = async () => {
    const count = await User.countDocuments({});
    console.log("user in countcontroller", count);
    return count;
}

const getOrderCount = async () => {
    const count = await Order.countDocuments({});
    console.log("order in countcontroller", count);
    return count;
}

const getPaymentCount = async () => {
    const orders = await Order.find().exec();


    // Convert paytotal to numbers in the first step
    const modifiedOrders = orders.map(order => ({
        paytotal: parseFloat(order.paytotal.replace('₹', '')),

    }));

    console.log(modifiedOrders);

    let totalrevenue = 0;
    modifiedOrders.forEach((item)=>{
        totalrevenue += item.paytotal;
        console.log(item.paytotal);
        return item.paytotal
    });

    console.log("total revenue = ",totalrevenue);
    return totalrevenue
}


module.exports = { getUserCount, getOrderCount, getPaymentCount };