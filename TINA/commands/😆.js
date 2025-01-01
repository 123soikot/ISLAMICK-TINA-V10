const fs = require("fs");
module.exports.config = {
	name: "😆",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "MrTomXxX", 
	description: "hihihihi",
prefix: false,
	category: "no prefix",
	usages: "😆",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf(" bot i love You ")==0 || event.body.indexOf("oii love You ")==0 || event.body.indexOf("sohag")==0 ||
event.body.indexOf("i love You sona")==0 ||
event.body.indexOf("love you")==0 ||
 event.body.indexOf("আমি তোমাকে ভালোবাসি")==0) {
		var msg = {
				body: " স্ঁর্ঁ তো্ঁ বা্ঁল্ঁ ডা্ঁ \n\ যা্ঁ ভাগ 😒",
				attachment: fs.createReadStream(__dirname + `/cache/Mon.mp3`)
			}
			api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("💝", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
