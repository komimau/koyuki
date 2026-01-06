import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { Bot } from '../classes'

export default {
  builder: new SlashCommandBuilder().setName('help').setDescription('shows help information'),
  run: async (interaction: ChatInputCommandInteraction) => {
    const pfpUrl = Bot.client.user?.displayAvatarURL() ?? ''

    const choices = [
      "here are some commands you won't find useful",
      "don't try any of these at home",
      "sorry i don't provide mental </help:1255271589403037757>",
      "looking for your mom? don't worry she's in good hands",
      "don't even bother using these commands",
      "i'm not here to </help:1255271589403037757> you",
      'did you get dropped as a child?',
      'NIHAHAHAHAHAHAAHAHHHAHAHHHAAAHHHAHAAHAHAHAHAHAHAHAHAHAHHAHAHAHAHAAHAHAHAHAHAHHAHHAHHAHAHHAH',
      'yippie',
    ]
    const choice = choices[Math.floor(Math.random() * choices.length)]

    const embed = new EmbedBuilder()
      .setTitle('Help Information')
      .setColor(0xfdc7de)
      .setDescription(
        `${choice} <:kmm_nihahahaha:1224150517710589982>

- </ping:1255267002306531358> - replies with pong
- </help:1255271589403037757> - shows help information

delivering the rot straight to your brain:
- </groupchat:1346212564102676543> - who's available to play
- </tryitandsee:1288506220784648297> - it's tempting, isn't it?
- </nihahahaha:1255271589403037758> - a koyuki special
- </shikanoko:1303734617269997601> - don't let her out!
- </burnice:1303734617269997602> - three, two, one, fire!
- </haidomo:1329077700501176410> - haidomo kizuna ai desu`
      )
      .setThumbnail(pfpUrl)

    await interaction.reply({ embeds: [embed] })
  },
}
