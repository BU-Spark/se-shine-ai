'use client'

import Assessment from "@/components/assessment/Assessment";
import AssessmentNavBar from "@/components/assessment/AssessmentNavBar";

export default function AssessmentPage() {

    const allQuestions = Array.from({ length: 20 }, 
        (v, i) => ({
            number: i + 1,
            text: `Question ${i + 1}`,
            answers: ['Extreme 1', 'Extreme 2']

        })
    );

    let userResponses = Array(allQuestions.length).fill(null);

    const updateResponse = (questionNumber: number, updatedValue: number | null) => {
        userResponses[questionNumber - 1] = updatedValue;
    };

    return (
        <div>
            <AssessmentNavBar/>
            <Assessment allQuestions={allQuestions} userResponses={userResponses} responseCallback={updateResponse}  />
        </div>
    );
}