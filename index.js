const { Client, GatewayIntentBits, EmbedBuilder, Partials } = require('discord.js');
const http = require('http');

// --- RENDER PORT BINDING FIX ---
// This creates a tiny server so Render sees an "Open Port" and doesn't kill the bot.
http.createServer((req, res) => {
    res.write("Mythical Core is Online");
    res.end();
}).listen(10000); 

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages 
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User] 
});

// IMPORTANT: Ensure your Token is set in the Render "Environment Variables" 
// or replace process.env.TOKEN with your string safely.
const TOKEN = process.env.TOKEN || 'MTUwMTExODAyMTc5ODg1NDY3Ng.GLtRjl.eS9atXhmQnymnUHLhgbHO3nWDZPjfw5MAKAI7I';

client.once('ready', () => {
    console.log('✅ Mythical Core is now online and listening for doubts!');
    client.user.setActivity('play.vexsmp.online', { type: 3 }); 
});

// --- DM WELCOME FEATURE ---
client.on('guildMemberAdd', async (member) => {
    try {
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#00fbff')
            .setTitle('🔥 Successfully Joined Mythical Network!')
            .setDescription(`Hey ${member.user.username}, welcome to the family!`)
            .addFields(
                { name: '🌐 Server IP', value: '`play.vexsmp.online`' },
                { name: '📅 Launch Date', value: 'May 6th, 11:00 AM IST' },
                { name: '🎁 Rewards', value: 'Type `!rewards` in the server to see what you can win!' }
            )
            .setFooter({ text: 'Sent by Mythical Studios Logic' });

        await member.send({ embeds: [welcomeEmbed] });
        console.log(`✅ Sent welcome DM to ${member.user.tag}`);
    } catch (err) {
        console.log(`❌ Could not DM ${member.user.tag} (Their DMs might be closed).`);
    }
});

// --- SMART DOUBT CLEARER ---
client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const msg = message.content.toLowerCase();

    // 1. IP Questions
    if (msg.includes('how to join') || msg.includes('ip') || msg.includes('address')) {
        return message.reply('To join the Mythical Network, use the IP: `play.vexsmp.online`. If you are on Bedrock/Mobile, use the same IP with port `19132`!');
    }

    // 2. Owner/Staff Questions
    if (msg.includes('owner') || msg.includes('founder') || msg.includes('staff')) {
        return message.reply('The Mythical Network is owned by **Chethan**. Our Lead Admins are **Thaman** and **Pavan** (The Friends Council).');
    }

    // 3. Store Questions
    if (msg.includes('buy') || msg.includes('store') || msg.includes('rank')) {
        return message.reply('You can check out our ranks and support the server at: `store.mythicalstudios.online`');
    }

    // 4. Status/Help
    if (msg === '!help' || msg.includes('help me')) {
        const helpEmbed = new EmbedBuilder()
            .setColor('#00fbff')
            .setTitle('Mythical Core | Assistance')
            .setDescription('I can answer questions about the **IP**, **Owner**, **Store**, or **Launch**. Just ask me naturally!')
            .setFooter({ text: 'Mythical Studios Logic' });
        
        message.reply({ embeds: [helpEmbed] });
    }
});

client.login(TOKEN);
