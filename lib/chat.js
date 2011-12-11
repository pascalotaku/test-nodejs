var chatModule = (function(){

    var allowRoute = ['connect'];
    //var chatModuleRoutes = require('../routes/chat/');
    var url = require("url");
	var qs = require("querystring");
	
	
    var channelList = [];
    var messageLog = [];
    
    function sendMessageConnect(req, res, next) {
        var params = qs.parse(url.parse(req.url).query);
       	if (connectChat(params.channel, params.pseudo) == true ) {
	   		var toSend = {txt : params.pseudo+' has joined ' + params.channel};
	   } else {
	   		var toSend = {txt : 'tentative connection echoué' };
	   }
	   messageLog.push(toSend);
	   
	   req.messageLog = messageLog; 

	   next();
    }
    
    function initRoute(app){
		// app.get('/connect', chatModulesRoutes.sendMessage, chatModuleRoutes.index);
		
		app.get('/connect',sendMessageConnect, function(req, res){
			
				console.log(req.messageLog);
			
   			 res.render('chat/index', {
       			 title: 'chat'
				, messageLog : req.messageLog
   		 	});
		});	

        return true;
    }
    
    function connectChat(channel, pseudo){
        if (typeof channel != 'string' || channel.length == 0) {
            return false;
        }
        if (typeof pseudo != 'string' || pseudo.length == 0) {
            return false;
        }
        
        if (typeof channelList[channel] == 'undefined') {
            channelList[channel] = [];
        }
        
        return createPseudoInfo(channel, pseudo);
    }
    
    function createPseudoInfo(channel, pseudo){
        var pseudoInfo = {};
        pseudoInfo.id = Math.floor(Math.random() * 99999999999).toString();
        pseudoInfo.nickName = pseudo;
        
        for (x in channelList[channel]) {
            if (channelList[channel][x].nickName == pseudo) {
                return null;
            }
        }
        
        channelList[channel].push(pseudoInfo);
        return true;
    }
    
    /** public method **/
    return {
        connectChat: function(params){
            if (typeof params !== 'object') {
                return false;
            }
            return connectChat(params.channel, params.pseudo);
        },
        initRoute: function(app){
            return initRoute(app);
        }
    }
    
}());

exports.chatModule = chatModule;
