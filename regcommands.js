const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    /*
    new SlashCommandBuilder()
        .setName('createchannel')
        .setDescription('Create guild channel!')
        .addStringOption(option =>
            option.setName('icon')
                .setDescription('Either an emojii or symbol.')
                .setRequired(true))
        //.setAutocomplete(true)
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name for the textchannel!')
                .setRequired(true)),
                */
    // ---------------------------------------
    // https://discordjs.guide/slash-commands/advanced-creation.html#subcommands
    new SlashCommandBuilder()
        .setName('create')
        .setDescription('A create command for the guild!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('textchannel')
                .setDescription('Create a text channel!')
                .addStringOption(option =>
                    option.setName('icon')
                        .setDescription('Either an emojii or symbol.')
                        .setRequired(true))
                //.setAutocomplete(true)
                .addStringOption(option =>
                    option.setName('name')
                        .setDescription('Name for the text channel!')
                        .setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('voicechannel')
                .setDescription('Create a voice channel!')
                .addStringOption(option =>
                    option.setName('icon')
                        .setDescription('Either an emojii or symbol.')
                        .setRequired(true))
                //.setAutocomplete(true)
                .addStringOption(option =>
                    option.setName('name')
                        .setDescription('Name for the voice channel!')
                        .setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('category')
                .setDescription('Create a category!')
                .addStringOption(option =>
                    option.setName('name')
                        .setDescription('Type the name of the category!')
                        .setRequired(true))
        )
        /*
        .addSubcommand(subcommand =>
            subcommand
                .setName('voicechannel')
                .setDescription('Info about a user')
                .addStringOption(option =>
                    option.setName('target')
                        .setDescription('The user')
                        .setRequired(true))
        )
        */
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);