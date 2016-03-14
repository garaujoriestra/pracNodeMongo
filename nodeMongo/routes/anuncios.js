'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Anuncio = mongoose.model("Anuncio");

router.get('/', function(req, res) {
	Anuncio.list(function(err,rows){
		if(err){
			res.json({result: false, err: err});
			return;
		}
		//Devuelvo los datos en vez de a vista, a un json
		res.json({result: true, rows: rows});
		return;
	});
});

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

module.exports = router;

