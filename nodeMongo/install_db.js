"use strict";
var express = require('express');
var router = express.Router();
require("./models/anuncios_model.js");
var mongoose = require("mongoose");
var Anuncio = mongoose.model("Anuncio");

//Cargar libreria
var fs = require("fs");

function LimpiarDB(){
	Anuncio.remove(function() {
		console.log("eliminados");
	});
}
function InsertarAnuncios(anunciosObjeto){
	for (var i = 0; i < anunciosObjeto.length ; i++) {
		var anuncio = new Anuncio(anunciosObjeto[i]);
		anuncio.save(function (err, newRow) {
			console.log('anuncio creado:  ' + newRow);
		});
	};
}
var leerDB = function(precarga, callbackNuestro){
	console.log("precarga","./"+precarga);
	fs.readFile("./"+precarga,function(err,data){
		if (err){
			callbackNuestro(err);
			return;
		}
		//Borro la base de datos la primera que lanzo la app
		LimpiarDB();
		//Obtengo del archivo los anuncios de muestra
		var anuncios = JSON.parse(data);
		var anunciosObjeto = anuncios["anuncios"];
		InsertarAnuncios(anunciosObjeto);
		callbackNuestro(null,anunciosObjeto);
	});
};
leerDB( "anunciosInicio.js", function(err, str){
	if (err){
		console.error("Hubo un error: ", err);
		return;	
	}
});
