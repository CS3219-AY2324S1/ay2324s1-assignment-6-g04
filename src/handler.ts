import {fetchLeetCodeQuestions} from "./fetch-questions/serverless.fetch";

export async function updateQuestionDatabase(event) {
    try {
        const questions = await fetchLeetCodeQuestions();
        return {
            message: 'Go Serverless v3! Your function executed successfully!',
            input: event,
        };
    } catch (error) {
        return {
            message: 'Error fetching questions from LeetCode API',
            input: event,
        };
    }

}
