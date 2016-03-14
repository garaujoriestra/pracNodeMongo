'use strict';

//conectar con mongoose
var conn = require("../lib/connectMongoose");
var mongoose = require('mongoose');

//Creo el esquema
var anuncioSchema = mongoose.Schema({
	nombre: String,
	venta: Boolean,
	precio: Number,
	foto: String,
	tags: [String]
});
anuncioSchema.statics.list = function(cb){
	//preparamos la query sin ejecutarlo (no ponemo callback a find)
	var query = Anuncio.find();

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
var Anuncio = mongoose.model("Anuncio", anuncioSchema);	