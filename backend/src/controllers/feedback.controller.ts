import FeedbackModel from '../model/feedback.model';
import { Request, Response } from 'express';
import { Feedback, InitialModel } from '../model/model.types';

const FeedbackController = () => {
    const model = FeedbackModel();

    const getFeedbacks = async (req: Request, res: Response) => {
        try {
            const feedbacks: InitialModel = await model.readFeedbacks();
            return res.status(200).json({
                success: true,
                feedbacks: feedbacks,
            });
        } catch (error) {
            console.error('GET_FEEDBACKS: ', error);
            return res.status(500).json({
                success: false,
                message: `Internal Server Error: ${error.message}`,
            });
        }
    };

    const submitFeedback = async (req: Request, res: Response) => {
        try {
            const { name, feedback } = req.body;
            if (!name || !feedback) {
                return res.status(400).json({
                    success: true,
                    message: 'Feedback cannot be null',
                });
            }
            const feedbackData = { name, feedback };
            const success = await model.createFeedback(feedbackData as Feedback);
            if (success) {
                return res.status(200).json({
                    success: true,
                    message: 'Feedback successfully added',
                });
            }
        } catch (error) {
            console.error('POST_FEEDBACK: ', error);
            return res.status(500).json({
                success: false,
                message: `Internal Server Error: ${error.message}`,
            });
        }
    };

    return { getFeedbacks, submitFeedback };
};

export default FeedbackController;
