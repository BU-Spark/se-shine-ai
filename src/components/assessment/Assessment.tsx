import { useState } from "react";
import { QuestionData } from "./types";
import AssessmentSection from "./AssessmentSection";
import './Assessment.css';

import { db } from '../../firebase/firebaseConfig'
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';

interface AssessmentProps {
    allQuestions: QuestionData[];
    userResponses: number[];
    responseCallback: (questionNumber: number, updatedValue: number | null) => void;
}

/**
 * The Assessment component.
 * Contains the actual interactive assessment.
 * 
 * Parent component is AssessmentPage.
 * Has AssessmentSection as child component.
 * 
 * Responsible for:
 *  - Displaying the progress bar
 *  - Splitting up question list into sets (pages) of 4
 *  - Keeping track of the currently active page
 *  - Displaying the currently active page of questions as an AssessmentSection
 *  - Displaying buttons to navigate between pages and handle their logic
 *  - Keeping track of whether the form is complete to enable the submit button 
 * 
 * @prop allQuestions:     list of all questions in assessment
 * @prop userResponses:    list of all responses user currently has selected
 * @prop responseCallback: callback function to update userResponses at the page level
 */
const Assessment: React.FC<AssessmentProps> = (
    { allQuestions, userResponses, responseCallback }
) => {
    const { user } = useAuth();
    const router = useRouter();

    const [activePage, setActivePage] = useState<number>(1);
    const [allAnswered, setAllAnswered] = useState<boolean>(false); // Whether or not the form is complete

    const questionsPerPage = 4;

    // Split up questions into array of pages (arrays of 'questionsPerPage' questions)
    const questionSets = Array.from( { length: Math.ceil(allQuestions.length / questionsPerPage) },
        (v, i) => allQuestions.slice(i * questionsPerPage, i * questionsPerPage + questionsPerPage));

    const lastPage = questionSets.length;

    // Callback to be sent down the DOM.
    // Only needs to be called on the last page where the submit
    // button is actually visible.
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

    // this is should handle assessment metric calculation
    // we just add up the scores of each circles
    // currently button have 0~6 values just adding these for metrics
    const handleSubmit = async() => {
        const totalScore = userResponses.reduce((acc, current) => acc + current, 0);

        await setDoc(doc(db, 'user-data', user.email), {
            mindScore: totalScore,
        }, { merge: true });

        router.push("/dashboard")
    }

    const renderActivePage = () => {

        // Get questions for the current page and the stored user responses
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