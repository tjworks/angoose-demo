var angoose = require("angoose");

var extension = {name: 'access-log'}

extension.preAuthorize = function(next, invocation){
    next();
    var Event = angoose.module("Event");
    // record last user access time
    var context = angoose.getContext();
    var user = context.getPrinciapl();
    //@todo: if no user in context, return
    
    //@todo:  if method  == 'signin', 
    // 1) record login event
    // event_data.name:  user-login
    // desc: User xxx logged in
    // actor._id: user id
    // tm: new Date()
    // value: { length: 0 } 
    
    //@otherwise
    // find user's lastest login event
    // update it's value.length to be: now - loginTime  
    // if latest login event is more than session timeout, error case or create a login event? 
}


module.exports = extension;
