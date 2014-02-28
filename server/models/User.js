var angoose =require("angoose")
var mongoose = angoose.getMongoose();
var ObjectId = mongoose.Schema.Types.ObjectId;
var    Mixed = mongoose.Schema.Types.Mixed;

var schema = new mongoose.Schema({
        email: {type: String, required: true, label: 'Email', match:[/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i, "Email is not valid"],unique:true},
        phone: {type: String, label: 'Phone Number'},
        first: {type: String, required: true, label: 'First Name',   sortable:true,tags:['default-list'],  defsort:'asc' },
        last: {type: String, required: true, label: 'Last Name',  sortable:true,tags:['default-list'] },
        status: {
            type: String,
            required: true,
            label: 'Status',
            enum:['active','disabled','archived'],
            default:'active'
        }
}, {
    collection: 'users'
});


module.exports = mongoose.model('User',schema);