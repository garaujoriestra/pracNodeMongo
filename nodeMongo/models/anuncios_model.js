'use strict';

//conectar con mongoose
//var conn = require("../lib/connectMongoose");
var mongoose = require('mongoose');

//Creo el esquema
var anuncioSchema = mongoose.Schema({
	nombre: String,
	venta: Boolean,
	precio: Number,
	foto: String,
	tag: [String]
});
anuncioSchema.statics.list = function(filtroBusqueda,precio,nombre,sort,start,limit,cb){
	//preparamos la query sin ejecutarlo (no ponemo callback a find)
	if (typeof precio != 'undefined'){
		let spliteado = precio.split("-");
		if(spliteado[0] == "")
			filtroBusqueda.precio = { $lt: spliteado[1]};
		else if(spliteado[1] == "")
			filtroBusqueda.precio = { $gt: spliteado[0]};
		else if(spliteado.length === 1)
			filtroBusqueda.precio = spliteado[0];
		else
			filtroBusqueda.precio = { $gt: spliteado[0], $lt: spliteado[1]};
	}
	if(typeof nombre != "undefined")
		filtroBusqueda.nombre = nombre;
	let query = Anuncio.find(filtroBusqueda);
	if(typeof sort != "undefined")
		query.sort(sort);
	if(typeof start != "undefined")
		query.skip(parseInt(start));
	if(typeof limit != "undefined")
		query.limit(parseInt(limit));

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