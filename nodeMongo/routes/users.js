var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var sha = require("sha256");

/*router.get('/', function(req, res) {
	console.log("si he entrado en el e dentro con ", req);
	User.list(function(err,rows){
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
	var user = new User(req.body);
	console.log("user info, ", user);
	console.log("user pass, ", user.clave);
	user.clave = sha(user.clave);	
	console.log("user pass22222, ", user.clave);	
	user.save(function (err, newRow) {
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
