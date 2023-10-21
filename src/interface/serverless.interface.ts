/**
 * @file Interfaces used.
 * @author Irving de Boer
 */
import { Document } from 'mongoose';

export interface IQuestion extends Document {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _id: string;
  title: string;
  description: string;
  categories: Array<string>;
  complexity: string;
  template: [
    {
      language: string;
      langSlug: string;
      code: string;
    }
  ];
  deleted: boolean;
  deletedAt: Date;
}

export interface IGraphQLResponse {
  data: {
    allQuestions: Array<IGraphQlQuestion>;
  };
}

export interface IGraphQlQuestion {
  questionId: string;
  title: string;
  difficulty: string;
  topicTags: [
    {
      name: string;
    }
  ];
  content: string;
  codeSnippets: [
    {
      lang: string;
      langSlug: string;
      code: string;
    }
  ];
  paidOnly: boolean;
}
