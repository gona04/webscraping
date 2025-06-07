import { classifyUserStatement } from '../../tensor-flow-model/model/model-comparision.js';
import { loadHeadlines } from '../../tensor-flow-model/userInput/handelingUserInput.js';

export const classifyUserStatementService = async (userInput) => {
  const headlines = loadHeadlines();
  let output = [];
  const storeLog = inputs => output.push(inputs);
  const originalLog = console.log;
  console.log = storeLog;
  await classifyUserStatement(userInput, headlines);
  console.log = originalLog;
  return { result: output.join('\n') };
};