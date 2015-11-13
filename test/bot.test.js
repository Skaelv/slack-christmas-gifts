var assert = require('assert');
var redis = require('redis');
var bot = require("../service/bot.js");
var client = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});

var TEAM_ID = process.env.TEAM_ID || "T0ERQF52R";
var CHANNEL_ID = process.env.CHANNEL_ID || "C0ERNME7N";
var USER_NAME = process.env.USER_NAME || "@dora";
var MEMBER_IDS = process.env.MEMBER_IDS || [ 'U0ERQF53P', 'U0ERVEW4X', 'U0F02P1PG', 'U0F03EMG8' ];
var MEMBERS = process.env.MEMBERS || [ 'donald', 'dora', 'nemo', 'waldo' ];
var access_token;

describe('Bot', function() {
  before(function init(){
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e067aae... added circle_ci env var
  	if(process.env.TOKEN) {
  		access_token = process.env.TOKEN;
  	} else {
			client.get(TEAM_ID, function(err, res){
				if(err) return;
				console.log(res);
				access_token = res;
			});
  	}
<<<<<<< HEAD
=======
		client.get(TEAM_ID, function(err, res){
			if(err) return;
			access_token = res;
		});
>>>>>>> bb2948e... tested bot
=======
>>>>>>> e067aae... added circle_ci env var
  });
  describe('Bot:Get Channel', function () {
  	it('should get channel informations', function () {
      return bot.getChannel(CHANNEL_ID, access_token).then(function (res, err){
    		assert.ifError(err);
    		assert.equal(res.members.length, 4);
    		members = res.members;
      });
    });
  });
  describe('Bot:Get One Member', function () {
  	it('should send an incoming hook to slack channel', function () {
      return bot.getUserName(MEMBER_IDS[0], access_token).then(function (res, err){
    		assert.ifError(err);
    		assert.equal(res, MEMBERS[0]);
      } );
    });
  });
  describe('Bot:Get Members', function () {
  	it('should get members username', function () {
      return bot.getMembersInfo(MEMBER_IDS, access_token).then(function (res, err){
    		assert.ifError(err);
    		assert.equal(res.length, 4);
  			assert.deepEqual(res, MEMBERS);
      });
    });
  });
  describe('Bot:Send Incoming hook', function () {
  	it('should send an incoming hook to slack channel', function () {
      return bot.sendIncomingHook(access_token, CHANNEL_ID, "Mocha_test").then(function (res, err){
    		assert.ifError(err);
    		assert.equal(res.body.ok, true);
      });
    });
  	it('should send an incoming hook in DM', function () {
      return bot.sendIncomingHook(access_token, USER_NAME, "Mocha_test").then(function (res, err){
    		assert.ifError(err);
    		assert.equal(res.body.ok, true);
      });
    });
  });
});