[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/UxpU_KWG)

## Quick Start Guide

1. Clone the repository.
2. Create `.env` file with specified variables. Refer to [Environment Variables](#environment-variables) for a list of
   configs.
3. Configure serverless framework using
   the [Official Documentation](https://www.serverless.com/framework/docs/getting-started/).
4. Run `npm install` to install necessary dependencies.

## Environment Variables

- GRAPHQL_ENDPOINT - GraphQL endpoint for the User Service.
- GRAPHQL_QUERY - GraphQL query for the User Service.
- MONGO_URI - MongoDB URI for Question Repository.

## GraphQL API

### Endpoint

The GraphQL API endpoint is `https://leetcode/graphql` by default. The GraphQL API is used to retrieve questions from
LeetCode.

### Query

The GraphQL API supports the following query:

```graphql
query {
      allQuestions {
      questionId
      title
      difficulty
      topicTags {
         name
      }
      content
      codeSnippets {
        lang
        langSlug
         code
      }
      paidOnly: isPaidOnly
     }
   }
```

This returns an array of questions. Each question has the following fields:

- questionId - The ID of the question.
- title - The title of the question.
- difficulty - The difficulty of the question.
- topicTags - The topic tags of the question.
    - name - The name of the topic tag.
- content - The content of the question.
- codeSnippets - The code snippets of the question.
    - lang - The language of the code snippet.
    - langSlug - The language slug of the code snippet.
    - code - The code of the code snippet.
- paidOnly - Whether the question is paid only.

### Potential Issues

- The GraphQL API is not officially supported by LeetCode. The API may be subject to change without notice.


- Depending on your IP Address and your rate of invoking the GraphQL API, you may be temporarily blocked from accessing
  the GraphQL API and status code `403` will be returned. If this happens, you can try to use a VPN to change your IP or
  wait for a few minutes before trying again.

## Serverless Functions

The serverless functions are used to retrieve questions from LeetCode. The serverless functions are hosted on AWS Lambda
by default.

### Cloud Deployment

To set up the Serverless Framework tp access to your cloud provider account to create and manage resources on your
behalf,
use the following [guide](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/).

To deploy the serverless functions, run the following command:

```bash
serverless deploy
```

To invoke the serverless functions, run the following command:

```bash
serverless invoke --function updateQuestionDatabase
```

The serverless functions is scheduled to run every 24 hours and can be monitored via the AWS Lambda console.

### Local Deployment

The serverless function can also be invoked locally using the following command:

```bash
serverless invoke local --function updateQuestionDatabase
```

This runs the function locally by emulating the AWS Lambda Environment and updates the database with the latest
questions from LeetCode.

## Question Repository

The question repository is a MongoDB database that stores the questions retrieved from LeetCode. The question repository
is hosted on MongoDB Atlas by default.

## Demonstration

For the assignment demonstration, we will run the serverless function locally to update the database with the latest
questions. This is so that testers can test the functionality of the API without having to set up a cloud deployment.

### Demonstration Steps

1. Set up empty MongoDB database with database name `questions` and with a collection named `questions`.
2. Run `serverless invoke local --function updateQuestionDatabase` to update the database with the latest questions.
3. Wait for serverless function to finish running.
4. Refresh the database to check that the questions have been updated.
