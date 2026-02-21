require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { calc, fmtPct, fmtOneIn } = require("./dry");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== "dry") return;

  const chanceInput = interaction.options.getString("chance", true);
  const kills = interaction.options.getInteger("kills", true);
  const obtained = interaction.options.getInteger("obtained") ?? 0;

  const res = calc(chanceInput, kills, obtained);
  if (res.error) {
    await interaction.reply({ content: `❌ ${res.error}`, ephemeral: true });
    return;
  }

  const dropPct = (res.chance * 100).toFixed(2);
  const oneIn = 1 / res.chance;
  
  const lines = [
    `You killed ${res.kills} times for an item with drop chance ${dropPct}% (${fmtOneIn(oneIn)}).`,
    `Expected drops: ${res.expected.toFixed(3)}`,
    `• Exactly no items: ${(res.pExact * 100).toFixed(2)}% (${fmtOneIn(1 / res.pExact)})`,
    `• More than 0 items: ${(res.pMore * 100).toFixed(2)}% (${fmtOneIn(1 / res.pMore)})`,
    "",
    res.flavour
  ].filter(Boolean);

  await interaction.reply({ content: lines.join("\n") });
});

client.login(process.env.BOT_TOKEN);