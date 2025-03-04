const stringSimilarity = require("string-similarity");

const compareResponses = (response1, response2) => {
  return stringSimilarity.compareTwoStrings(response1, response2).toFixed(2);
};

module.exports = { compareResponses };
