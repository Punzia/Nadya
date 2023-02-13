//const { channel } = require('diagnostics_channel');
const { Client, GatewayIntentBits, ActivityType, ChannelType, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { token, userID } = require("./config.json")

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        activities: [{ name: `Atomic Heart 💛`, type: ActivityType.Playing }],
        status: 'idle',
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const embedTitle = "| Nadya ⍟"

    if (interaction.commandName === 'create') {
        if (interaction.user.id === userID) {
            if (interaction.options.getSubcommand() === 'textchannel') {
                const name = interaction.options.get("name").value;
                const icon = interaction.options.get("icon").value;
                const channel = await interaction.guild.channels
                    .create({ //Create a channel
                        name: `${icon}・${name}`,
                        type: ChannelType.GuildText
                    })
                const { id } = channel;
                const channelEmbed = new EmbedBuilder()
                    .setColor("0xFCD53F")
                    .setAuthor({ name: embedTitle, iconURL: client.user.avatarURL(), })
                    .setTitle('📢・Created Text Channel! 💬')
                    .setThumbnail("https://i.imgur.com/oryqgGo.png")
                    .setDescription(`➜ 💬 Created a new text channel: <#${id}>!`)
                    .setTimestamp()
                //await interaction.reply(`Created channel: <#${id}>`)
                await interaction.reply({ embeds: [channelEmbed] })
            }
            // Create a voice channel!
            if (interaction.options.getSubcommand() === 'voicechannel') {
                const name = interaction.options.get("name").value;
                const icon = interaction.options.get("icon").value;
                const channel = await interaction.guild.channels
                    .create({ //Create a channel
                        name: `${icon}・${name}`,
                        type: ChannelType.GuildVoice
                    })
                const { id } = channel;
                const channelEmbed = new EmbedBuilder()
                    .setColor("0xFCD53F")
                    .setAuthor({ name: embedTitle, iconURL: client.user.avatarURL(), })
                    .setTitle('📢・Created Voice Channel! 🔊')
                    .setThumbnail("https://i.imgur.com/oryqgGo.png")
                    .setDescription(`➜ 🔊 Created a new voice channel: <#${id}>!`)
                    .setTimestamp()
                //await interaction.reply(`Created channel: <#${id}>`)
                await interaction.reply({ embeds: [channelEmbed] })
            
            }
            if (interaction.options.getSubcommand() === 'category') {
                await interaction.reply('Create category!')   
            }
        }
        else {
            await interaction.reply("You are not my developer! 😡")
        }


    }
});

client.login(token);