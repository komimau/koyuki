// import { type Collection, MongoClient, type ObjectId, type Db, type Document } from 'mongodb'
// import Environment from './Environment'

// interface Collections {
//   //
// }

// const client = new MongoClient(Environment.MONGODB_URI)
// const db = client.db(Environment.MONGODB_NAME)

// await client.connect()
// console.log('Connected to MongoDB')

// export default class Database {
//   public static get client(): MongoClient {
//     return client
//   }

//   public static get db(): Db {
//     return db
//   }

//   public static get<K extends keyof Collections>(collection: K): Collection<Collections[K]>
//   public static get<T extends Document>(collection: string): Collection<T>
//   public static get(collection: string) {
//     return db.collection(collection)
//   }

//   public static async getAll<K extends keyof Collections>(collection: K): Promise<Collections[K][]>
//   public static async getAll<T extends Document>(collection: string): Promise<T[]>
//   public static async getAll(collection: string) {
//     return await db
//       .collection(collection)
//       .find({}, { projection: { _id: 0 } })
//       .toArray()
//   }

//   public static removeId<T extends { _id: ObjectId }>(document: T): Omit<T, '_id'> {
//     const { _id, ...rest } = document
//     return rest
//   }

//   public static async close() {
//     await client.close()
//     console.log('Disconnected from MongoDB')
//   }
// }

export default class Database {}
