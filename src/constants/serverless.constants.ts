/**
 * @file Defines constant variables used.
 * @author Irving de Boer
 */
import * as dotenv from 'dotenv';

dotenv.config();

export const GRAPHQL_ENDPOINT: string = 'https://leetcode.com/graphql';
export const GRAPHQL_QUERY: string = `
            query
            {
              allQuestions
              {
                questionId
                title
                difficulty
                topicTags
                {
                  name
                }
                content
                codeSnippets
                {
                  lang
                  langSlug
                  code
                }
                paidOnly: isPaidOnly
              }
            }
            `;

export const MONGO_URI = process.env.MONGO_URI;
