import { ActivityType } from 'discord.js'
import { Bot } from '../classes'

export default class Status {
  private static INTERVAL_MS = 1000 * 30

  private static statuses = [
    'nihahahaha',
    'wiggles your balls',
    'unwiggles your balls',
    'AaAaAaAAaAaAAaAaAaAaAAaAaAAaAaAaAaAAaAaAAa',
    'whoever reads Statuses is gay',
    'busy with your mom rn',
    '🍀',
    '69',
    'ちんちん小さいですね',
    'i only speak facts',
    'i have an onlyfans',
    "it's only $5 a month",
    "i'm the best",
    'h',
    '¿pero qué pasa?',
    "i'm gonna jump",
    'why so serious?',
    'you know the rules, and so do i',
    "i'm broke, give money",
    'i sell feet pics',
    'so based 🗿',
    'https://youtu.be/dQw4w9WgXcQ',
    "you can't fix me",
    'bitch',
    'discord.gg/komimau',
    'NIHAHAHAHHAHAHAHAHAHAHHAHAHAHHAHAHA',
    'get shit on',
    '💀🔫',
    '190.102.79.253',
    'sob',
    '🍦🍧🍨🍩🍪🎂🍰🧁🥧🍫🍭',
    'i like pink',
    "i'll fuck you up",
    'a',
    'english or spanish',
    'fucks your mom',
    'unfucks your mom',
    '🛹',
    'best day of my life',
    'worst day of my life',
    'fight me bitch',
    "don't take me seriously",
    'lorem ipsum dolor sit amet',
    '🍆💦🍑',
    "abcdefghijkli'mgaymnopqrstuvwxyz",
    'UWAAAAAAAAAAAH',
    'procrastinating atm',
    '💅',
    "i'm angy",
    'your mom fat 🗣️🔥',
    'L',
    'i use arch btw',
    'git gud, kid',
    '😭💢💢💢',
    'komimau is cool',
    'i nut',
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
