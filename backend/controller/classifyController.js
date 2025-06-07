import { classifyUserStatementService } from '../services/classifyService.js';

export const classify = async (req, res) => {
  const { userInput } = req.body;
  if (!userInput) {
    return res.status(400).json({ error: 'userInput is required' });
  }
  try {
    const result = await classifyUserStatementService(userInput);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};