"use strict";
var express = require('express');
var router = express.Router();
require("./models/anuncios_model.js");
var mongoose = require("mongoose");
var Anuncio = mongoose.model("Anuncio");
var conn = require("./lib/connectMongoose");
var fs = require("fs");

function LimpiarDB(){
	return new Promise(function(resolve,reject){
		Anuncio.remove({},function(err) {
			if(err){
				reject(console.log("Error al eliminar los anuncios"));
			}
			resolve(console.log("Eliminados satisfactoriamente" ));
		});

	});
}
function InsertarAnuncios(data){
	return new Promise(function(resolve,reject){
		var anuncios = JSON.parse(data);
		var anunciosObjeto = anuncios["anuncios"];
		for (var i = 0; i < anunciosObjeto.length ; i++) {
			var anuncio = new Anuncio(anunciosObjeto[i]);
			anuncio.save(function (err, newRow) {
			});
		};
		resolve(console.log("Insertados correctamente" ));
	});
}
var leerDB = function(){
	fs.readFile("./anunciosInicio.js",function(err,data){
		if (err){
			console.log("Error al leer el fichero");
			return;
		}
		//Usando promesas
		LimpiarDB()
			.then( function(){
				InsertarAnuncios(data);
			})
			.catch(function(err){
				console.log("Error: ", err);
			});
	});
};
leerDB();
