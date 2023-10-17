export const fetchLeetCodeQuestions = async () => {
    try {
        const graphqlEndpoint = 'https://leetcode.com/graphql';

        // GraphQL query to fetch all questions from LeetCode API with the following fields:
        const graphqlQuery = `
          query {
            allQuestions {
              questionId
              title
              titleSlug
              difficulty
              topicTags {
                name
              }
              content
              paidOnly: isPaidOnly
            }
          }
        `;


        const data = await fetch(graphqlEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query: graphqlQuery}),

        })

        if (data.status !== 200) {
            throw new Error(`Error fetching questions from LeetCode API. Response Code: ${data.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching questions from LeetCode API');
    }
};

