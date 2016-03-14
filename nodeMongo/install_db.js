"use strict";
var express = require('express');
var router = express.Router();
require("./models/anuncios_model.js");
var mongoose = require("mongoose");
var Anuncio = mongoose.model("Anuncio");



//Cargar libreria
var fs = require("fs");
var leerDB = function(precarga, callbackNuestro){
	console.log("precarga","./"+precarga);
	fs.readFile("./"+precarga,function(err,data){
		if (err){
			callbackNuestro(err);
			return;
		}

		Anuncio.remove(function(err) {
			console.log("eliminados");
		});




		var anuncios = JSON.parse(data);
		console.log("data", data);	
		var anunciosObjeto = anuncios["anuncios"];
		console.log(anunciosObjeto.length);
		for (var i = 0; i < anunciosObjeto.length ; i++) {
			console.log("NOMBRE::", anunciosObjeto[i].tags);
			var anuncio = new Anuncio(anunciosObjeto[i]);
			console.log("anuncio nuevo :  ", anuncio);



			anuncio.save(function (err, newRow) {
 				console.log('anuncio creado:  ' + newRow);
			});
		};
		callbackNuestro(null,anunciosObjeto);
	});
};

leerDB( "anunciosInicio.js", function(err, str){
	if (err){
		console.error("Hubo un error: ", err);
		return;	
	}
	console.log("La version del modulo es : ", str);
});
