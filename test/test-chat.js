var module = require('../lib/chat');
var assert = require('assert');
var app = require('../app');

exports['init module chat'] = function(test){
    test.expect(1);
    test.ok(module.chatModule.initRoute(app));
    test.done();
}

exports['connect chat'] = function(test){

    test.ok(module.chatModule.connectChat({
        channel: 'testChannel',
        pseudo: 'testPseudo'
    }));
    
    test.notEqual(module.chatModule.connectChat(), true, 'no data');
    test.notEqual(module.chatModule.connectChat({
        channel: ''
    }), true, 'channel empty');
    test.notEqual(module.chatModule.connectChat({
        pseudo: ''
    }), true, 'pseudo empty');
    test.notEqual(module.chatModule.connectChat({
        channel: '',
        pseudo: ''
    }), true, 'both empty');
	
	 test.notEqual(module.chatModule.connectChat({
        channel: 'testChannel',
        pseudo: 'testPseudo'
    }), true, 'already in use');
	
	 test.ok(module.chatModule.connectChat({
        channel: 'testChannel',
        pseudo: 'pascal'
    }));
	
    
    test.done();
}

app.close();
