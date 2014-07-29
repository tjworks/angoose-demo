var angoose = require("angoose"); 
var mongoose = angoose.getMongoose();
var Grid = require('gridfs-stream');
var mongodb = require("mongodb");
 
var schema = mongoose.Schema({
		filename: {type: String, tags:['default-list'], label:'File Name'},
		contents:{type: Buffer, template:'file', accept:['image/jpeg','image/png'], label:'Contents'},
		contents_meta: {type: mongoose.Schema.Types.Mixed, editable:false}		
	});

schema.post("init", function(next){
	console.log("After init", this.contents_meta);
	// populate contents
	var me = this;
	if(this.contents_meta && this.contents_meta.name){
		console.log("opening", this.contents_meta.name);
		var gs = new mongodb.GridStore(mongoose.connection.db, this.contents_meta.name,'r');
		console.log("opening2");
		gs.open(function(err, gs){
			if(err){
				console.log("failed to open", err);
				next(err);
			}
			console.log("opened for read");
//			gs.read(function(err, data){
//				if(err) next(err);
//				console.log("Read data");
//				me.contents = data;
//				gs.close();
//				next();
//			});
			var stream= gs.stream(true);
			stream.on('end', function(data){
				console.log("read data");
				next();
			})
		});
		console.log("opening3");
	}
	else
		next();
//		var gfs = Grid(mongoose.connection.db, mongoose.mongo);
//		
//		var readstream = gfs.createReadStream({
//			  _id:  this.contents_meta._id
//			});
//		readstream.on('error', function (err) {
//			  console.log('An error occurred reading gfs!', err);
//			  throw err;
//			});
//		me.contents = new Buffer(0);
//		readstream.on("data", function(chunk){
//			console.log("Read some chunk", chunk.length)
//			//me.contents = Buffer.concat( [me.contents, chunk]);
//		});
//		
//		readstream.on("end", function(data){
//			console.log("Finished reading", data.length);
//			me.contents = data;
//			
//			next();
//		})
//		//this.contents = readstream.read();
//		//next();
//	}
//	else
//		next();
});

schema.pre("save", function(next){
	console.log("Thumbnail", this.contents.length);
	console.log("Meta", this.contents_meta );
	var me = this;
	if(this.contents_meta){
		// save it to gridfs
		var gfs = Grid(mongoose.connection.db, mongoose.mongo);
		
		if(this.contents_meta._id){
			gfs.remove(options, function (err) {
				  if (err) return next(err);
				  writeData();
			});
		}
		else 
			writeData();
		
		function writeData(){
			var opts = {
				filename: me.contents_meta.name,
				mode:'w',
				chunkSize: 8192,
				root:'fs',
				content_type: me.contents_meta.type
				//_id: this.contents_meta._id
			}
			
			var writestream = gfs.createWriteStream(opts);
			
			writestream.write(me.contents );
			writestream.end();
			writestream.on('close', function(file){
				console.log("wrote file to gridfs closed!", file);
				me.contents_meta._id = file._id;
				me.contents = null;
				next();
			});
		}
	}
	else
		next();

});
	 
module.exports = mongoose.model('GridFile', schema);
