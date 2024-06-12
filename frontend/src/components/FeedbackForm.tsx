import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { Feedback } from '../types';

const FetchFeedbacksWorker = new Worker(new URL('../web-workers/fetchFeedbacks.ts', import.meta.url), { type: 'module' });
const { VITE_BACKEND_BASE_URL } = import.meta.env;

interface FeedbackFormProps {
    isAddFeedbackFormHide: boolean;
    setIsAddFeedbackFormHide: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setFeedbacks: React.Dispatch<React.SetStateAction<Feedback[]>>;
}

function FeedbackForm({ isAddFeedbackFormHide, setIsAddFeedbackFormHide, setIsLoading, setFeedbacks }: FeedbackFormProps) {
    const [name, setName] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');

    const onCancel = () => {
        setIsAddFeedbackFormHide(true);
        setName('');
        setFeedback('');
    };

    const onDone = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/feedback/', {
                name,
                feedback,
            });
            if (response.status === 200) {
                // Add data to the state
                toast.success('Feedback successfully added');
                onCancel();
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
            } else if (response.status === 400) {
                toast.error('Name and Feedback cannot be empty');
            } else if (response.status === 500) {
                toast.error('Internal Server Error');
            }
        } catch (error) {
            toast.error('Something went wrong');
            onCancel();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {!isAddFeedbackFormHide && (
                <div className="fixed top-0 left-0 border-2 border-solid border-black flex bg-black bg-opacity-80 justify-center items-center w-full h-full">
                    <div className=" w-1/2 border-2 border-green-500 border-solid py-4 px-2 bg-green-500 bg-opacity-80">
                        <h2 className=" text-3xl">Add a Feedback: </h2>
                        <hr />
                        <form className="flex flex-col gap-y-5 py-3 px-4" onSubmit={onDone}>
                            <div>
                                <label className="text-xl" htmlFor="name">
                                    Name:{' '}
                                </label>
                                <input
                                    className="text-xl border border-solid border-gray-500 flex-1 p-1"
                                    placeholder="Full Name"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex gap-x-2">
                                <label className="text-xl" htmlFor="feedback">
                                    Feedback:{' '}
                                </label>
                                <textarea
                                    placeholder="Your Feedback"
                                    id="feedback"
                                    name="feedback"
                                    className="text-xl border border-solid border-gray-500 flex-1 p-1"
                                    value={feedback}
                                    rows={5}
                                    cols={33}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="bg-red-500 border-2 border-solid border-black rounded-md p-1 hover:bg-red-300"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-green-500 border-2 border-solid border-black rounded-md p-1 hover:bg-green-300">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FeedbackForm;
