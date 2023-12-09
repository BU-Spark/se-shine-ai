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

    const numQuestions = 20;

    const getRandomDocIDs = () => {
        const minVal = 1;
        const maxVal = 30;

        const numDocs = numQuestions;

        let pool = Array.from({ length: maxVal - minVal + 1 }, (_, i) => i + minVal);
        
        const selectedIDs = Array.from({ length: numDocs }, 
            () => {
                const randomIndex = Math.floor(Math.random() * pool.length);
                return pool.splice(randomIndex, 1)[0];
            });

        const documentIDs = selectedIDs.map(
            (idNum) => `example-question-${idNum < 10 ? `0${idNum}` : idNum}`
        );

        return documentIDs;
    };

    const fetchQuestions = async () => {
        const refPath = '/question-bank/assessment-questions-doc/assessment-questions/example-questions-doc/example-questions/';
        const fireRef = collection(db, refPath);

        const docIDs = getRandomDocIDs();

        const q = query(fireRef, where('__name__', 'in', docIDs));

        const questionDocs = await getDocs(q);
        console.log(questionDocs);
        let questionList: QuestionData[] = [];
        questionDocs.forEach((doc) => {
            const docData = doc.data();
            const randomIndex = Math.floor(Math.random() * (questionList.length + 1));

            const questionToAdd = {
                text: docData.question,
                answers: docData.answers
            } as QuestionData;

            questionList.splice(randomIndex, 0, questionToAdd);
        });

        questionList.forEach(
            (question, index) => 
                question.number = index + 1);

        setDbQuestions(questionList);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    // Placeholder questions in case db access fails
    const allQuestions = Array.from({ length: numQuestions }, 
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