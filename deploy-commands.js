require("dotenv").config();
const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const command = new SlashCommandBuilder()
  .setName("dry")
  .setDescription("Calculate OSRS dryness/drop odds.")
  .addStringOption(opt =>
    opt.setName("chance")
      .setDescription('Like "1/128" or "128" (means 1/128) or "0.0078125"')
      .setRequired(true)
  )
  .addIntegerOption(opt =>
    opt.setName("kills")
      .setDescription("Killcount / attempts")
      .setRequired(true)
      .setMinValue(1)
  )
  .addIntegerOption(opt =>
    opt.setName("obtained")
      .setDescription("How many drops obtained")
      .setRequired(false)
      .setMinValue(0)
  );

(async () => {
  const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);
  await rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    { body: [command.toJSON()] }
  );
  console.log("Slash command deployed.");
})();