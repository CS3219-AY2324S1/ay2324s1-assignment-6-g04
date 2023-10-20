import { question } from '../models/serverless.model';
import { IGraphQlQuestion, IQuestion } from '../interface/serverless.interface';

export class QuestionService {
  /**
   * Updates the database with the questions from LeetCode.
   * @param questions - The questions to update the database with.
   */
  public updateDatabase(questions: any[]) {
    try {
      const formattedQuestions = this._formatQuestion(questions);
      formattedQuestions.forEach(async (data) => {
        await question.findOneAndUpdate({ title: data.title }, { $set: data }, { upsert: true });
      });
    } catch (error) {
      throw new Error(`Error updating database: ${error}`);
    }
  }

  private _formatQuestion(questions: IGraphQlQuestion[]) {
    let formattedQuestions: Array<IQuestion> = [];

    questions.forEach((question) => {
      const questionObject: any = {
        title: question.title,
        description: question.content,
        categories: question.topicTags.map((tag) => tag.name),
        complexity: question.difficulty,
        deleted: false,
        deletedAt: null
      };

      formattedQuestions.push(questionObject);
    });

    return formattedQuestions;
  }
}