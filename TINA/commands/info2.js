module.exports.config = {
	name: "info",
	version: "1.0.1", 
	permssion: 0,
	credits: "Ex 卝 বয়ফ্রেন্ডヅ",
	prefix: true,
	description: "Admin and Bot info.",
	commandCategory: "...",
	cooldowns: 1,
	dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
const moment = require("moment-timezone");
var juswa = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【HH:mm:ss】");
var link =                                     
["https://i.imgur.com/Ly2MYNG.mp4"];
var callback = () => api.sendMessage({body:` ╾━╤デ╦︻(▀̿Ĺ̯▀̿ ̿ পরিচয় পর্ব শুরু করা যাক 🇮
(⌐▀͡ ̯ʖ▀)︻̷┻̿═━一-

☄️𝐁𝐎𝐓 𝐍𝐀𝐌𝐄☄️  ${global.config.BOTNAME}

🔥𝐍𝐀𝐌𝐄🔥! ☞︎︎︎☜︎︎︎✰𝐒𝐎𝐈𝐊𝐎𝐓(Ex 卝 বয়ফ্রেন্ডヅ) 💔🥀

🙈 𝗠𝗬 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗜'𝗗 𝗟𝗜𝗡𝗞🙈➪ https://www.facebook.com/mdsakhoyat.hosen.9 💞🕊️

👋যেকোন সাহায্য জন্য sms করুনnumber. 01758307316

✧══════•❁❀❁•══════✧

🌸𝗕𝗢𝗧 𝗣𝗥𝗘𝗙𝗜𝗫🌸☞︎︎︎☜︎︎︎✰ ${global.config.PREFIX}

♥️𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥♥️ ☞︎︎︎☜︎︎︎✰ Ex 卝 বয়ফ্রেন্ডヅ 

🥳UPTIME🥳

🌪️𝗧𝗢𝗗𝗔𝗬 𝗜𝗦🌪️ ☞︎︎︎☜︎︎︎✰ ${juswa} 

⚡Bot is running⚡ ${hours}:${minutes}:${seconds}.

✅Thanks for using ${global.config.BOTNAME} Bot🖤


🦢🍒••  𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡  •••🌷💞
┏━🕊️━━°❀•°:🎀🧸💙🧸🎀:°•❀°━━💞━┓
🌸✦✧✧✧✧✰🍒Ex 卝 বয়ফ্রেন্ডヅ 🌿✰✧✧✧✧✦🌸
┗━🕊️━━°❀•°:🎀🧸💙🧸🎀:°•❀°━━💞━┛


`,attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.jpg")).on("close",() => callback());
   };
