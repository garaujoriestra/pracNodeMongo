'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Anuncio = mongoose.model("Anuncio");
function rellenarFiltroBusqueda(req){
	let filtroBusqueda = {};
	console.log("objeto: ", filtroBusqueda);
	if(req.query.venta)
		filtroBusqueda.venta = req.query.venta;
	if(req.query.foto)
		filtroBusqueda.foto = req.query.foto;
	if(req.query.tag)
		filtroBusqueda.tag = req.query.tag;
	return filtroBusqueda;
}
router.post("/", function(req, res){
	let anuncio = new Anuncio(req.body);	
	anuncio.save(function (err, newRow) {
		if (err){
			res.json({result: false, err: err});
			return;
		}
		//Devuelvo los datos en vez de a vista, a un json
		res.json({result: true, rows: newRow});
		return;
	});
});
router.get("/", function(req,res){
	let filtroBusqueda = rellenarFiltroBusqueda(req);
	let precio,nombre,sort,start,limit;
	if(req.query.precio)
		precio = req.query.precio;
	if(req.query.nombre)
		nombre = new RegExp("^" + req.query.nombre, "i");
	if(req.query.sort)
		sort = req.query.sort;
	if(req.query.start)
		start = req.query.start;
	if(req.query.limit)
		start = req.query.limit;
	Anuncio.list(filtroBusqueda,precio,nombre,sort,start,limit,function(err,rows){
		if(err){
			res.json({result: false, err: err});
			return;
		}
		//Devuelvo los datos en vez de a vista, a un json
		res.json({result: true, rows: rows});
		return;
	});
});
module.exports = router;

