const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const cors = require('cors');
const ConnectDB = require('./Db/Db');
const router = require('./Router/userRouter');
const listingrouter = require('./Router/listing');
const Booking = require('./Router/booking');
const Feedback = require('./Router/feedback');

const corsOptions = {
    origin: 'http://localhost:3000',
    method:"GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true,
    
};

app.use(cors(corsOptions));
ConnectDB();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.get("/",(req, res)=>{
    res.send("hello world");
})
app.use("/user",router);
app.use("/properties",listingrouter);
app.use("/bookings",Booking);
app.use("/feedback",Feedback);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);

})