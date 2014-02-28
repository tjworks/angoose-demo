var angoose =require("angoose")
var mongoose = angoose.getMongoose();
var ObjectId = mongoose.Schema.Types.ObjectId;
var    Mixed = mongoose.Schema.Types.Mixed;

var EventSchema = new mongoose.Schema({
        ts: Date,
        name: String,
        value:Mixed,
        desc: String,
        tags: [String],
    type: {type: String, default: 'event', editable: false}
}, {
    collection: 'events'
});


module.exports = mongoose.model('Event', EventSchema);