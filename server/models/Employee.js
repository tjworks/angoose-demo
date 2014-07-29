var angoose = require("angoose"); 
var mongoose = angoose.getMongoose();

var interest = mongoose.Schema({
	name: {type: String, label:'Interest Name'},
	comment:{type: String,label:'Comment'}
}, {label:'Interest'});

var schema = mongoose.Schema({
		name: {type: String, tags:['default-list'], label:'Name'},
		eid: {type: String, tags:['default-list'], label:'EmployeeID'},
		age: {type: Number, label: 'Age'},
		hourly:{ type: Number, label:'Hourly'},
		joined: Date,
		thumbnail:{type: Buffer, template:'file', accept:['image/jpeg','image/png'], label:'Thumbnail'},
		greeting: {type: Buffer, template:'file', accept: ['audio/mpeg', 'audio/mp3'], label:'Greeting'},
		video: {type: Buffer, template:'file', accept: ['video/webm', 'video/x-ms-wmv', 'video/mp4'], label:'Short Video'},
		//manager:String,		
		interests: [ interest ]
	});


schema.pre("save", function(next){
	console.log("Thumbnail", this.thumbnail);
	next();
});
	 
module.exports = mongoose.model('Employee', schema);
