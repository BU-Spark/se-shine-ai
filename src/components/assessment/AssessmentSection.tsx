import AssessmentQuestion from "./AssessmentQuestion";
import { QuestionData } from "./types";
import './AssessmentSection.css';

interface AssessmentSectionProps {
    questions: QuestionData[];
    responses: (number | null)[];
    responseCallback: (questionNumber: number, updatedValue: number | null) => void;
    formCompleteCallback?: () => void;
}

/**
 * The AssessmentSection component.
 * Represents a single page of questions (currently 4).
 * 
 * Parent component is Assessment.
 * Has AssessmentQuestion as child component.
 * 
 * Responsible for:
 *  - Displaying all questions it receives from the parent component
 *    as AssessmentQuestion components
 *  - Displaying dividers between each question
 * 
 * @prop questions:            all questions to be displayed by this page
 * @prop responses:            all responses corresponding to given questions prop
 * @prop responseCallback:     callback to update userResponses at the page level
 * @prop formCompleteCallback: callback to check whether all questions of the whole form
 *                             have been answered at the Assessment level
 * 
 */
const AssessmentSection: React.FC<AssessmentSectionProps> = (
    {questions, responses, responseCallback, formCompleteCallback}
) => {
    return (
        <div className="assessment-section">
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