const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
       await mongoose.connect('mongodb://host.docker.internal:27017/Product-hunt');
        console.log('****** Connection done **********');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

module.exports = dbConnect;