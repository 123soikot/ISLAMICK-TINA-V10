const axios = require("axios");
const fs = require("fs-extra"); // fs-extra যোগ করা হয়েছে
const request = require("request");

module.exports.config = {
  name: "i love You",
  version: "1.0.0",
  permission: 0,
  credits: "Rahad",
  description: "",
  prefix: true, 
  commandCategory: "no prefix", 
  usages: "i love You ",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.handleEvent = async ({ api, event }) => {
  const content = event.body ? event.body : '';
  const body = content.toLowerCase();

  if (body.startsWith("i love You ")) {
    const rahad = [
      "_স্ঁর্",
      " তো্ঁ বা্ঁল্ঁ ডা্ঁ"
    ];
    const rahad2 = rahad[Math.floor(Math.random() * rahad.length)];

    const audioLink = "https://voca.ro/15EuretnPwse"; // এখানে অডিও লিঙ্ক দিন

    const callback = () => api.sendMessage({
      body: `${rahad2}`,
      attachment: fs.createReadStream(__dirname + "/cache/2024.mp3")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/2024.mp3"), event.messageID);

    // অডিও ডাউনলোড করে সেভ করা
    request(audioLink).pipe(fs.createWriteStream(__dirname + "/cache/2024.mp3")).on("close", callback);
  }
};

module.exports.languages = {
  "vi": {
    "on": "Dùng sai cách rồi lêu lêu",
    "off": "sv ngu, đã bão dùng sai cách",
    "successText": `🧠`,
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "success!",
  }
};

module.exports.run = async ({ api, event, Threads, getText }) => {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["I love You "] === "undefined") data["ভালোবাসি তোমাকে"] = false;
  else data["bot i love You "] = true;
  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  api.sendMessage(`${data["love you"] ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
};
