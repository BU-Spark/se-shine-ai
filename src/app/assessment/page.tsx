'use client'

import Assessment from "@/components/assessment/Assessment";
import AssessmentNavBar from "@/components/assessment/AssessmentNavBar";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { app } from '@/firebase/firebaseConfig';
import { useEffect, useState } from "react";
import { QuestionData } from "@/components/assessment/types";

export default function AssessmentPage() {
    
    const [dbQuestions, setDbQuestions] = useState<QuestionData[]>([]);

    const db = getFirestore(app);

    const fetchQ = async () => {
        const refPath = '/question-bank/assessment-questions-doc/assessment-questions/example-questions-doc/example-questions/';
        const fireRef = collection(db, refPath);
        const q = query(fireRef, where('__name__', '<=', 'example-question-20'));

        const questionDocs = await getDocs(q);
        let questionList: QuestionData[] = [];
        let qNum = 1;
        questionDocs.forEach((doc) => {
            const docData = doc.data();
            questionList.push({
                number: qNum,
                text: docData.question,
                answers: docData.answers
            } as QuestionData);
            qNum++;
        });
        setDbQuestions(questionList);
    };

    useEffect(() => {
        fetchQ();
    }, []);

    const allQuestions = Array.from({ length: 10 }, 
        (v, i) => ({
            number: i + 1,
            text: `Default Example ${i + 1}`,
            answers: {
                low: 'Extreme 1',
                high: 'Extreme 2'
            }

        })
    );

    let userResponses = Array(allQuestions.length).fill(null);

    const updateResponse = (questionNumber: number, updatedValue: number | null) => {
        userResponses[questionNumber - 1] = updatedValue;
    };
    return (
        <div>
            <AssessmentNavBar/>
            <Assessment 
                allQuestions={dbQuestions.length > 0 ? dbQuestions : allQuestions} 
                userResponses={userResponses} 
                responseCallback={updateResponse}  />
        </div>
    );
}