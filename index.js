const { Client, GatewayIntentBits, EmbedBuilder, Partials } = require('discord.js');
const http = require('http');

// --- RENDER PORT BINDING FIX ---
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

// Using your provided token
const TOKEN = 'MTUwMTExODAyMTc5ODg1NDY3Ng.GPm5zb._24Aek6dop_BV0qw9Sj7U-_Ets8oLIEgCXINJs';

client.once('ready', () => {
    console.log('✅ Mythical Core is now online and listening for doubts!');
    // Setting status to the temporary IP so everyone sees it
    client.user.setActivity('ind1.softhost.in:19144', { type: 3 }); 
});

// --- DM WELCOME FEATURE ---
client.on('guildMemberAdd', async (member) => {
    try {
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#00fbff')
            .setTitle('🔥 Successfully Joined Mythical Network!')
            .setDescription(`Hey ${member.user.username}, welcome to the family!`)
            .addFields(
                { name: '🌐 Temporary IP', value: '`ind1.softhost.in`' },
                { name: '🔌 Port', value: '`19144`' },
                { name: '📅 Launch Status', value: 'VEX SMP IS LIVE!' },
                { name: '🎁 Rewards', value: 'Be one of the first 40 players to join for the Pioneer rewards!' }
            )
            .setFooter({ text: 'Mythical Studios Logic' });

        await member.send({ embeds: [welcomeEmbed] });
        console.log(`✅ Sent welcome DM to ${member.user.tag}`);
    } catch (err) {
        console.log(`❌ Could not DM ${member.user.tag}.`);
    }
});

// --- SMART DOUBT CLEARER ---
client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const msg = message.content.toLowerCase();

    // 1. IP Questions (Updated for Temporary IP)
    if (msg.includes('how to join') || msg.includes('ip') || msg.includes('address')) {
        return message.reply('Current Temporary IP: `ind1.softhost.in` | Port: `19144`. Use this until the main domain finishes updating!');
    }

    // 2. Owner/Staff Questions
    if (msg.includes('owner') || msg.includes('founder') || msg.includes('staff')) {
        return message.reply('The Mythical Network is owned by **Chethan**. Our Lead Admins are **Thaman** and **Pavan** (The Friends Council).');
    }

    // 3. Store Questions
    if (msg.includes('buy') || msg.includes('store') || msg.includes('rank')) {
        return message.reply('Check out our ranks at: `store.mythicalstudios.online` (Wait for DNS update if link is slow!)');
    }

    // 4. Status/Help
    if (msg === '!help' || msg.includes('help me')) {
        const helpEmbed = new EmbedBuilder()
            .setColor('#00fbff')
            .setTitle('Mythical Core | Assistance')
            .setDescription('I can help with the **IP**, **Staff**, **Store**, or **Launch** info.')
            .addFields({ name: 'Current IP', value: '`ind1.softhost.in:19144`' })
            .setFooter({ text: 'Mythical Studios Logic' });
        
        message.reply({ embeds: [helpEmbed] });
    }
});

client.login(TOKEN);
