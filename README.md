# Discord Youtube Notifier Bot
 A bot which notifies your Discord Server about new youtube uploads on the channels mentioned


## Configuration and Self Hosting
1) Clone this repository
2) This bot uses yarn as a package manager, however you can use npm, just download all the packages mention in package.json using npm.
3) Enter the details mentioned below in your config.json file in the src folder
4) Run the bot using node src/index.js


## Config
1) Go to src/config.json

```
{
    "mongoURI": "",
    "YTCH": [],
    "DiscordChannelID": "",
    "DiscordRoleID": "",
    "token": ""
}
```
a) **mongoURI** is the MongoDB cluster's uri which would be used to save the posted videos to.

b) **YTCH** is an array of Youtube Channel IDs of the channels you want to get notifications of. YouTube Channel ID would be the text after https://youtube.com/channel/text here. If you still can't figure out how to get your youtube channel ID, follow this tutorial: https://support.google.com/youtube/answer/3250431?hl=en

c) **DiscordChannelID** is the Channel ID of your Discord Server to post notifications to.

d) **DiscordRoleID** is the **ID** of the role you want to ping when a new video is uploaded

e) **token** is the Discord Bot Token, which you can find at Discord Developer Portal in the bot section of your app.


## Dependencies Used:
1) [quickmongo](https://www.npmjs.com/package/quickmongo), version 3.0.0 
2) [rss-parser](https://www.npmjs.com/package/rss-parser), version 3.10.0
3) [discord.js](https://www.npmjs.com/package/discord.js), version 12.5.0

### Feel Free to DM me on Discord: FC#5570, if you have any issues while setting up the bot.