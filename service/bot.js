'use strict';

var request = require('superagent');
var _ = require('underscore');
var Promise = require('promise');

var bot = new Object();
var DIRECTMSG = "is the lucky one who will receive a present from you on christmas!";

bot.getChannel = function(channelId, token) {
	var url = "https://slack.com/api/channels.info?token=" + token + "&channel=" + channelId + "&pretty=1";
	try {
		return new Promise(function (resolve, reject){
			request
			  .get(url)
			  .set('Accept', 'application/json')
			  .end(function(err, res){
			  	 if(err) reject(err);
			  	 else {
				 	resolve(res.body.channel);
				 }
			  });
		})
	} catch(e) {
		throw e;
	}
};

bot.getMembersInfo = function(memberIds, token) {
	try {
		var q = [];
		_.map(memberIds,function (memberId){
			q.push(bot.getUserName(memberId, token));
		});
		return new Promise.all(q);
	} catch(e) {
		throw e;
	}
};

bot.getUserName = function(memberId, token) {
	var url = "https://slack.com/api/users.info?token=" + token + "&user=" + memberId + "&pretty=1";
	try {
		return new Promise(function (resolve, reject){
			request
			  .get(url)
			  .set('Accept', 'application/json')
			  .end(function(err, res){
			  	 if(err) reject(err);
			  	 else {
			  	 	if(!res.body.user) Throw
				 	resolve(res.body.user.name);
				 }
			  });
		})
	} catch(e) {
		throw e;
	}
}

bot.run = function(members, token) {
	try {
		members = _.shuffle(members);
		var q = [];
		q.push(this.sendIncomingHook(token, '@'+ members[members.length - 1], "<@" + members[0] + "> " + DIRECTMSG));
		for (var i = 1; i < members.length; i++) {
			q.push(bot.sendIncomingHook(token, '@'+ members[i-1], "<@" + members[i] + "> " + DIRECTMSG));
		};
		return new Promise.all(q);
	} catch(e) {
		throw e;
	}
}

bot.sendIncomingHook = function(token, channel, text) {
	try {
		return new Promise(function (resolve, reject) {
			var url = "https://slack.com/api/chat.postMessage?token=" + token + "&channel=" + channel + "&text=" + text + "&username=Santa&icon_emoji=%3Asanta%3A%3Askin-tone-3%3A&pretty=1";
			request
			  .get(url)
			  .set('Accept', 'application/json')
			  .end(function(err, res){
			  	 if(err) reject(err);
			  	 else {
			  	 	resolve(res);
				 }
			  });
		})
	} catch(e) {
		throw e;
	}
}

bot.register = function(req) {
	var url = "https://slack.com/api/oauth.access?client_id=" + process.env.CLIENT_ID + "&client_secret=" + process.env.CLIENT_SECRET + "&code=" + req.query.code + "&redirect_uri=" + process.env.REDIRECT_URI + "&pretty=1";
	try {
		return new Promise(function (resolve, reject) {
		    request
			  .get(url)
			  .set('Accept', 'application/json')
			  .end(function(err, res){
			  	 if(err) reject(err);
			  	 else {
			  	 	if(res.body.team_id) 
			  	 		resolve(res.body);
				 }
			  });
			});
	} catch(e) {
		throw e;
	}
}
module.exports = bot;
