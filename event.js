

var mongoose = require('mongoose'),
	GlobalSchema = require("./global"),
	ObjectId = mongoose.Schema.Types.ObjectId,
	CustomRef = mongoose.Schema.Types.CustomRef,
	Mixed = mongoose.Schema.Types.Mixed;



var EventSchema = GlobalSchema.extend({
	event_data: {
		ts: Date,
		name: String,
		value: Mixed,
		desc: String,
		tags: [String],
		actor: { type: CustomRef, ref: 'User' },
		patient: { type: CustomRef, ref: 'Patient' },
		office: {
			referring: { type: CustomRef, ref: 'Office' },
			treating: { type: CustomRef, ref: 'Office' }
		},
		physician: {
			referring: { type: CustomRef, ref: 'Physician' },
			treating: { type: CustomRef, ref: 'Physician' }
		},
		treatment: {
			type: CustomRef,
			ref: 'Treatment'
		}
	},
	type: {type: String, default: 'event', editable: false}
}, {
	collection: 'events'
});



module.exports = mongoose.model('Event', EventSchema);