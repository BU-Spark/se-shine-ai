import { useState } from "react";
import { QuestionData } from "./types";
import './AssessmentQuestion.css';


interface AssessmentQuestionProps {
    question: QuestionData;
    response: number | null;
    responseCallback: (questionNumber: number, updatedValue: number | null) => void;
    formCompleteCallback?: () => void;
}

/**
 * The AssessmentQuestion component.
 * Represents one interactive question of the assessment.
 * 
 * Parent component is AssessmentSection.
 * 
 * Responsible for:
 *  - Displaying the question's text
 *  - Displaying the answer bubbles
 *  - Displaying the text describing the extremes that the bubbles represent
 *  - Handling user responses (via callback)
 *  - Invoking check for form completion (via callback if on last page)
 * 
 * @prop question:             the question to be displayed by this component
 * @prop response:             the stored response for this question (from page)
 * @prop responseCallback:     callback to update this question's response at the page level
 * @prop formCompleteCallback: callback to check whether all questions of the whole form have
 *                             been answered at the Assessment level
 * 
 */
const AssessmentQuestion: React.FC<AssessmentQuestionProps> = ( 
    {question, response, responseCallback, formCompleteCallback} 
) => {
    
    // Value the user has currently selected
    const [selectedValue, setSelectedValue] = useState<number | null>(response);
    
    // Currently only hardcoded to have seven bubbles along the spectrum
    // If this changes be sure to change the .assessment-answer-button class and
    // its children in the CSS to account for the transitioning bubble sizes.
    const answerChoices = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];

    const handleSelection = (value: number) => {

        const newValue = (selectedValue === value ? null : value); 
        
        setSelectedValue(newValue);
        responseCallback(question.number, newValue);

        if (formCompleteCallback) {
            formCompleteCallback();
        }

    }

    return (
        <div className="assessment-question-container">

            <div className="assessment-question-text">
                {question.text}
            </div>

            <div className="assessment-question-answers">

                <div className="assessment-question-answer-buttons">
                    {answerChoices.map((answer, index) => (
                        <button 
                            key={`question-${question.number}-button-${index}`}
                            className={`assessment-answer-button ${selectedValue === index ? 'selected' : ''}`}
                            onClick={() => handleSelection(index)} />
                    ))}
                </div>

                <div className="assessment-question-answer-text">
                    <span 
                        key={`question-${question.number}-answer-low`}
                        className="assessment-question-answer-label">
                            {question.answers.low}
                    </span>
                    <span 
                        key={`question-${question.number}-answer-high`}
                        className="assessment-question-answer-label">
                            {question.answers.high}
                    </span>
                </div>
                
            </div>

        </div>
    );

}

export default AssessmentQuestion;
