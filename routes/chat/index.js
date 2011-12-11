var url = require("url");
var qs = require("querystring");

exports.sendMessage = function (req, res, next){
    var params = qs.parse(url.parse(req.url).query);
    if (connectChat(params)) {
        messageLog.push({
            message: params.pseudo + ' has joined ' + params.channel
        });
    }
    req.messageLog = messageLog;
    next();
};


exports.index = function( req, res){
    res.render('chat/index', {
        title: 'chat',
        message: req.messageLog
    })
};
