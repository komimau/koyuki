import { REST, Routes } from 'discord.js'
import Environment from '../classes/Environment'
import * as commands from '../commands'

console.log('Registering commands...')

const rest = new REST({ version: '10' }).setToken(Environment.DISCORD_TOKEN)

const jsons = Object.values(commands).map((c) => c.builder.toJSON())

console.table(
  jsons.map((j) => {
    return {
      name: j.name,
      description: j.description,
      'options / subcommands': j.options?.map((o) => o.name).join(', ') ?? '-',
    }
  })
)

try {
  await rest.put(Routes.applicationCommands(Environment.DISCORD_CLIENT_ID), {
    body: Object.values([]),
  })
  await rest.put(
    Routes.applicationGuildCommands(Environment.DISCORD_CLIENT_ID, Environment.DISCORD_GUILD_ID),
    {
      body: Object.values(jsons),
    }
  )
} catch (error) {
  console.error(error)
}

console.log('Done!')
process.exit(0)
