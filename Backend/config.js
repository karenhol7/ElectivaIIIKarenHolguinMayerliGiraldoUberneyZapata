const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
       await mongoose.connect('mongodb://127.0.0.1:27017/Product-hunt');
        console.log('****** Connection done **********');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

module.exports = dbConnect;