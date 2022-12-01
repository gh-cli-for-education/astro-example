import type { WithId } from 'mongodb';
import { Users, UsersData } from './mongodb';

export const getAllUsers = async (): Promise<WithId<UsersData>[]> => {
  const users = await (await Users()).find({}).toArray();
  return users;
};
