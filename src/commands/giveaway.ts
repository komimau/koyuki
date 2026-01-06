import {
  ChannelType,
  ChatInputCommandInteraction,
  ContainerBuilder,
  MessageFlags,
  SlashCommandBuilder,
  TextDisplayBuilder,
  type GuildTextBasedChannel,
} from 'discord.js'
import { Util } from '../classes'

export default {
  builder: new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('roll a giveaway')
    .addStringOption((option) =>
      option.setName('message_id').setDescription('the message id').setRequired(true)
    )
    .addChannelOption((option) =>
      option.setName('source_channel').setDescription('the source channel').setRequired(false)
    )
    .addChannelOption((option) =>
      option.setName('target_channel').setDescription('the target channel').setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName('emoji_name')
        .setDescription('the name of the emoji (e.g. kmm_mikugold)')
        .setRequired(false)
    )
    .addIntegerOption((option) =>
      option
        .setName('winner_count')
        .setDescription('the amount of winners to select')
        .setMinValue(1)
        .setMaxValue(10)
        .setRequired(false)
    )
    .addBooleanOption((option) =>
      option.setName('include_self').setDescription('include self').setRequired(false)
    )
    .addBooleanOption((option) =>
      option.setName('include_bots').setDescription('include bots').setRequired(false)
    )
    .addUserOption((option) =>
      option.setName('host').setDescription('the giveaway host').setRequired(false)
    )
    .addStringOption((option) =>
      option.setName('prize_1').setDescription('prize_1').setRequired(false)
    )
    .addStringOption((option) =>
      option.setName('prize_2').setDescription('prize_2').setRequired(false)
    )
    .addStringOption((option) =>
      option.setName('prize_3').setDescription('prize_3').setRequired(false)
    )
    .addStringOption((option) =>
      option.setName('prize_4').setDescription('prize_4').setRequired(false)
    )
    .addStringOption((option) =>
      option.setName('prize_5').setDescription('prize_5').setRequired(false)
    )
    .addStringOption((option) =>
      option.setName('prize_6').setDescription('prize_6').setRequired(false)
    )
    .addStringOption((option) =>
      option.setName('prize_7').setDescription('prize_7').setRequired(false)
    )
    .addStringOption((option) =>
      option.setName('prize_8').setDescription('prize_8').setRequired(false)
    )
    .addStringOption((option) =>
      option.setName('prize_9').setDescription('prize_9').setRequired(false)
    )
    .addStringOption((option) =>
      option.setName('prize_10').setDescription('prize_10').setRequired(false)
    ),
  run: async (interaction: ChatInputCommandInteraction) => {
    const messageId = interaction.options.getString('message_id')!
    const sourceChannel = interaction.options.getChannel('source_channel') ?? interaction.channel
    const targetChannel = interaction.options.getChannel('target_channel') ?? interaction.channel
    const emojiName = interaction.options.getString('emoji_name')
    const winnerCount = interaction.options.getInteger('winner_count') ?? 1
    const includeSelf = interaction.options.getBoolean('include_self') ?? false
    const includeBots = interaction.options.getBoolean('include_bots') ?? false
    const host = interaction.options.getUser('host') ?? interaction.user

    const prize1 = interaction.options.getString('prize_1') ?? 'Prize'
    const prize2 = interaction.options.getString('prize_2') ?? prize1
    const prize3 = interaction.options.getString('prize_3') ?? prize2
    const prize4 = interaction.options.getString('prize_4') ?? prize3
    const prize5 = interaction.options.getString('prize_5') ?? prize4
    const prize6 = interaction.options.getString('prize_6') ?? prize5
    const prize7 = interaction.options.getString('prize_7') ?? prize6
    const prize8 = interaction.options.getString('prize_8') ?? prize7
    const prize9 = interaction.options.getString('prize_9') ?? prize8
    const prize10 = interaction.options.getString('prize_10') ?? prize9

    const prizes = [prize1, prize2, prize3, prize4, prize5, prize6, prize7, prize8, prize9, prize10]

    if (!sourceChannel || !targetChannel) {
      await interaction.reply({
        content: 'Missing source or target channel',
        flags: MessageFlags.Ephemeral,
      })
      return
    }

    if (
      (sourceChannel.type !== ChannelType.GuildText &&
        sourceChannel.type !== ChannelType.GuildAnnouncement) ||
      (targetChannel.type !== ChannelType.GuildText &&
        targetChannel.type !== ChannelType.GuildAnnouncement)
    ) {
      await interaction.reply({
        content: 'Source and target channel must be text channels',
        flags: MessageFlags.Ephemeral,
      })
      return
    }

    const sourceTextChannel = sourceChannel as GuildTextBasedChannel
    const targetTextChannel = targetChannel as GuildTextBasedChannel

    const sourceMessage = await sourceTextChannel.messages.fetch(messageId)
    if (!sourceMessage) {
      await interaction.reply({
        content: 'Source message not found',
        flags: MessageFlags.Ephemeral,
      })
      return
    }

    const reactions = sourceMessage.reactions.cache.values().toArray()
    const reaction = reactions.find((r) => r.emoji.name === emojiName) ?? reactions[0]
    if (!reaction) {
      await interaction.reply({
        content: 'Found no reactions',
        flags: MessageFlags.Ephemeral,
      })
      return
    }

    let users = (await reaction.users.fetch()).values().toArray()

    if (!includeSelf) users = users.filter((user) => user.id !== interaction.user.id)
    if (!includeBots) users = users.filter((user) => !user.bot)

    const winnerIndexes = Util.randomIntegers(
      0,
      users.length - 1,
      Math.min(winnerCount, users.length),
      true
    )

    const winnersChosen = users.filter((user, index) => winnerIndexes.includes(index))
    const winnersShuffled = Util.shuffleArray(winnersChosen).slice(0, 10)

    const winners: { id: string; prize: string }[] = []
    for (let i = 0; i < winnersShuffled.length; i++) {
      winners.push({
        id: winnersShuffled[i]!.id,
        prize: prizes[i]!,
      })
    }

    let text = ''
    let currentIndex = 0
    let currentPrize = ''

    while (currentIndex < winners.length) {
      const winner = winners[currentIndex]!
      if (currentPrize !== winner.prize) {
        currentPrize = winner.prize
        text += `### ${currentPrize}\n`
      }

      text += `- \`#${currentIndex + 1}\` <@${winners[currentIndex]!.id}>\n`
      currentIndex += 1
    }

    text += `\n-# Selected ${winners.length} winner${winners.length === 1 ? '' : 's'} out of ${users.length} total, thanks for participating!`
    text += `\n-# Please message <@${host.id}> within 48 hours to claim your prize.`

    const targetMessage = await targetTextChannel.send({
      components: [
        new TextDisplayBuilder().setContent(`## Giveaway Winners`),
        new ContainerBuilder().addTextDisplayComponents(new TextDisplayBuilder().setContent(text)),
      ],
      flags: MessageFlags.IsComponentsV2,
    })

    await interaction.reply({
      content: 'Sent giveaway winners to target channel',
      flags: MessageFlags.Ephemeral,
    })

    await targetMessage.react('<:kmm_tada:926630877826523207>')
  },
}
