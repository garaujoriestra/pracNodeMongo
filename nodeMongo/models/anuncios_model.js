'use strict';

//conectar con mongoose
let mongoose = require('mongoose');

//Creo el esquema
let anuncioSchema = mongoose.Schema({
	nombre: String,
	venta: Boolean,
	precio: Number,
	foto: String,
	tag: [String]
});
//Lista de los Anuncios
anuncioSchema.statics.list = function(filtroBusqueda,precio,nombre,sort,start,limit,cb){
	//Comprobación si recibimos el parametro precio.
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
	
	let query = Anuncio.find(filtroBusqueda);  //Hacemos la búsqueda de los anuncios con los filtros introducidos.
	if(typeof sort != "undefined")
		query.sort(sort);
	if(typeof start != "undefined")
		query.skip(parseInt(start));
	if(typeof limit != "undefined")
		query.limit(parseInt(limit));

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
let Anuncio = mongoose.model("Anuncio", anuncioSchema);	