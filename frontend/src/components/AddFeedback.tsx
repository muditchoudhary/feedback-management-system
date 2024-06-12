import { Feedback } from '../types';
import FeedbackForm from './FeedbackForm';

interface AddFeedbackProps {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isAddFeedbackFormHide: boolean;
    setIsAddFeedbackFormHide: React.Dispatch<React.SetStateAction<boolean>>;
    setFeedbacks: React.Dispatch<React.SetStateAction<Feedback[]>>;
}

function AddFeedback({ isLoading, setIsLoading, isAddFeedbackFormHide, setIsAddFeedbackFormHide, setFeedbacks }: AddFeedbackProps) {
    return (
        <div className="flex justify-center">
            <FeedbackForm
                isAddFeedbackFormHide={isAddFeedbackFormHide}
                setIsAddFeedbackFormHide={setIsAddFeedbackFormHide}
                setIsLoading={setIsLoading}
                setFeedbacks={setFeedbacks}
            />
            <button
                disabled={isLoading}
                type="button"
                onClick={() => setIsAddFeedbackFormHide(false)}
                className=" bg-green-500 border-2 border-solid border-black rounded-md p-1 hover:bg-green-300"
            >
                Add Feedback
            </button>
        </div>
    );
}

export default AddFeedback;
