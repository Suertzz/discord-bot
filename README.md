# Discord bot

This is a custom bot used for moderation of a discord server with more than ~ 1800 members
Updated and Maintained by Suertzz.

## Requirements

- `git` command line ([Windows](https://git-scm.com/download/win) | [Linux](https://git-scm.com/download/linux) | [MacOS](https://git-scm.com/download/mac)) installed
- `node` [Version 8.X](https://nodejs.org)
- `mongodb` [Link to mongodb](https://www.mongodb.com/fr)


## Downloading

In a command prompt in your projects folder (wherever that may be) run the following:

`git clone git@github.com:Suertzz/discord-bot.git`

Once finished:

- In the folder from where you ran the git command, run `cd discord-bot` and then run `npm install`, which will install the required packages.
- Set an environment variable `BOT_SECRET` with your discord token [Link to discord](https://discord.com/developers/applications)
- Create a database in mongodb and edit the URI in the bot [URI Path](https://github.com/Suertzz/discord-bot/blob/master/app.js#L10)

## Starting the bot

To start the bot, in the command prompt, run the following command:
`node app.js`
