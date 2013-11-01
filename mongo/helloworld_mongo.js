var express = require("express"),
	app = express(),
	cons = require("consolidate"),
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server;

	app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var mongoClient = new MongoClient(new Server('localhost', 27017,
										{'native_parser' : true}));
var db = mongoClient.db('test');

app.get('/', function(req,res){
	db.collection('coll').findOne({},function(err,doc){
		res.render('hello',doc);
	})
	
});

app.get('*', function(req,res){
	res.send("Page not found", 404);
});

mongoClient.open(function(err,mongoClient){
	if (err) throw err;
	app.listen(8080);
	console.log("Express server started on port 8080");
})

// //open the connection to the server
// MongoClient.connect('mongodb://localhost:27017/test', function(err,db){
// 	if(err) {throw err;}
// //insert one record into collection coll
// db.collection('coll').insert({"name":"mongo"}, function(err,doc){
// 	if (err) {throw err;}
// 	console.log("doc " + doc + " inserted");
// })
// 	//find one document in out collection
// 	db.collection('coll').findOne({}, function(err, doc){
// 		if (err) {throw err;}
// 		//print the result
// 		console.dir(doc);
// 		//close the db
// 		db.close();
// 	});

// 	//Declqare success
// 	console.dir("Called findOne");
// });