const mongoose = require("mongoose");

let connection;

const connectDb = () => {
    if (!connection) {
        connection = mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log("connection successful");
        }).catch((error) => {
            connection = null; // let the next request retry
            throw error;
        });
    }
    return connection;
};

module.exports = connectDb;
