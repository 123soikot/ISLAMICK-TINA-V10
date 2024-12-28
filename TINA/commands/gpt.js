module.exports.config = {
  name: "gpt",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SOIKOT",
  description: "Ask GPT anything or describe an image.",
  commandCategory: "AI",
  usages: "[question] or reply to an image",
  cooldowns: 5,
  dependencies: {
    "axios": ""
  }
};

const axios = require("axios");

// Format response to Gothic style
function formatResponse(response) {
  return response.replace(/\*\*(.*?)\*\*/g, (match, p1) => global.convertToGothic(p1));
}

// Handle image processing
async function handleImage(api, event, imageUrl, query, thinkingMessageID) {
  const geminiUrl = `https://deku-rest-api.gleeze.com/gemini?prompt=${encodeURIComponent(query)}&url=${encodeURIComponent(imageUrl)}`;
  try {
    const { data } = await axios.get(geminiUrl);
    const formattedResponse = `🤖 | 𝗖𝗛𝗔𝗧-𝗚𝗣𝗧-𝟰𝗢
━━━━━━━━━━━━━━━━━━
${formatResponse(data.gemini)}
━━━━━━━━━━━━━━━━━━`;
    await api.editMessage(formattedResponse, thinkingMessageID);
  } catch (error) {
    await api.editMessage(global.convertToGothic("❌ | Sorry, I couldn't process the image."), thinkingMessageID);
  }
}

module.exports.run = async function ({ api, event, args }) {
  const threadID = event.threadID;
  const messageID = event.messageID;

  // Send a "Thinking..." message
  const thinkingMessage = await api.sendMessage(global.convertToGothic("Thinking... 🤔"), threadID, messageID);
  const thinkingMessageID = thinkingMessage.messageID;

  // If the user replies to an image
  if (event.messageReply && event.messageReply.attachments.length > 0) {
    const imageUrl = event.messageReply.attachments[0].url;
    const query = args.length > 0 ? args.join(" ") : "Please describe this image.";
    await handleImage(api, event, imageUrl, query, thinkingMessageID);
    return;
  }

  // If the user asks a text question
  if (args.length === 0) {
    return api.sendMessage(global.convertToGothic("Please provide a question or reply to an image."), threadID, messageID);
  }

  const query = args.join(" ");
  const userId = event.senderID;
  const apiUrl = `https://deku-rest-api.gleeze.com/api/gpt-4o?q=${encodeURIComponent(query)}&uid=${userId}`;

  try {
    const { data } = await axios.get(apiUrl);
    const formattedResponse = `🤖 | 𝗖𝗛𝗔𝗧-𝗚𝗣𝗧-𝟰𝗢
━━━━━━━━━━━━━━━━━━
${formatResponse(data.result)}
━━━━━━━━━━━━━━━━━━`;

    await api.editMessage(formattedResponse, thinkingMessageID);
  } catch (error) {
    await api.editMessage(global.convertToGothic("❌ | Sorry, I couldn't get a response from GPT."), thinkingMessageID);
  }
};
