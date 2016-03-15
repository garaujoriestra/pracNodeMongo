'use strict';

//conectar con mongoose
//var conn = require("../lib/connectMongoose");
var mongoose = require('mongoose');

//Creo el esquema
var usuarioSchema = mongoose.Schema({
 nombre: String,
 email: String,
 clave: String
});


usuarioSchema.statics.list = function(cb){
	//preparamos la query sin ejecutarlo (no ponemo callback a find)
	var query = User.find();

	//añadimos mas parametros a la query
	query.sort("nombre");	

	//La ejecutamos
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
var User = mongoose.model("User", usuarioSchema);	