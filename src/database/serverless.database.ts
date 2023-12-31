/**
 * @file Handles insertion of data into the database.
 * @author Irving de Boer
 */
import { question } from '../models/serverless.model';
import { IGraphQlQuestion, IQuestion } from '../interface/serverless.interface';
import mongoose from 'mongoose';

export class QuestionService {

  /**
   * Updates the database with the questions from LeetCode.
   * @param questions - The questions to update the database with.
   */
  public async updateDatabase(questions: any[]): Promise<void> {
    try {
      const formattedQuestions = this._formatQuestion(questions);
      for (const data of formattedQuestions) {
        await question.findOneAndUpdate({ title: data.title }, { $set: data }, { upsert: true });
      }
      await mongoose.connection.close();
    } catch (error) {
      throw new Error(`${error}`);
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
