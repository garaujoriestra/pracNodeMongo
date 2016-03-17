
'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Anuncio = mongoose.model("Anuncio");
var auth = require("../lib/auth");

router.use(auth());

function rellenarFiltroBusqueda(req){
	let filtroBusqueda = {};
	if(req.query.venta)
		filtroBusqueda.venta = req.query.venta;
	if(req.query.foto)
		filtroBusqueda.foto = req.query.foto;
	if(req.query.tag)
		filtroBusqueda.tag = req.query.tag;
	return filtroBusqueda;
}
/**
 * @api {post} /anuncios PostAnuncios.
 * @apiName PostAnuncios
 * @apiGroup Anuncios
 * @apiDescription Descripción del método.
 * 	   Este método post de Anuncios devuelve la información del anuncio registrado en la BBDD en formato json.
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/anuncios
 *
 * @apiVersion 1.0.0
 * @apiSuccess {String} nombre Nombre del Anuncio.
 * @apiSuccess {Boolean} venta  Booleano para saber si esta en venta o en búsqueda.
 * @apiSuccess {Number} precio  Precio de Venta o Precio dispuesto a pagar en búsqueda.
 * @apiSuccess {String} foto  Foto del artículo.
 * @apiSuccess {[String]} tag  Tags de las categorías del artículo.
 * @apiError json con el error.
 * @apiErrorExample {json} Respuesta-Errpr:
 *     {
 *       "result": "false",
 *		 "error": err
 *     }
 */
router.post("/", function(req, res){
	let anuncio = new Anuncio(req.body);	
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
function recuperarTags(rows){
	let tags =  new Array();
	let i; 
	for (let tag in rows) {
	    console.log("tag",rows[tag].tag);
	    tags = tags.concat(rows[tag].tag);
	}
	console.log("tags: ",tags);
	let tagsSinRepetir = tags.filter(function (item, pos) {
		return tags.indexOf(item) == pos;
	});
	return tagsSinRepetir;
}
/**
 * @api {get} /anuncios/json GetAnunciosJson.
 * @apiName GetAnunciosJson
 * @apiGroup Anuncios
 * @apiDescription Descripción del método.
 * 	   Este método get de Anuncios devuelve el listado completo de los anuncios registrados en la BBDD en formato json.
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/anuncios/json
 * @apiParam {String} [tag]  Tag por el que filtrar.
 * @apiParam {Boolean} [venta]     Booleano si es venta o búsqueda.
 * @apiParam {String} [nombre]    Nombre por el que filtrar.
 * @apiParam {Number} [precio]    Precio igual a número exacto.
 * Precio igual a número mas -.
 * Precio igual a - mas número.
 * Precio entre dos valores separado por -.
 * @apiParam {Number} [start]    Artículo por el que empezar a mostrar.
 * @apiParam {Number} [limit]    Número de artículos a mostrar.
 * @apiParamExample {json} Ejemplo-petición:
 *      http://localhost:3000/anuncios?tag​=mobile&venta​=false&nombre​=ip&precio​=50­&start​=0&limit​=2&sort​=precio
 *      http://localhost:3000/anuncios?venta​=false&precio​=100&sort​=nombre
 *      http://localhost:3000/anuncios?precio​=50­200&start​=1&limit​=2
 * @apiVersion 1.0.0
 * @apiSuccess {String} nombre Nombre del Anuncio.
 * @apiSuccess {Boolean} venta  Booleano para saber si esta en venta o en búsqueda.
 * @apiSuccess {Number} precio  Precio de Venta o Precio dispuesto a pagar en búsqueda.
 * @apiSuccess {String} foto  Foto del artículo.
 * @apiSuccess {[String]} tag  Tags de las categorías del artículo.
 * @apiError json con el error.
 * @apiErrorExample {json} Respuesta-Errpr:
 *     {
 *       "result": "false",
 *		 "error": err
 *     }
 */
router.get("/json", function(req,res){
	let filtroBusqueda = rellenarFiltroBusqueda(req);
	let precio,nombre,sort,start,limit;
	if(req.query.precio)
		precio = req.query.precio;
	if(req.query.nombre)
		nombre = new RegExp("^" + req.query.nombre, "i");
	if(req.query.sort)
		sort = req.query.sort;
	if(req.query.start)
		start = req.query.start;
	if(req.query.limit)
		start = req.query.limit;
	Anuncio.list(filtroBusqueda,precio,nombre,sort,start,limit,function(err,rows){
		if(err){
			res.json({result: false, err: err});
			return;
		}
		//Devuelvo los datos en vez de a vista, a un json
		let tags = recuperarTags(rows);
		res.json({result: true,tags:tags, rows: rows});
		return;
	});
});
/**
 * @api {get} /anuncios GetAnuncios
 * @apiName GetAnuncios
 * @apiGroup Anuncios
 * @apiDescription Descripción del método.
 * 	   Este método get de Anuncios devuelve el listado completo de los anuncios registrados en la BBDD.
 * @apiExample {curl} Ejemplo de uso:
 *     curl -i http://localhost:3000/anuncios
 *
 * @apiVersion 1.0.0
 * @apiSuccess {String} nombre Nombre del Anuncio.
 * @apiSuccess {Boolean} venta  Booleano para saber si esta en venta o en búsqueda.
 * @apiSuccess {Number} precio  Precio de Venta o Precio dispuesto a pagar en búsqueda.
 * @apiSuccess {String} foto  Foto del artículo.
 * @apiSuccess {[String]} tag  Tags de las categorías del artículo.
 * @apiError Anuncios no encontrado.
 */
router.get("/", function(req,res){
	let filtroBusqueda = rellenarFiltroBusqueda(req);
	let precio,nombre,sort,start,limit;
	if(req.query.precio)
		precio = req.query.precio;
	if(req.query.nombre)
		nombre = new RegExp("^" + req.query.nombre, "i");
	if(req.query.sort)
		sort = req.query.sort;
	if(req.query.start)
		start = req.query.start;
	if(req.query.limit)
		start = req.query.limit;
	Anuncio.list(filtroBusqueda,precio,nombre,sort,start,limit,function(err,rows){
		res.render('anuncios_vista',{anuncios: rows} );
	});
});
module.exports = router;

