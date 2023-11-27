import { useState } from "react";
import { QuestionData } from "./types";
import AssessmentSection from "./AssessmentSection";
import './Assessment.css';

interface AssessmentProps {
    allQuestions: QuestionData[];
    userResponses: number[];
    responseCallback: (questionNumber: number, updatedValue: number | null) => void;
}

const Assessment: React.FC<AssessmentProps> = (
    { allQuestions, userResponses, responseCallback }
) => {
    const [activePage, setActivePage] = useState<number>(1);
    const [allAnswered, setAllAnswered] = useState<boolean>(false);

    const questionsPerPage = 4;
    const questionSets = Array.from( { length: Math.ceil(allQuestions.length / questionsPerPage) },
        (v, i) => allQuestions.slice(i * questionsPerPage, i * questionsPerPage + questionsPerPage));

    const lastPage = questionSets.length;

    const updateAllAnswered = () => {
        const isAllAnswered = userResponses.every((item) => item !== null && item !== undefined);
        setAllAnswered(isAllAnswered);
    };

    const handleNextPage = () => {
        const nextPage = activePage + 1;

        if (nextPage <= lastPage) {
            setActivePage(nextPage);
            if (nextPage == lastPage) {
                updateAllAnswered();
            }
        }
    };

    const handlePrevPage = () => {
        const prevPage = activePage - 1;

        if (prevPage > 0) {
            setActivePage(prevPage);
        }
    };

    const handleSubmit = () => {

    }

    const renderActivePage = () => {

        const responseIndex = (activePage - 1) * questionsPerPage;
        const pageResponses = userResponses.slice(responseIndex, responseIndex + questionsPerPage);

        const formCompleteCallback = (activePage === lastPage ? updateAllAnswered : undefined);

        return <AssessmentSection 
                    key={`assessment-question-page-${activePage}`}
                    questions={questionSets[activePage-1]}
                    responses={pageResponses}
                    responseCallback={responseCallback}
                    formCompleteCallback={formCompleteCallback} />
    };

    return (
        <div className="assessment-page-container">
            <div className="progress-bar">
                <div 
                    className="progress-bar-fill" 
                    style={{ width: `${(100 / lastPage) * (activePage)}%` }} />
            </div>

            {renderActivePage()}
            
            <div className="assessment-nav-buttons">
                <button onClick={handlePrevPage} disabled={activePage === 1}>Back</button>
                {activePage === lastPage ? 
                    <button onClick={handleSubmit} disabled={!allAnswered} className="submit-button">Submit</button> :
                    <button onClick={handleNextPage}>Next</button>}

            </div>
        </div>
    );

}

export default Assessment;