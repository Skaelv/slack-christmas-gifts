'use strict';

var express = require('express');
var router = express.Router();
var Slack = require('node-slack');
var request = require('superagent');
var bot = require('../service/bot.js');
var redis = require('redis');
var client = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});

var LANDING_PAGE = "http://skaelv.github.io/slack-christmas-gifts";
var CHANNEL_MSG = "has rolled the dices! I personnally informed you who you will get a present from you at christmas party!";

router.get('/', function(req, res) {
    redirect(res, req);
    // res.render('index', { title: 'Slack' });
});

router.post('/roll', function(req, res) {
	client.get(req.body.team_id, function(err, access_token){
		bot.getChannel(req.body.channel_id, access_token).then(function (channel, err){
			if (err) handleError(channel, err);
			if (channel.members.length < 3) {
				res.status(204).send("Come on...I'm sure you have more friends than that");
			}
			bot.getMembersInfo(channel.members, access_token).then(function (members, err){
				if (err) handleError(members, err);
				bot.run(members, access_token).then(function (hook, err) {
					if (err) handleError(hook, err);
					// Msg to inform the channel
					bot.sendIncomingHook(access_token, channel.id, '<@'  + req.body.user_name + '> ' + CHANNEL_MSG).then(function(hook, err){
						if (err) handleError(hook, err);
						res.status(200).send();
					});
				});
			});
		}, function (err){
			throw err;
		});
	});
});

router.get('/register', function (req, res) {
	bot.register(req).then(function (cb) {
		client.set(cb.team_id, cb.access_token);
		redirect(res, req);
	}, function (err){
		throw err;
	});
});

function redirect(res, req) {
  res.writeHead(302, {'Location': LANDING_PAGE});
  res.end();
}
function handleError(res, err) {
  return res.status(500).send(err);
}



module.exports = router;
