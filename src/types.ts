import type {
  ChatInputCommandInteraction,
  InteractionReplyOptions,
  MessageCreateOptions,
  MessageEditOptions,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js'

// an object of type Intersection<[A, B, C]> only has keys that are shared between A, B, and C
type SharedKeys<A, B> = keyof A & keyof B
type Intersect2<A, B> = {
  [K in SharedKeys<A, B>]: A[K] & B[K]
}
export type Intersection<T extends object[]> = T extends [
  infer First extends object,
  ...infer Rest extends object[],
]
  ? Rest extends []
    ? First
    : Intersect2<First, Intersection<Rest>>
  : {}

type UniversalMessageOptions = Partial<
  Intersection<[InteractionReplyOptions, MessageCreateOptions, MessageEditOptions]>
>

export type BotCommand = {
  builder: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder
  run: (interaction: ChatInputCommandInteraction) => Promise<void>
}

export type BotEvent = {
  (): Promise<void>
}
