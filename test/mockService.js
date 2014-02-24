/**
 * Created by qiuzuhui on 14-2-24.
 */
var angoose = require("angoose");
var log4js = require("log4js");
var logger=log4js.getLogger('test')

var service={}

service.test=function(cb){
    logger.debug('other service invoke test method');
    cb();
};

module.exports=angoose.module('MockService',service);