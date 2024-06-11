import fs from 'fs/promises';
import path from 'path';

import { Feedback, InitialModel } from './model.types';
const FeedbackModel = () => {
    const filePath = path.join(process.cwd(), '/src/model/data.json');
    const initialData: InitialModel = {
        data: [],
    };
    const initializeModel = async () => {
        try {
            await fs.access(filePath);
        } catch (error) {
            if (error.code === 'ENOENT') {
                const jsonData = JSON.stringify(initialData, null, 2);
                await fs.writeFile(filePath, jsonData, 'utf8');
            } else {
                console.error('INITIALIZE_MODEL: ', error);
                throw new Error('Cannot create the JSON file');
            }
        }
    };

    const createFeedback = async (feedback: Feedback): Promise<boolean> => {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            const feedbacks: InitialModel = JSON.parse(data);
            feedbacks.data.push(feedback);
            const jsonData = JSON.stringify(feedbacks, null, 2);
            await fs.writeFile(filePath, jsonData, 'utf-8');
            return true;
        } catch (error) {
            console.error('CREATE_FEEDBACK_IN_JSON: ', error);
            throw new Error('Cannot add feedback to the file');
        }
    };

    const readFeedbacks = async (): Promise<InitialModel> => {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            const jsonData: InitialModel = JSON.parse(data);
            return jsonData;
        } catch (error) {
            console.error('READ_JSON_FILE: ', error);
            throw new Error('Cannot read data from file');
        }
    };

    return { initializeModel, readFeedbacks, createFeedback };
};

export default FeedbackModel;

const model = FeedbackModel();
model.initializeModel();
