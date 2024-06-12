import { Feedback } from '../types';

interface FeedbackProps {
    feedback: Feedback;
}
function FeedbackComp({ feedback }: FeedbackProps) {
    return (
        <div className="border-2 border-solid border-green-900 w-full">
            <h2>{feedback.name}</h2>
            <p>{feedback.feedback}</p>
        </div>
    );
}

export default FeedbackComp;
