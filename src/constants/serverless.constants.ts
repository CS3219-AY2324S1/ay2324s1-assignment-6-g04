import * as dotenv from 'dotenv';

dotenv.config();

export const GRAPHQL_ENDPOINT: string = process.env.GRAPHQL_ENDPOINT!;
export const GRAPHQL_QUERY: string = process.env.GRAPHQL_QUERY!;

export const MONGO_URI = process.env.MONGO_URI;
