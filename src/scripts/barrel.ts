import fs from 'fs'

const pathClasses = './src/classes'
const pathCommands = './src/commands'
const pathEvents = './src/events'

const barrelClasses = './src/classes.ts'
const barrelCommands = './src/commands.ts'
const barrelEvents = './src/events.ts'

const classes = fs.readdirSync(pathClasses)
const commands = fs.readdirSync(pathCommands)
const events = fs.readdirSync(pathEvents)

console.table([
  { Type: 'Classes', Count: classes.length },
  { Type: 'Commands', Count: commands.length },
  { Type: 'Events', Count: events.length },
])

function createBarrel(files: string[], folder: string, extension: string) {
  return (
    files
      .filter((file) => file.endsWith(extension))
      .sort()
      .map(
        (file) => `export { default as ${file.replace(extension, '')} } from './${folder}/${file}'`
      )
      .join('\n') + '\n'
  )
}

fs.writeFileSync(barrelClasses, createBarrel(classes, 'classes', '.ts'))
fs.writeFileSync(barrelCommands, createBarrel(commands, 'commands', '.ts'))
fs.writeFileSync(barrelEvents, createBarrel(events, 'events', '.ts'))

console.log('Barrel files updated')
process.exit(0)
