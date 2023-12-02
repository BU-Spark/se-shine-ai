import { useState } from "react";
import { QuestionData } from "./types";
import './AssessmentQuestion.css';


interface AssessmentQuestionProps {
    question: QuestionData;
    response: number | null;
    responseCallback: (questionNumber: number, updatedValue: number | null) => void;
    formCompleteCallback?: () => void;
}

const AssessmentQuestion: React.FC<AssessmentQuestionProps> = ( 
    {question, response, responseCallback, formCompleteCallback} 
) => {
    
    const [selectedValue, setSelectedValue] = useState<number | null>(response);
    
    const answerChoices = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];
    const extremesLabels = ['Extreme 1', 'Extreme 2'];

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
                    {extremesLabels.map((label, index) => (
                        <span key={index} className="assessment-question-answer-label">
                            {label}
                        </span>
                    ))}
                </div>
                
            </div>

        </div>
    );

}

export default AssessmentQuestion;
