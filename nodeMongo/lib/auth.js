'use strict';
var basicAuth = require("basic-auth");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var sha = require("sha256");

//Función de autentificación. Middleware creado por mi.
let fn = function(){
	return function(req,res,next){
		let	userBasic = basicAuth(req) || "";
		let query = User.find({nombre: userBasic.name});  //Busca en la bbdd si existe alguien con ese nombre.
		query.exec(function(err,rows){
			if(err){
				res.json({result: false, err: err});
				return;
			}
			if(rows.length === 0){  //Si no se ha encontrado, se devuelve un 401
				res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
				res.send(401);
				return;
			}
			let pass = sha(userBasic.pass); //De haberse encontrado, se comprueba que las claves sean iguales
			if(rows[0].clave !== pass){
				res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
				res.send(401);
				return;
			}
			next();  //si nombre y contraseña coincide, se pasa al sigueitne middleware.
		});
	};
};
module.exports = fn;