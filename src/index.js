const Parser = require("rss-parser");
const parser = new Parser();
const config = require("./config.json");
const { Database } = require("quickmongo");
const db = new Database(config.mongoURI);

const { Client } = require("discord.js");
const client = new Client({
  disableMentions: "everyone",
});

db.on("ready", () => {
  console.log("Connected to the database.");
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (message) => {
  setInterval(handleUploads, 20000);

  async function handleUploads() {
    if ((await db.fetch(`postedVids`)) === null) db.set(`postedVids`, []);
    config.YTCH.forEach(async (youtuber) => {
      let video = await parser.parseURL(
        `https://www.youtube.com/feeds/videos.xml?channel_id=${youtuber}`
      );
      if (!video) return;
      if (await db.fetch(`postedVideos`).includes(video.items[0].link)) return;
      else {
        db.push("postedVideos", video.items[0].link);

        let channel = client.channels.cache.get(config.DiscordChannelID);
        if (!channel) return;

        let role = message.guild.roles.cache.get(config.DiscordRoleID);
        if (!role)
          return client.users
            .fetch(message.guild.ownerID)
            .then((m) =>
              m.send(
                `An error occured when trying to post a notification to your server about a new upload on the channel: **${video.items[0].author}**. The role saved in the database to notify about the upload doesn't exist in your server or was deleted.`
              )
            );

        channel.send(
          `Hello ${role}, **${video.items[0].author}** just uploaded a new video: **${video.items[0].title}** on YouTube, go check it out!\n${video.items[0].link}`
        );
      }
    });
  }
});

client.login(config.token);
