'use strict';

//conectar con mongoose
let mongoose = require('mongoose');

//Creo el esquema
let usuarioSchema = mongoose.Schema({
 nombre: String,
 email: String,
 clave: String
});
//Lista para los Usuarios.
usuarioSchema.statics.list = function(cb){
	let query = User.find();
	query.exec(function(err,rows){
		if(err){
			cb(err);
			return;
		}
		cb(null,rows);
		return;
	});
};
//Lo registro en moongose
let User = mongoose.model("User", usuarioSchema);	