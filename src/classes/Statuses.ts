import { ActivityType } from 'discord.js'
import { Bot } from '../classes'

export default class Status {
  private static INTERVAL_MS = 1000 * 30

  private static statuses = [
    'nihahahaha',
    'i love komimau',
    'wiggles your balls',
    'unwiggles your balls',
    'AaAaAaAAaAaAAaAaAaAaAAaAaAAaAaAaAaAAaAaAAa',
    'whoever reads Statuses is gay',
    'omg it migu',
    'busy with your mom rn',
    '🍀',
    '69',
    'ちんちん小さいですね',
    '💵',
    'i only speak facts',
    'yuri',
    'i have an onlyfans',
    "it's only $5 a month",
    "fuck",
    "i'm the best",
    'h',
    "i've seen your porn collection",
    '¿pero qué pasa?',
    "i'm gonna jump",
    'who cares?',
    '🐢',
    'why so serious?',
    'you know the rules, and so do i',
    "don't even think about it",
    "i'll lick your armpits",
    'yaoi',
    "i'm broke, give money",
    'i sell feet pics',
    '🍋🍈🍪🍋🍈🍪🍋🍈🍋🍈🍪🍋🍈🍪🍪',
    'so based 🗿',
    'https://youtu.be/dQw4w9WgXcQ',
    "you can't fix me",
    "i can fix you",
    'bitch',
    'fuck',
    'discord.gg/komimau',
    '3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534',
    'NIHAHAHAHHAHAHAHAHAHAHHAHAHAHHAHAHA',
    'get shit on',
    '727',
    'when you see it',
    'komimau tentacle hentai when?',
    '💀🔫',
    '鬱',
    'depression',
    '190.102.79.253',
    'sob',
    '🍦🍧🍨🍩🍪🎂🍰🧁🥧🍫🍭',
    'i like pink',
    'lesbian sex',
    "what're you looking at?",
    "i'll fuck you up",
    'a',
    'switch to linux',
    'english or spanish',
    'lemon melon cookie lemon melon cookie lemon melon lemon melon cookie lemon melon cookie cookie',
    'fucks your mom',
    'unfucks your mom',
    '🛹',
    'i could be your therapist',
    'best day of my life',
    'worst day of my life',
    'fudge',
    'fight me bitch',
    "you're funny",
    "don't take me seriously",
    '6-7',
    'lorem ipsum dolor sit amet',
    "i'm an expert in foot licking",
    '🍆💦🍑',
    "abcdefghi'mgayjklmnopqrstuvwxyz",
    "you can't hide from me",
    'UWAAAAAAAAAAAH',
    'procrastinating atm',
    'play osu',
    'click the circles',
    '💅',
    "i'm angy",
    'hatsune miku',
    'your mom fat 🗣️🔥',
    'L',
    'sesbian lex',
    'i use arch btw',
    'conclusion: you suck',
    'lowercase supremacy',
    'git gud, kid',
    '😭💢💢💢',
    'komimau is cool',
    'i nut',
    'need more statuses',
  ]

  private static index = 0

  private static next() {
    const status = Status.statuses[Status.index++ % Status.statuses.length]!

    Bot.client.user?.setActivity(status, {
      type: ActivityType.Custom,
    })
  }

  public static cycle() {
    Status.next()
    setInterval(() => Status.next(), Status.INTERVAL_MS)
  }
}
