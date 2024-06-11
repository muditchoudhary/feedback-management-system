import express, { Router } from 'express';

import FeedbackController from '../controllers/feedback.controller';

const controller = FeedbackController();
const router: Router = express.Router();

router.get('/feedbacks', controller.getFeedbacks);
router.post('/feedback', controller.submitFeedback);

export default router;
