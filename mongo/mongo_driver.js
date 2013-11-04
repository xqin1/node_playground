var MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server,
	request = require('request');


var mongoClient = new MongoClient(new Server('localhost', 27017,
										{'native_parser' : true}));
var db = mongoClient.db('course');


mongoClient.open(function(err,mongoClient){
	if (err) throw err;
	console.log("mongo client connected");

//get reddit json through  request
	request('http://www.reddit.com/r/technology/.json', function(err,response,body){
		if (!err && response.statusCode == 200){
			//console.log(JSON.stringify(body))
			var obj = JSON.parse(body);
			var stories = obj.data.children.map(function(story){return story.data});
			db.collection("reddit").insert(stories, function(err,data){
				if (err) throw err;
				console.log(data);
				db.close();
			})

		}
	})


//basic nodejs driver exercise
	//var query = {"apiName":"Demographic-findByCordinates", "latlng.lat":{"$gt":41.341, "$lt": 41.342}};
	// var query = {};
	// var projection = {"domain":1, "author":1, "url":1, "_id":0};
	// var options = {"skip":1, "limit":4, "sort":[["author",1],["domain",-1]]}

	// var cursor = db.collection("reddit").find(query,projection,options);
	// // cursor.skip(1);
	// // cursor.limit(4);
	// // cursor.sort([["author",1],["domain",-1]]);
	// cursor.each(callback);

	// function callback(err,doc){
	// 	if (err) throw err;
	// 	doc != null ? console.dir(doc) : db.close();
	// }

//use request lib re get reddit data
	//db.close();
})