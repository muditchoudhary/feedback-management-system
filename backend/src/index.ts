import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import feedbackRoutes from './routes/feedback.routes';
import FeedbackModel from './model/feedback.model';

const { initializeModel } = FeedbackModel();

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(feedbackRoutes);

initializeModel()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to initialize model:', error);
    });
