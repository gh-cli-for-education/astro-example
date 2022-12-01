import type { Collection, Db, MongoClientOptions } from 'mongodb';
import { MongoClient } from 'mongodb';

const uri = import.meta.env.MONGODB_URI as string | undefined;
if (!uri) {
  throw new Error('Invalid enviroment variable: MONGODB_URI');
}
const options: MongoClientOptions = {};
let cachedMongo: Db;

const connectToDB = async (): Promise<Db> => {
  const mongo = await new MongoClient(uri, options).connect();

  return mongo.db('astro-example');
};

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var mongoConnection: Db | undefined;
}

export const getDB = async (): Promise<Db> => {
  if (import.meta.env.DEV) {
    if (!global.mongoConnection) {
      global.mongoConnection = await connectToDB();
      cachedMongo = global.mongoConnection;
    }
    return cachedMongo;
  }
  const mongo = await connectToDB();
  return mongo;
};

export interface UsersData {
  role: 'student' | 'admin';
  mail: string;
}

export const Users = async (): Promise<Collection<UsersData>> => {
  const db = await getDB();
  return db.collection<UsersData>('users');
};
