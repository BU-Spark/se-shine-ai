import AssessmentQuestion from "./AssessmentQuestion";
import { QuestionData } from "./types";
import './AssessmentSection.css';

interface AssessmentSectionProps {
    questions: QuestionData[];
    responses: (number | null)[];
    responseCallback: (questionNumber: number, updatedValue: number | null) => void;
    formCompleteCallback?: () => void;
}

const AssessmentSection: React.FC<AssessmentSectionProps> = (
    {questions, responses, responseCallback, formCompleteCallback}
) => {
    return (
        <div className="assessment-section">
            <hr className="assessment-question-divider" />
            {questions.map((questionData, index) => (
                <div key={`question-${questionData.number}`} className="question-wrapper">
                    <AssessmentQuestion 
                        question={questionData}
                        response={responses[index] === undefined ? null : responses[index]}
                        responseCallback={responseCallback}
                        formCompleteCallback={formCompleteCallback} />
                    <hr className="assessment-question-divider" />
                </div>
            ))}
        </div>
    );
};

export default AssessmentSection;