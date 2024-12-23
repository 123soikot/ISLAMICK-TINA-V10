module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  hasPermssion: 0,
  usePrefix: true,
  credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
  description: "given prefix detail",
  commandCategory: "Dành cho Admin",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  var { threadID, messageID, body, senderID } = event;
  if ((this.config.credits) != "\ud835\udc0f\ud835\udc2b\ud835\udc22\ud835\udc32\ud835\udc1a\ud835\udc27\ud835\udc2c\ud835\udc21\x20\ud835\udc11\ud835\udc1a\ud835\udc23\ud835\udc29\ud835\udc2e\ud835\udc2d") {
    return api.sendMessage(`\x41\x67\x61\x69\x6e\x20\x63\x68\x61\x6e\x67\x65\x20\x63\x72\x65\x64\x69\x74\x20\x74\x6f\x20\ud835\udc0f\ud835\udc2b\ud835\udc22\ud835\udc32\ud835\udc1a\ud835\udc27\ud835\udc2c\ud835\udc21\x20\ud835\udc11\ud835\udc1a\ud835\udc23\ud835\udc29\ud835\udc2e\ud835\udc2d`, threadID, messageID);
  }

  function out(data) {
    api.sendMessage(data, threadID, messageID);
  }

  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  var arr = ["mpre", "mprefix", "prefix", "dấu lệnh", "prefix của bot là gì", "daulenh", "duong", "what prefix", "freefix", "what is the prefix", "bot dead", "bots dead", "where prefix", "what is bot", "what prefix bot", "how to use bot", "how use bot", "where are the bots", "bot not working", "bot is offline", "where prefix", "prefx", "prfix", "prifx", "perfix", "bot not talking", "where is bot"];
  
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() || body === i || str === body) {
      const prefix = threadSetting.PREFIX || global.config.PREFIX;
      const videoLink = "https://i.imgur.com/geRQoeB.mp4"; // Imgur লিংক এখানে যোগ করুন

      if (data.PREFIX == null) {
        api.sendMessage({
          body: `This Is My Prefix ⇉ [ ${prefix} ]\n💝🥀𝐎𝐖𝐍𝐄𝐑:- ☞Ex 卝 বয়ফ্রেন্ডヅ☜ 💫\n🖤𝚈𝚘𝚞 𝙲𝚊𝚗 𝙲𝚊𝚕𝚕 𝙷𝚒𝚖 Ex 卝 বয়ফ্রেন্ডヅ🖤\n😳𝐇𝐢𝐬 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐢𝐝🤓:- ☞ https://www.facebook.com/mdsakhoyat.hosen.9\n👋For Any Kind Of Help Contact On Telegram Username @Fasul23😇`,
          attachment: await global.utils.getStreamFromURL(videoLink)
        }, threadID, messageID);
      } else {
        api.sendMessage({
          body: `️️️️️️️️️️️️️️️️️️️️️️️️️️️This Is My Prefix ⇉ [ ${prefix} ]\n💝🥀𝐎𝐖𝐍𝐄𝐑:- ☞SOIKOT☜ 💫\n🖤𝚈𝚘𝚞 𝙲𝚊𝚗 𝙲𝚊𝚕𝚕 𝙷𝚒𝚖 🖤\n😳𝐇𝐢𝐬 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐢𝐝🤓:- ☞ https://www.facebook.com/mdsakhoyat.hosen.9\n👋For Any Kind Of Help Contact On Telegram Username @Fasul23 😇`,
          attachment: await global.utils.getStreamFromURL(videoLink)
        }, threadID, messageID);
      }
    }
  });
};

module.exports.run = async ({ event, api }) => {
  return api.sendMessage("error", event.threadID);
};
