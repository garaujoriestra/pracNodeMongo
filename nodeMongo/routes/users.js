var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var sha = require("sha256");

router.get('/', function(req, res) {
	User.list(function(err,rows){
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
	var user = new User(req.body);
	user.clave = sha(user.clave);		
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
