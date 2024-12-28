const axios = require("axios");

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

// Format response function
function formatResponse(response) {
  return response.replace(/\*\*(.*?)\*\*/g, "$1");
}

// API Key
const GEMINI_API_KEY = "AIzaSyCBiwga-es79h9dON00lzk2mvE9HvQkhz4"; // Replace with your API key

// Handle image processing
async function handleImage(api, event, imageUrl, query) {
  try {
    const geminiUrl = `https://api.gemini.com/analyze?prompt=${encodeURIComponent(query)}&url=${encodeURIComponent(imageUrl)}`;
    const { data } = await axios.get(geminiUrl, {
      headers: {
        "Authorization": `Bearer ${GEMINI_API_KEY}`
      }
    });

    if (data.gemini) {
      const formattedResponse = `🤖 | Gemini AI Response
━━━━━━━━━━━━━━━━━━
${formatResponse(data.gemini)}
━━━━━━━━━━━━━━━━━━`;
      await api.sendMessage(formattedResponse, event.threadID, event.messageID);
    } else {
      throw new Error("Invalid Gemini response");
    }
  } catch (error) {
    console.error("Image processing error:", error.message);
    await api.sendMessage("❌ | Sorry, I couldn't process the image.", event.threadID, event.messageID);
  }
}

module.exports.run = async function ({ api, event, args }) {
  const threadID = event.threadID;
  const messageID = event.messageID;

  if (event.messageReply && event.messageReply.attachments.length > 0) {
    const imageUrl = event.messageReply.attachments[0].url;
    const query = args.length > 0 ? args.join(" ") : "Please describe this image.";
    await handleImage(api, event, imageUrl, query);
    return;
  }

  if (args.length === 0) {
    await api.sendMessage("❌ | Please provide a question or reply to an image.", threadID, messageID);
    return;
  }

  const query = args.join(" ");
  const apiUrl = `https://api.gemini.com/ask?q=${encodeURIComponent(query)}`;

  try {
    const { data } = await axios.get(apiUrl, {
      headers: {
        "Authorization": `Bearer ${GEMINI_API_KEY}`
      }
    });

    if (data.result) {
      const formattedResponse = `🤖 | GPT-4O AI Response
━━━━━━━━━━━━━━━━━━
${formatResponse(data.result)}
━━━━━━━━━━━━━━━━━━`;
      await api.sendMessage(formattedResponse, threadID, messageID);
    } else {
      throw new Error("Invalid GPT-4O response");
    }
  } catch (error) {
    console.error("Text processing error:", error.message);
    await api.sendMessage("❌ | Sorry, I couldn't get a response from GPT.", threadID, messageID);
  }
};
