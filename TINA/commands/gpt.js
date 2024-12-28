const axios = require("axios");

module.exports.config = {
  name: "gpt",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Your Name",
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
const GEMINI_API_KEY = "AIzaSyCBiwga-es79h9dON00lzk2mvE9HvQkhz4"; // Replace with a secure key

// Handle image processing
async function handleImage(api, event, imageUrl, query, thinkingMessageID) {
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
      await api.editMessage(formattedResponse, thinkingMessageID);
    } else {
      throw new Error("Invalid Gemini response");
    }
  } catch (error) {
    console.error("Image processing error:", error.message);
    await api.editMessage("❌ | Sorry, I couldn't process the image.", thinkingMessageID);
  }
}

module.exports.run = async function ({ api, event, args }) {
  const threadID = event.threadID;
  const messageID = event.messageID;

  const thinkingMessage = await api.sendMessage("🤔 Thinking...", threadID, messageID);
  const thinkingMessageID = thinkingMessage.messageID;

  if (event.messageReply && event.messageReply.attachments.length > 0) {
    const imageUrl = event.messageReply.attachments[0].url;
    const query = args.length > 0 ? args.join(" ") : "Please describe this image.";
    await handleImage(api, event, imageUrl, query, thinkingMessageID);
    return;
  }

  if (args.length === 0) {
    await api.editMessage("❌ | Please provide a question or reply to an image.", thinkingMessageID);
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
      await api.editMessage(formattedResponse, thinkingMessageID);
    } else {
      throw new Error("Invalid GPT-4O response");
    }
  } catch (error) {
    console.error("Text processing error:", error.message);
    await api.editMessage("❌ | Sorry, I couldn't get a response from GPT.", thinkingMessageID);
  }
};
