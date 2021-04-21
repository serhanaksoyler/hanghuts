const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '*';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready' , () => {
    client.user.setActivity("*help",{
        type: "PLAYING"
    })
    console.log('hanghuts is now online!');
});

client.on('message' , message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if (command === 'invite'){
        client.commands.get('invite').execute(message, args);
    } else if (command === 'clear'){
        client.commands.get('clear').execute(message, args);
    }
});

client.login('ODM0MTA3MjIxNTI0MDg2Nzg0.YH8E4g.imsmVawhz1HSAJ9RLVO1pNVhPUU');