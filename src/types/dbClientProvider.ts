import DbClient from '../db/dbClient';

export type DbClientProvider = () => Promise<DbClient>;
