const mongoose = require('mongoose');
const {Schema} = mongoose;

//Este es el formato qeu van a tener mis datos en al bd
const TaskSchema = new Schema({

	title: {type: String, required: true},
	description:{type: String, required:true}

});

//Esto se hace para que se pueda reutilizar el schema definido ahi arriba.
module.exports = mongoose.model('Task',TaskSchema);



