import { QuestionFetcher } from './fetch-questions/serverless.fetch';
import { GRAPHQL_ENDPOINT, GRAPHQL_QUERY } from './constants/serverless.constants';

export async function updateQuestionDatabase(event: any) {
  try {

    const questionFetcher = new QuestionFetcher(GRAPHQL_ENDPOINT, GRAPHQL_QUERY);
    const data = await questionFetcher.fetchLeetCodeQuestions();

    // const databaseService = new DatabaseConnection(MONGO_URI);
    return {
      message: data
    };
  } catch (error) {
    return {
      message: 'Error fetching questions from LeetCode API'
    };
  }

}
