var angoose = require("angoose"); 
var mongoose = angoose.getMongoose();

var property = mongoose.Schema({
	key: {type: String, label:'Key'},
	value:{type: String,label:'Value'}
}, {label:'Attribute'});

var schema = mongoose.Schema({
		name: {type: String, tags:['default-list'], label:'Test Name',required:true},
		ts: {type: Date, label:'Date'},
		props: [ property ]		
	});


schema.pre("save", function(next){
	console.log("Thumbnail", this.thumbnail);
	next();
});
	 
module.exports = mongoose.model('Test', schema);
