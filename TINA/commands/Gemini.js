const axios = require("axios");

const baseApiUrl = async () => {
  try {
    const base = await axios.get(
      `https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`
    );
    return base.data.api;
  } catch (error) {
    console.error("Failed to fetch base API URL:", error.message);
    throw new Error("Unable to fetch base API URL");
  }
};

module.exports.config = {
  name: "Riya",
  version: "1.0.0",
  permission: 0,
  credits: "dipto",
  description: "Gemini AI with multiple conversation",
  prefix: "awto",
  usages: "[message]",
  commandCategory: "AI",
  coolddowns: 5,
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  const { author } = handleReply;
  if (author !== event.senderID) return;

  const uid = event.senderID;
  if (event.type === "message_reply") {
    const reply = event.body.toLowerCase();
    if (isNaN(reply)) {
      try {
        const response = await axios.get(
          `${await baseApiUrl()}/gemini2?text=${encodeURIComponent(reply)}&senderID=${uid}`
        );
        const ok = response.data.response;
        await api.sendMessage(
          ok,
          event.threadID,
          (error, info) => {
            if (error) {
              console.error("Error sending message:", error.message);
            } else {
              global.client.handleReply.push({
                commandName: this.config.name,
                type: "reply",
                messageID: info.messageID,
                author: event.senderID,
                link: ok,
              });
            }
          },
          event.messageID
        );
      } catch (error) {
        console.error("Error while processing reply:", error.message);
      }
    }
  }
};

module.exports.run = async function ({ api, args, event }) {
  const uid = event.senderID;
  try {
    const dipto = args.join(" ").toLowerCase();
    if (!args[0]) {
      api.sendMessage(
        "Please provide a question to answer\n\nExample:\ngemini2 hey",
        event.threadID,
        event.messageID
      );
      return;
    }
    if (dipto) {
      const response = await axios.get(
        `${await baseApiUrl()}/gemini2?text=${encodeURIComponent(dipto)}&senderID=${uid}`
      );
      const mg = response.data.response;
      await api.sendMessage(
        { body: mg },
        event.threadID,
        (error, info) => {
          if (error) {
            console.error("Error sending message:", error.message);
          } else {
            global.client.handleReply.push({
              commandName: this.config.name,
              type: "reply",
              messageID: info.messageID,
              author: event.senderID,
              link: mg,
            });
          }
        },
        event.messageID
      );
    }
  } catch (error) {
    console.error(`Failed to get an answer: ${error.message}`);
    api.sendMessage(
      `An error occurred: ${error.message}`,
      event.threadID,
      event.messageID
    );
  }
};
