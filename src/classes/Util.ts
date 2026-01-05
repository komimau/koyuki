/**

  A class with static utility methods.

*/
export default class Util {
  /** Sleep for ms milliseconds. */
  public static sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /** Returns a new array with the elements shuffled. */
  public static shuffleArray<T>(array: T[]): T[] {
    const result = array.slice()
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[result[i], result[j]] = [result[j]!, result[i]!]
    }
    return result
  }

  /** Generates a random integer between min and max, inclusive. */
  public static randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /** Generates an array of random integers between min and max, inclusive. */
  public static randomIntegers(
    min: number,
    max: number,
    length: number,
    unique: boolean
  ): number[] {
    const diff = max - min + 1

    if (unique && length > diff) {
      Util.error(`Cannot generate ${length} unique integers between ${min} and ${max}`)
    }

    if (unique) {
      const pool = Util.shuffleArray(Array.from({ length: diff }, (_, i) => i + min))
      return pool.slice(0, length)
    } else {
      return Array.from({ length }, () => Util.randomInteger(min, max))
    }
  }

  /** Throws an error. */
  public static error(message: string): never {
    throw new Error(message)
  }

  /** Surrounds a string with triple backticks. */
  public static codeblock(str: string, language: string = ''): string {
    if (str.length === 0) return ''
    return `\`\`\`${language}${str}\`\`\``
  }

  /** Formats and surrounds a json object with triple backticks. */
  public static jsonblock(json: Object, maxLength: number = 3900): string {
    const jsonString = JSON.stringify(json, (_, v) => (typeof v === 'bigint' ? v.toString() : v), 2)
    if (jsonString.length === 0) return ''
    return `\`\`\`json\n${jsonString.slice(0, maxLength)}\`\`\``
  }

  /** Formats a number as its ordinal. */
  public static ordinal(n: number): string {
    if ([11, 12, 13].includes(n % 100)) return `${n}th`
    return n.toString() + (n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th')
  }
}
