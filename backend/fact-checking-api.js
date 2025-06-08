import express from 'express';
import classifyRoutes from './routers/classifyRouter.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', classifyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});