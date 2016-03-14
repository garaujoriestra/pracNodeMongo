'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Anuncio = mongoose.model("Anuncio");

/*router.get('/', function(req, res) {
	Anuncio.list(function(err,rows){
		if(err){
			res.json({result: false, err: err});
			return;
		}
		//Devuelvo los datos en vez de a vista, a un json
		res.json({result: true, rows: rows});
		return;
	});
});*/

router.post("/", function(req, res){
	var anuncio = new Anuncio(req.body);	
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
	var nombre = req.query.nombre || "";
	var venta = req.query.venta  || "";
	var precio = req.query.precio  || "";
	var foto = req.query.foto  || "";
	var tags = req.query.tag  || "";

	if(tags){
		console.log("SIIII TAGSS");
	}
	if(precio){
		console.log("SIIII PRECIOSSSSS");
	}
/*	var spliteado = query.split("&");
	console.log("nombre",query.nombre);
	for (var i = 0; i < spliteado.length; i++) {
		var igualdad = spliteado[i].split("=");
		console.log("["+igualdad[0]+"]");
		if(igualdad[0] == "nombre "){
			console.log("ES NOMBREEE");
		}
	};*/
/*	Anuncio.update({_id: req.params.id}, { $set : req.body },{multi:true}, function(err,data){
		if (err){
			res.json({result: false, err: err});
			return;
		}
		//Devuelvo los datos en vez de a vista, a un json
		res.json({result: true, rows: data});
		return;
	});*/

});
module.exports = router;

