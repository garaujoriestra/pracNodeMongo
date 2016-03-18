var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var sha = require("sha256");

/**
 * @api {get} /users/json GetUsersJson.
 * @apiName GetUsers
 * @apiGroup Users
 * @apiDescription Descripción del método.
 * 	   Este método get de Users devuelve el listado completo de los usuarios registrados en la API BBDD en formato json.
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/users/json
 *
 * @apiSuccess {String} Id Único del Usuario.
 * @apiSuccess {String} nombre Nombre del Usuario.
 * @apiSuccess {String} email  Email del Usuario.
 * @apiSuccess {String} clave  Clave del Usuario.
 * @apiVersion 1.0.0
 * @apiError json que muestra el resultado a false y el error.
 * @apiErrorExample {json} Respuesta-Errpr:
 *     {
 *       "result": "false",
 *		 "error": err
 *     }
 */
router.get('/json', function(req, res) {  //Función get para recibir los usuarios de la bbdd en json.
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

/**
 * @api {get} /users GetUsers.
 * @apiName GetUsers
 * @apiGroup Users
 * @apiDescription Descripción del método.
 * 	   Este método get de Users devuelve el listado completo de los usuarios registrados en la BBDD
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/users
 *
 * @apiSuccess {String} Id Único del Usuario.
 * @apiSuccess {String} nombre Nombre del Usuario.
 * @apiSuccess {String} email  Email del Usuario.
 * @apiSuccess {String} clave  Clave del Usuario.
 * @apiError Users no encontrado.
 * @apiVersion 1.0.0
 */
router.get('/', function(req, res) {  //Función get para recibir los usuarios de la bbdd con la vista user_form.
	User.list(function(err,rows){
		if (err) {
			res.render("error",{err: error});
		};
		res.render('user_form',{users: rows} );
	});
});
/**
 * @api {post} /users PostUsers.
 * @apiName PostUsers
 * @apiGroup Users
 * @apiDescription Descripción del método.
 * 	   Este método post de Users devuelve la información del usuario registrado en la BBDD.
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/users
 *
 * @apiVersion 1.0.0
 * @apiSuccess {String} nombre Nombre del Usuario.
 * @apiSuccess {String} email  Email del Usuario.
 * @apiSuccess {String} clave  Clave del Usuario.
 * @apiError json que muestra el resultado a false y el error.
 * @apiErrorExample {json} Respuesta-Errpr:
 *     {
 *       "result": "false",
 *		 "error": err
 *     }
 */
router.post("/", function(req, res){
	var query = User.find({nombre: req.body.nombre}); //Compruebo si ya existe alguien con ese usuario.
	query.exec(function(err,rows){
		if(rows.length === 0){
			var queryEmail = User.find({email: req.body.email}); //Compruebo si ya existe alguien con ese email.
			queryEmail.exec(function(err,rows){
				if(rows.length === 0){
					var user = new User(req.body); //Creo usuario
					user.clave = sha(user.clave);	//Hasheo la clave	
					user.save(function (err, newRow) {  //Inserto el usuario
						if (err){
							res.json({result: false, err: err});
							return;
						}
						res.json({result: true, rows: newRow});
						return;
					});
				}else{
					res.json({result: false, err: "Ya existia un usuario con ese email"});
					return;
				}
			});
		}else{
			res.json({result: false, err: "Ya existia un usuario con ese nombre"});
			return;
		}
	});
});
module.exports = router;
