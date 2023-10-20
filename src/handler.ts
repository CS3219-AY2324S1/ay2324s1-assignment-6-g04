import { QuestionFetcher } from './fetch-questions/serverless.fetch';
import { GRAPHQL_ENDPOINT, GRAPHQL_QUERY, MONGO_URI } from './constants/serverless.constants';
import mongoose from 'mongoose';

let conn = null;

export async function updateQuestionDatabase(event: any, context: any) {

  context.callbackWaitsForEmptyEventLoop = false;
  if (conn == null) {
    try {
      conn = mongoose.createConnection(MONGO_URI, {
        // and tell the MongoDB driver to not wait more than 5 seconds
        // before error if it isn't connected
        serverSelectionTimeoutMS: 5000
      });

      // `await`ing connection after assigning to the `conn` variable
      // to avoid multiple function calls creating new connections
      await conn.asPromise();
    } catch (error) {
      return {
        message: 'Error connecting to database'
      };
    }
  }

  try {
    const questionFetcher = new QuestionFetcher(GRAPHQL_ENDPOINT, GRAPHQL_QUERY);
    const data = await questionFetcher.fetchLeetCodeQuestions();
    return {
      message: 'Successfully scraped questions from LeetCode API'
    };
  } catch (error) {
    return {
      message: 'Error fetching questions from LeetCode API'
    };
  }

}
