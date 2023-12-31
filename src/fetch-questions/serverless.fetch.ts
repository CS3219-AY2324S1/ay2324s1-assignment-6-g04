/**
 * @file Fetches question data from LeetCode GraphQL API.
 * @author Irving de Boer
 */
import { IGraphQlQuestion, IGraphQLResponse } from '../interface/serverless.interface';
import striptags = require('striptags');
import he = require('he');

export class QuestionFetcher {

  private readonly _graphqlEndpoint: string;
  private readonly _graphqlQuery: string;

  public constructor(graphqlEndpoint: string, graphqlQuery: string) {
    this._graphqlEndpoint = graphqlEndpoint;
    this._graphqlQuery = graphqlQuery;
  }

  /**
   * Fetches questions from the LeetCode API.
   * @returns - The response from the LeetCode API.
   */
  public async fetchLeetCodeQuestions(): Promise<IGraphQlQuestion[]> {
    const data = await fetch(this._graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: this._graphqlQuery })
    });

    if (data.status !== 200) {
      throw new Error(`Error fetching questions from LeetCode API. Response Message: ${JSON.stringify(data)}`);
    }

    const response: IGraphQLResponse = await data.json() as IGraphQLResponse;

    return this._handleData(response);
  };

  private _handleData(data: IGraphQLResponse) {
    const dataArray: Array<IGraphQlQuestion> = data.data.allQuestions;

    // filter out paid questions
    const filteredArray = dataArray.filter((question) => {
      return question.paidOnly === false;
    });

    filteredArray.forEach((question) => {
      question.content = this._stripTags(question.content);
    });

    return filteredArray;
  }

  private _stripTags(html: string) {
    const strippedText = striptags(html);
    return he.decode(strippedText);
  }
}



