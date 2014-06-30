var angoose = require("angoose"); 
var mongoose = angoose.getMongoose();
 
var schema = mongoose.Schema({
		filename: {type: String, tags:['default-list'], label:'File Name'},
		contents:{type: Buffer, template:'file', accept:['image/jpeg','image/png'], label:'Contents'}		
	});


schema.pre("save", function(next){
	console.log("Thumbnail", this.contents);
	// save it to gridfs
	next();
});
	 
module.exports = mongoose.model('GridFile', schema);
