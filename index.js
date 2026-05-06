const { Client, GatewayIntentBits, EmbedBuilder, Partials, ActivityType } = require('discord.js');
const http = require('http');

// --- PERMANENT SERVER BINDING ---
// Port 3000 is standard for Heaven Cloud/Local hosting
http.createServer((req, res) => {
    res.write("Mythical Core is Online");
    res.end();
}).listen(process.env.PORT || 3000); 

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

const TOKEN = 'MTUwMTExODAyMTc5ODg1NDY3Ng.GPm5zb._24Aek6dop_BV0qw9Sj7U-_Ets8oLIEgCXINJs';

// Configuration: Replace with your actual Channel ID for public join messages
const WELCOME_CHANNEL_ID = 'YOUR_CHANNEL_ID_HERE'; 

client.once('ready', () => {
    console.log('✅ Mythical Core (V2.0) is online!');
    client.user.setActivity('play.vexsmp.online', { type: ActivityType.Playing }); 
});

// --- NEW: AUTO-MODERATION & JOIN FEATURE ---
client.on('guildMemberAdd', async (member) => {
    // 1. Send Private DM (Existing)
    try {
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#00fbff')
            .setTitle('🔥 Joined Mythical Network!')
            .setDescription(`Hey ${member.user.username}, welcome! IP: play.vexsmp.online`)
            .setFooter({ text: 'Mythical Studios Logic' });
        await member.send({ embeds: [welcomeEmbed] });
    } catch (err) { console.log("User has DMs off."); }

    // 2. Send Public Join Message (New)
    const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
    if (channel) {
        channel.send(`🚀 **${member.user.username}** just landed in Mythical Network! No staff online? Ask me anything!`);
    }
});

// --- SMART AUTO-REPLY & CLIENT FIXES ---
client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    const msg = message.content.toLowerCase();

    // --- CLIENT SIDE SOLUTIONS ---
    if (msg.includes('lag') || msg.includes('fps')) {
        return message.reply('**Client Fix:** Install **Sodium** and **Lithium** (Fabric) or use **Optifine**. Set your render distance to 8 chunks for better FPS!');
    }
    
    if (msg.includes('connection') || msg.includes('timed out') || msg.includes('io.netty')) {
        return message.reply('**Connection Fix:** \n1. Restart your Minecraft. \n2. Check if your Firewall is blocking Java. \n3. Use IP: `165.99.53.228:19144` if the domain is slow.');
    }

    if (msg.includes('crash') || msg.includes('not opening')) {
        return message.reply('**Launch Fix:** Ensure you are using **Java 17 or 21** for Minecraft 1.20+. Also, check your `.minecraft/logs` folder for the error!');
    }

    // --- AUTO-MODERATION (NO STAFF ACTION) ---
    const badWords = ['hack', 'cheat', 'xray']; // Add your own list
    if (badWords.some(word => msg.includes(word))) {
        message.delete();
        return message.channel.send(`🚫 **Auto-Mod:** ${message.author}, discussing cheats is strictly forbidden. This incident has been logged.`);
    }

    // --- GENERAL INFO ---
    if (msg.includes('ip') || msg.includes('join')) {
        return message.reply('**IP:** `play.vexsmp.online` | **Port:** `19144`');
    }

    if (msg.includes('owner') || msg.includes('staff')) {
        return message.reply('Owner: **Chethan** | Admins: **Thaman** & **Pavan**. Open a ticket if you need urgent help!');
    }
});

client.login(TOKEN);
