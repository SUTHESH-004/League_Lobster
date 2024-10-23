const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOURL)
//  || "mongodb://localhost:27017/")

const connection = mongoose.connection;

connection.on('connected',()=>
{
	console.log('DB Conected')
})

connection.on('error',()=>{ 
	console.log('Error')
})

module.exports = mongoose