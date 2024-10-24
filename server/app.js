require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const dbcon = require('./config/db')
const cors = require('cors');
const authRoute = require('./routes/authRoute');

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;
app.get('/',(req,res)=>{
	res.send("Hello World!");
});

app.use('/auth',authRoute);

app.listen(process.env.PORT,()=>{
	console.log(`Listining in ${port}`)
})
