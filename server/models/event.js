var angoose =require("angoose")
var mongoose = angoose.getMongoose();
var ObjectId = mongoose.Schema.Types.ObjectId;
var    Mixed = mongoose.Schema.Types.Mixed;

var EventSchema = new mongoose.Schema({
    event_data: {
        ts: Date,
        name: String,
        value:Mixed,
        desc: String,
        tags: [String],
        actor: { _id: ObjectId }
     },
    type: {type: String, default: 'event', editable: false}
}, {
    collection: 'events'
});


module.exports = mongoose.model('Event', EventSchema);