const mongoose = require("mongoose");
require('dotenv').config();
//define the MongoDB connection URL
// const mongoURL = 'mongodb://localhost:27017/myDatabase';
const mongoURL= process.env.DB_URL;
mongoose.connect(mongoURL);
const db = mongoose.connection;
db.on('connected',()=>{
    console.log("connected to MongoDB server");
});
db.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});
db.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
});
module.exports = db;
