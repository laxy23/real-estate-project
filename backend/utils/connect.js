const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDb`);
    } catch (error) {
        console.log(`Error : ${error.message}`);
        process.exit(1);
    }
};

module.exports = connect