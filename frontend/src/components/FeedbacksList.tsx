import { Feedback } from '../types';
import FeedbackComp from './FeedbackComp';

interface FeedbacksListProps {
    feedbacks: Feedback[];
}
function FeedbacksList({ feedbacks }: FeedbacksListProps) {
    return (
        <div className="border-2 border-solid flex flex-col border-black gap-y-5 p-4 mt-4 overflow-scroll">
            {feedbacks.map((feedback, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <FeedbackComp key={i} feedback={feedback} />
            ))}
        </div>
    );
}

export default FeedbacksList;
