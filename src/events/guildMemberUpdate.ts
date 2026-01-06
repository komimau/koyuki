import { EmbedBuilder, Events, GuildMember, type PartialGuildMember } from 'discord.js'
import { Bot } from '../classes'

interface Interest {
  role: string
  text: string
}

const verifiedId = '801491812568006657'
const welcomeChannelId = '801463091824951356'
const welcomerId = '801636676249452584'

const interestsThreads: Interest[] = [
  // threads
  { role: '801631340109627414', text: '<#1169036166230720583>' }, // valorant
  { role: '1253829645007065182', text: '<#1250772330607542376>' }, // strinova
  { role: '1102296526891520142', text: '<#1169074705676914709>' }, // honkai star rail
  { role: '1241690379464736851', text: '<#1173020947436019832>' }, // wuthering waves
  { role: '801640119052402688', text: '<#1169064954326941717>' }, // genshin impact
  { role: '801631283587186709', text: '<#1168646982659751976>' }, // league of legends
  { role: '1230987834534662174', text: '<#1230571814678302832>' }, // helldivers 2
  { role: '1257661781090893904', text: '<#1169981559173038240>' }, // zenless zone zero

  // channels
  { role: '801631281220681738', text: '<#918869060077359134>' }, // minecraft
]

const interestsChannels: Interest[] = [
  {
    role: '801631245997178931',
    text: 'We have a dedicated <#801542405295308871> channel with many useful bots.',
  }, // osu
]

async function checkVerified(oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) {
  if (newMember.user.bot) return

  const oldRoles = oldMember.roles.cache.map((role) => role.id)
  const newRoles = newMember.roles.cache.map((role) => role.id)

  const oldUnverified = !oldRoles.includes(verifiedId)
  const newVerified = newRoles.includes(verifiedId)

  const obtainedRole = oldUnverified && newVerified

  if (obtainedRole) {
    const welcomeChannel = await newMember.guild.channels.fetch(welcomeChannelId)
    if (welcomeChannel === null) {
      console.error('welcome channel not found')
      return
    }

    if (welcomeChannel.isTextBased()) {
      let waveEmoji = Bot.client.emojis.cache
        .find((emoji) => emoji.id === '900806481216147487')
        ?.toString()
      if (waveEmoji === undefined) waveEmoji = '<:kmm_wave:900806481216147487>'

      const content = `<@&${welcomerId}>, <@${newMember.id}> joined and is now verified! Give them a warm welcome! ${waveEmoji}`

      let description = '- More roles at <id:customize>!'

      const interestedThreads: string[] = []

      for (const interest of interestsThreads) {
        if (newRoles.includes(interest.role)) interestedThreads.push(interest.text)
      }

      if (interestedThreads.length > 0) {
        description += '\n- Games you play: ' + interestedThreads.join(', ')
      }

      for (const interest of interestsChannels) {
        if (newRoles.includes(interest.role)) description += `\n- ${interest.text}`
      }

      description += '\n- You can find more specific games at <#1168586982562201600>!'

      const embed = new EmbedBuilder()
        .setTitle(`Hi ${newMember.user.username}, you might be interested in:`)
        .setDescription(description)
        .setColor(0xfdc7de)
        .setThumbnail(newMember.user.displayAvatarURL())

      try {
        await welcomeChannel.send({ content, embeds: [embed] })
      } catch (e) {
        console.error(e)
      }
    }
  }
}

async function checkBoosted(oldMember: GuildMember | PartialGuildMember, newMember: GuildMember) {
  if (newMember.user.bot) return
  if (newMember.premiumSinceTimestamp === null) return

  const hasBoosted = oldMember.premiumSinceTimestamp !== newMember.premiumSinceTimestamp
  if (!hasBoosted) return

  const channelId = '801463091824951356'
  const channel = await newMember.guild.channels.fetch(channelId)

  if (channel === null) {
    console.error('boost channel not found')
    return
  }

  if (channel.isTextBased()) {
    const content = `<@${newMember.id}> has boosted the server! Thank you! 🎉`

    try {
      await channel.send(content)
    } catch (e) {
      console.error(e)
    }
  }
}

export default async () => {
  Bot.client.on(Events.GuildMemberUpdate, async (oldMember, newMember) => {
    checkVerified(oldMember, newMember)
    checkBoosted(oldMember, newMember)
  })
}
