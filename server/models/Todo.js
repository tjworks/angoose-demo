var angoose = require("angoose"); /** if angoose is installed as module, then require('angoose')*/
var mongoose = angoose.getMongoose();
var todoSchema = mongoose.Schema({
       title: { type: String, required: true, tags:['default-list'], label:'Todo'},
       completed: {type:Boolean, tags:['default-list'], label:'Completed'},
        description:{type:String,template:'redactor'}
});
module.exports = mongoose.model('Todo', todoSchema);
