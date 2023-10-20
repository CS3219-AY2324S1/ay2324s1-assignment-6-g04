import { QuestionFetcher } from './fetch-questions/serverless.fetch';
import { GRAPHQL_ENDPOINT, GRAPHQL_QUERY, MONGO_URI } from './constants/serverless.constants';
import mongoose from 'mongoose';
import { QuestionService } from './database/serverless.database';

export async function updateQuestionDatabase(event: any, context: any) {

  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await mongoose.connect(MONGO_URI!, {
      // and tell the MongoDB driver to not wait more than 5 seconds
      // before error if it isn't connected
      serverSelectionTimeoutMS: 5000,
      dbName: 'questions'
    });

    const questionService = new QuestionService();
    const questionFetcher = new QuestionFetcher(GRAPHQL_ENDPOINT, GRAPHQL_QUERY);
    const data = await questionFetcher.fetchLeetCodeQuestions();
    
    questionService.updateDatabase(data);

    await mongoose.disconnect();
    return {
      message: data
    };
  } catch (error) {
    await mongoose.disconnect();
    return {
      message: error
    };
  }

}
