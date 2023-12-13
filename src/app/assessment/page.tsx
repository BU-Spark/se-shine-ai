'use client'

import Assessment from "@/components/assessment/Assessment";
import AssessmentNavBar from "@/components/assessment/AssessmentNavBar";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { app } from '@/firebase/firebaseConfig';
import { useEffect, useState } from "react";
import { QuestionData } from "@/components/assessment/types";

/**
 * 
 * The AssessmentPage component.
 * Has AssessmentNavBar and Assessment as child components.
 * 
 * Responsible for:
 *  - Getting questions from db (draw 20 at random)
 *  - Keeping track of user's selected answers
 *  - Passing questions and responses down to the Assessment component
 *  - Displaying the interactive Assessment component
 */
export default function AssessmentPage() {
    
    const [dbQuestions, setDbQuestions] = useState<QuestionData[]>([]);

    const db = getFirestore(app);

    const numQuestions = 20;

    /**
     * 
     * Generates list of 20 random document IDs.
     * Document IDs are in the form "example-question-n"
     * where n is a number from 1 to 30 (currently; depends
     * on how many questions are in db). 
     */
    const getRandomDocIDs = () => {
        const minVal = 1;
        const maxVal = 30; // Should eventually be retrieving this val from a doc field from db

        const numDocs = numQuestions;

        // Generate array with consecutive numbers from minVal to maxVal
        let pool = Array.from({ length: maxVal - minVal + 1 }, (_, i) => i + minVal);
        
        // Sample 'numDocs' values from 'pool' (without repeats)
        const selectedIDs = Array.from({ length: numDocs }, 
            () => {
                const randomIndex = Math.floor(Math.random() * pool.length);
                return pool.splice(randomIndex, 1)[0];
            });

        // Convert random number array to document ID format
        const documentIDs = selectedIDs.map(
            (idNum) => `example-question-${idNum < 10 ? `0${idNum}` : idNum}`
        );

        return documentIDs;
    };

    /**
     * Fetch questions from db.
     * Currently only fetches from the example questions
     * collection in firestore.
     */
    const fetchQuestions = async () => {
        const refPath = '/question-bank/assessment-questions-doc/assessment-questions/example-questions-doc/example-questions/';
        const fireRef = collection(db, refPath);

        const docIDs = getRandomDocIDs();

        const q = query(fireRef, where('__name__', 'in', docIDs));

        const questionDocs = await getDocs(q);

        // This will hold our final list of questions
        let questionList: QuestionData[] = []; 

        // Firestore always returns documents in sorted order, but we want 
        // random ordering of of questions, so we build the list by inserting
        // at random indices.
        questionDocs.forEach((doc) => {
            const docData = doc.data();
            const randomIndex = Math.floor(Math.random() * (questionList.length + 1));

            const questionToAdd = {
                text: docData.question,
                answers: docData.answers
            } as QuestionData;

            questionList.splice(randomIndex, 0, questionToAdd);
        });

        // Number the questions (used for keeping track of user responses)
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

    // The entry at the i-th index will hold the user's response to
    // question #(i+1). Currently only holds numbers (or null) but eventually
    // could be extended to objects to hold responses for more complex questions.
    let userResponses = Array(allQuestions.length).fill(null);

    // Callback to be sent down all the way down the DOM
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