const dipto = require('axios');
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment-timezone');

const pathFile = __dirname + '/cache/d1p.txt';
if (!fs.existsSync(pathFile)) fs.writeFileSync(pathFile, 'true');
const isEnable = fs.readFileSync(pathFile, 'utf-8');

module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Nazrul",
  description: "Guide",
  commandCategory: "system",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ api, event }) => {
  if (isEnable == "true") {
    const dipto2 = event.body ? event.body.toLowerCase() : '';
    let d1PInfo = await api.getThreadInfo(event.threadID);
    let diptoName = d1PInfo.threadName;
    var time = moment.tz("Asia/Dhaka").format("LLLL");

    const text = `—»✨[ 𝐏𝐫𝐞𝐟𝐢𝐱 𝐄𝐯𝐞𝐧𝐭 ]✨«—\n𝐍𝐀𝐌𝐄 ➢ Ex 卝 বয়ফ্রেন্ডヅ\n𝐑𝐎𝐁𝐎𝐓 𝐏𝐑𝐄𝐅𝐈𝐗 ➢ ｢ ${global.config.PREFIX} ｣\n𝐑𝐎𝐁𝐎𝐓 𝐂𝐌𝐃 ➢ ｢ ${client.commands.size} ｣\n𝐓𝐈𝐌𝐄 ➢ ${time}\n𝐆𝐑𝐎𝐔𝐏 𝐍𝐀𝐌𝐄 ➢ ${diptoName}\n𝐎𝐖𝐍𝐄𝐑 ➢ Ex 卝 বয়ফ্রেন্ডヅ\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 ━➢ SOIKOT`;

    // Imgur লিংকের অ্যারে
    const imgurLinks = [
      "https://i.imgur.com/geRQoeB.mp4",
      "https://i.imgur.com/geRQoeB.mp4"
    ];
    const link = imgurLinks[Math.floor(Math.random() * imgurLinks.length)];
    const res = await dipto.get(link, { responseType: 'arraybuffer' });
    const ex = path.extname(link);
    const filename = __dirname + `/cache/Shaon${ex}`;

    fs.writeFileSync(filename, Buffer.from(res.data, 'binary'));

    if (dipto2.indexOf("prefix") === 0 || dipto2.indexOf("Prefix") === 0) {
      api.sendMessage(
        { body: `${text}`, attachment: fs.createReadStream(filename) },
        event.threadID,
        () => fs.unlinkSync(filename),
        event.messageID
      );
    }
  }
};

module.exports.run = async ({ api, args, event }) => {
  try {
    if (args[0] == 'on') {
      fs.writeFileSync(pathFile, 'true');
      api.sendMessage('Prefix system enabled successfully.', event.threadID, event.messageID);
    } else if (args[0] == 'off') {
      fs.writeFileSync(pathFile, 'false');
      api.sendMessage('Prefix system disabled successfully.', event.threadID, event.messageID);
    } else if (!args[0]) {
      api.sendMessage(`Wrong format. Use: ${this.config.name} off/on`, event.threadID, event.messageID);
    }
  } catch (e) {
    console.log(e);
  }
};
