import { classifyUserStatement } from '../../tensor-flow-model/model/model-comparision.js';
import { loadUnNeutralizedHeadlines, cleaningingInput } from '../../tensor-flow-model/userInput/handelingUserInput.js';
import { fuzzyFilterHeadlines } from '../../tensor-flow-model/userInput/matching-similar-sentences.js';

export const classifyUserStatementService = async (userInput) => {
  // 1. Load all headlines (un-neutralized for fuzzy)
  const allHeadlines = loadUnNeutralizedHeadlines();

  // 2. Get top 3 fuzzy matches (original headlines)
  const fuzzyMatches = fuzzyFilterHeadlines(userInput, allHeadlines, 3);
  const topHeadlines = fuzzyMatches.map(match => match.item);

  // 3. Clean the fuzzy-matched headlines for NLP
  const cleanedHeadlines = topHeadlines.map(headline => cleaningingInput(headline));

  // 4. Compare with Universal Sentence Encoder
  let output = [];
  const storeLog = inputs => output.push(inputs);
  const originalLog = console.log;
  console.log = storeLog;
  await classifyUserStatement(userInput, cleanedHeadlines, topHeadlines); // Pass both cleaned and original
  console.log = originalLog;

  // 5. Return the results and the top matches
  return { 
    matches: topHeadlines,
    result: output.join('\n')
  };
};