var angoose = require("angoose");
var _ = require("underscore")
var extension = {name: 'access-log'}

var log4js = require("log4js")
var log = log4js.getLogger("access-log")
log.setLevel(log4js.levels.DEBUG)

extension.postInvoke = function (next, data) {
    next(null, data);
    var Event = angoose.module("Event");
    var context = angoose.getContext();
    var invocation = context.getInvocation()
//    var user = context.getPrincipal();  TODO
    var user = context.getRequest().session.user;
    log.debug("post Invoke :" + JSON.stringify(invocation));
    log.debug("get user from context :" + JSON.stringify(user));
    if (!user || !user._id) {
        log.warn('there is no user');
        return;
    }
    if (invocation.clazz == 'LoginService' && invocation.method == 'signin') {
        log.debug(data.userId + ' signIn access');
        new Event({
            event_data: {
                name: 'user-login',
                ts: new Date(),
                actor: {
                    _id: data.userId
                },
                value:{
                    length:0
                }
            }
        }).save(function (err) {
                if (err) log.error(err)
            })
    } else {
        log.debug('other access');
        Event.findOne({'event_data.actor._id': user._id,'event_data.name':'user-login'})
            .sort({'event_data.ts': -1})
            .exec(function (err, doc) {
                if (err) {
                    log.error(err)
                }
                else if (doc) {
                    // event's schema do not list doc.event_data.value's properties ,update it atomic,
                    var value=_.clone(doc.event_data.value)
                    value.length=Date.now() - doc.event_data.ts;
                    doc.event_data.value = value;
                    log.debug("user " + doc.event_data.actor._id + " keep alive : " + doc.event_data.value.length + "ms")
                    doc.save(function (err,event) {
                        if (err) log.error(err)
                        log.debug("updated event : " + JSON.stringify(event))
                    })
                }
            })
    }
}

module.exports = extension;
