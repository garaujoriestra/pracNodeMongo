"use strict";
var express = require('express');
var router = express.Router();
require("./models/anuncios_model.js");
require("./models/user_model.js");
var mongoose = require("mongoose");
var Anuncio = mongoose.model("Anuncio");
var User = mongoose.model("User");
var conn = require("./lib/connectMongoose");
var sha = require("sha256");
var fs = require("fs");
var async = require("async");


//Función para reiniciar toda la base de datos de anuncios. Devuelve una promesa.
function LimpiarDBAnuncios(){
	return new Promise(function(resolve,reject){
		Anuncio.remove({},function(err) {
			if(err){
				reject(console.log("Error al eliminar los anuncios"));
			}
			resolve(console.log("Eliminados satisfactoriamente" ));
		});
	});
}
//Función para reiniciar toda la base de datos de usuarios. Devuelve una promesa.
function LimpiarDBUsuarios(){
	return new Promise(function(resolve,reject){
		User.remove({},function(err) {
			if(err){
				reject(console.log("Error al eliminar los anuncios"));
			}
			resolve(console.log("Eliminados satisfactoriamente" ));
		});
	});
}
//Función para insertar anuncios de prueba de un fichero json. Devuelve una promesa con el array recibido.
//Utiliza Async.
//Recibe un array de anuncios.
function InsertarAnuncios(info){
	return new Promise(function(resolve,reject){
		let anunciosArray = info["anuncios"];
		async.each(anunciosArray, function(file, callback) {
		  let anuncio = new Anuncio(file);	
		  anuncio.save(function (err, newRow) {
		    callback();
		  });
		}, function(err){
		    if( err ) {
		      reject(console.log('Error al insertar los anuncios '));
		    } else {
		    	console.log('Todos los anuncios se han insertado correctamente.');
		    	resolve(info);
		    }
		});
	});
}
//Función para insertar usuarios de prueba de un fichero json. Devuelve una promesa. Utiliza Async.
//Recibe un array de usuarios.
function InsertarUsuarios(info){
	return new Promise(function(resolve,reject){
		let usuariosArray = info["usuarios"];
		async.each(usuariosArray, function(usuarioArray, callback) {
		  let usuario = new User(usuarioArray);
		  usuario.clave = sha(usuarioArray.clave);	
		  usuario.save(function (err, newRow) {
		    callback();
		  });
		}, function(err){
		    if( err ) {
		      reject(console.log('Error al insertar los usuarios '));
		    } else {
		    	console.log('Todos los usuarios se han insertado correctamente.');
		    	resolve();
		    }
		});
	});
}
//Función para Leer un archivo json con fs. Devuelve una promesa con los datos leidos.s
function LeerDB(){
	return new Promise(function(resolve,reject){
		fs.readFile("./anunciosInicio.json",function(err,data){
			if (err){
				console.log("Error al leer el fichero");
				return;
			}
			let info = JSON.parse(data);
			resolve(info);
		});
	});
}
LimpiarDBAnuncios()
	.then(LimpiarDBUsuarios)
	.then(LeerDB)
	.then(InsertarAnuncios)
	.then(InsertarUsuarios)
	.then( function(){
		process.exit(0);
	})
	.catch(function(err){
		console.log("Error: ", err);
		process.exit(1);
	});
