'use strict';
var basicAuth = require("basic-auth");
var mongoose = require("mongoose");
var User = mongoose.model("User");
var sha = require("sha256");


var fn = function(){
	return function(req,res,next){
		var	userBasic = basicAuth(req) || "";
		var query = User.find({nombre: userBasic.name});
		query.exec(function(err,rows){
			if(err){
				cb(err);
				return;
			}
			if(rows.length === 0){
				res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
				res.send(401);
				return;
			}
			console.log("rows:", rows);
			let pass = sha(userBasic.pass);
			if(rows[0].clave !== pass){
				res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
				res.send(401);
				return;
			}
			console.log(pass);
			next();
		});
		
	};
};
module.exports = fn;