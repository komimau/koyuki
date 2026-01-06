import { MongoClient, type ObjectId, type Db, type UpdateOptions } from 'mongodb'
import Environment from './Environment'

interface KoyukiConfig {
  milkday: {
    open: boolean
    year: number
    month: number
  }
  minecraft: {
    latest: string
  }
}

const client = new MongoClient(Environment.MONGODB_URI)
const db = client.db(Environment.MONGODB_NAME)

await client.connect()
console.log('Connected to MongoDB')

export default class Database {
  public static get client(): MongoClient {
    return client
  }

  public static get db(): Db {
    return db
  }

  private static get collection() {
    return db.collection<KoyukiConfig>('config')
  }

  public static async get() {
    return await Database.collection.findOne({ id: 'koyuki-bot' })
  }

  public static async update(options: UpdateOptions) {
    await Database.collection.updateOne({ id: 'koyuki-bot' }, options)
  }

  public static removeId<T extends { _id: ObjectId }>(document: T): Omit<T, '_id'> {
    const { _id, ...rest } = document
    return rest
  }

  public static async close() {
    await client.close()
    console.log('Disconnected from MongoDB')
  }
}
