const mongoose = require('mongoose');
// const { link } = require('../routes/ProjectRoute');

const projectschema = new mongoose.Schema({
	title :{
		type : String,
		required:true,
	},
	desc:{
		type : String,
		required :true,
	},
	img:{
		type : String,
		required : true,
	},
	link:{
		type : String,
		required : false,
	},
	git:{
		type : String,
		required : true,
	}
})

const Projects = mongoose.model("Projects",projectschema)

module.exports = Projects;