const axios = require('axios');

module.exports.config = {
  name: "gpt4",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "সৈকত",
  description: "Ask anything to GPT-4.",
  commandCategory: "AI",
  usages: "[question]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  // প্রশ্ন চেক করুন
  if (!args[0]) {
    return api.sendMessage("⚠️ দয়া করে একটি প্রশ্ন লিখুন!", event.threadID, event.messageID);
  }

  const query = args.join(" "); // ইউজারের প্রশ্ন
  const apiUrl = `https://deku-rest-api-3ijr.onrender.com/gpt4?prompt=${encodeURIComponent(query)}`;

  try {
    // API কল
    const response = await axios.get(apiUrl);

    // API রেসপন্স
    const gptResponse = response.data.response; // নিশ্চিত করুন যে API ফর্ম্যাট এইভাবে আছে

    return api.sendMessage(`🤖 GPT-4 Response:\n\n${gptResponse}`, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    return api.sendMessage("⚠️ GPT-4 API এর সাথে সংযোগ স্থাপন করতে ব্যর্থ হয়েছে। দয়া করে পরে আবার চেষ্টা করুন।", event.threadID, event.messageID);
  }
};
