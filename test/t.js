var assert = require("assert");
var should = require('should');
var angoose = require("angoose");
require('./MockService');


var log4js = require("log4js");
log4js.getLogger('angoose').setLevel(log4js.levels.DEBUG);
log4js.getLogger('access-log').setLevel(log4js.levels.DEBUG);
var logger=log4js.getLogger('test');
logger.setLevel(log4js.levels.DEBUG);
console.log=function(){};

var accessLog = require("./../server/access-log");
var options = {
    extensions:['angoose-users', accessLog],
    modelDir: './server',
    logging:'INFO',
    mongo_opts:'localhost:27017/test'
};
angoose.init(null, options);

var LoginService = angoose.client().module("LoginService");
var mockService = angoose.client().module("MockService");
var UserModel = require("angoose-users/user-model");
var Event = require("./../server/models/event");

var testUser;

function initUser(done){
    logger.debug('initUser');
    var u = new UserModel({
        email:'john1@demo.com',
        password:'xxx',
        roles:['admin']
    });
    UserModel.findOne({email:u.email}, function(err, user){
        if(user){
            logger.debug('already have testUser : '+JSON.stringify(user))
            testUser=user;
            return done();
        }
        testUser.save(function(err,user){
            if(err){
                done(err);
            }else{
                testUser=user;
                logger.debug("created testUser :"+JSON.stringify(user));
                done();
            }
        })
    })
}
var getEventCount = function(cb){
    Event.count()
        .exec(cb);
}
var findLastLoginEvent = function(userId,cb){
    Event.findOne({'event_data.actor._id': userId})
        .sort({'event_data.ts': -1})
        .exec(function (err, event) {
            logger.debug("find last login event of "+userId+" : "+JSON.stringify(event));
            cb(err,event)
        })
}

describe('test of access-log extension', function(){

    before(initUser);
    describe('should insert a event after signin ',function(){
        var eventCount;
        var insertTime= Date.now();
        it('get event count',function(done){
            getEventCount(function(err,count){
                if(err){
                    done(err);
                }else{
                    eventCount=count;
                    logger.debug("get event count :"+count);
                    done();
                }
            })
        });
        it('login',function(done){
            LoginService.signin(testUser.email,'xxx',function(err, user){
                if(err){
                    done(err)
                }else{
                    logger.debug("login user :"+JSON.stringify(user));
                    getEventCount(function(count){
                        done();
                    })
                }
            })
        });
        it('event count should been add 1',function(done){
            getEventCount(function(err,count){
                if(err){
                    done(err);
                }else{
                    logger.debug("get event count :"+count);
                    assert.equal(count,eventCount+1)
                    done();
                }
            })
        });
        it('event with correct info',function(done){
            findLastLoginEvent(testUser._id,function(err,event){
                assert.equal(event.event_data.actor._id.toString(),testUser._id.toString())
                assert.equal(event.event_data.name,'user-login')
                done()
            });
        })
    })

    describe('should update last login event after access other service',function(){
        var delay=5000
        this.timeout(delay*2+10000)
        it('login',function(done){
            LoginService.signin(testUser.email,'xxx',function(err, user){
                if(err){
                    done(err)
                }else{
                    getEventCount(function(count){
                        done();
                    })
                }
            })
        });

        it('1 wait for '+delay+'ms', function(done){
            setTimeout(done, delay);
        })
        it('access other service',function(done){
            mockService.test(function(){
                done();
            })
        });
        it('2 wait for '+delay+'ms', function(done){
            setTimeout(done, delay);
        })
        it('access other service',function(done){
            mockService.test(function(){
                done();
            })
        });
        it('wait for db update finish', function(done){
            setTimeout(done, 1000);
        })
        it('event with correct info',function(done){
            findLastLoginEvent(testUser._id,function(err,event){
                assert.equal(event.event_data.actor._id.toString(),testUser._id.toString())
                assert.equal(event.event_data.name,'user-login')
                assert.ok( event.event_data.value > delay*2 )
                done()
            });
        })
        it('wait for log flush', function(done){
            setTimeout(done, 1000);
        })
    })

})