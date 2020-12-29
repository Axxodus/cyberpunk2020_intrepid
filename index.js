const Discord = require('discord.js')
const client = new Discord.Client()
const dotenv = require("dotenv")
const fs = require('fs')
const path = require('path')
const config = require('./config.json')

dotenv.config()
prefix = config.prefix
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log("Connected as INTR3PID!")
})

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)){
        message.reply('Sorry, that command does not exist')
        return
    }
    
    const command = client.commands.get(commandName)

    try {
	    command.execute(message, args);
    } catch (error) {
	    console.error(error);
	    message.reply('there was an error trying to execute that command!');
    }
})

client.login(process.env.BOT_SECRET)

