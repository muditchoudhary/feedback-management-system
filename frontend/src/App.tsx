import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddFeedback from './components/AddFeedback';
import { Feedback } from './types';
import FeedbacksList from './components/FeedbacksList';

const { VITE_BACKEND_BASE_URL } = import.meta.env;

const FetchFeedbacksWorker = new Worker(new URL('./web-workers/fetchFeedbacks.ts', import.meta.url), { type: 'module' });

function App() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAddFeedbackFormHide, setIsAddFeedbackFormHide] = useState<boolean>(true);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

    useEffect(() => {
        setIsLoading(true);
        FetchFeedbacksWorker.onmessage = (event) => {
            const { data, error } = event.data;
            if (error) {
                toast.error(error);
            } else if (data) {
                setFeedbacks(data);
            }
            setIsLoading(false);
        };

        FetchFeedbacksWorker.postMessage({
            URL: `${VITE_BACKEND_BASE_URL}/feedbacks`,
            options: {
                method: 'GET',
            },
        });
    }, []);
    return (
        <div className="h-full flex flex-col items-center">
            <div className=" w-3/4 mt-5 border-2 border-solid border-red-700">
                <h2 className=" text-center text-4xl mb-6">Add Feedback: </h2>
                <AddFeedback
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    isAddFeedbackFormHide={isAddFeedbackFormHide}
                    setIsAddFeedbackFormHide={setIsAddFeedbackFormHide}
                    setFeedbacks={setFeedbacks}
                />
            </div>
            <div className="w-3/4 h-3/5 flex flex-col gap-y-2">
                {isLoading && <h1>Loading...</h1>}
                {!isLoading && feedbacks && <FeedbacksList feedbacks={feedbacks} />}
            </div>
            <ToastContainer />
        </div>
    );
}

export default App;
