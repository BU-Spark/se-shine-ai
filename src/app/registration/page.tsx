"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import ProgressBar from "@ramonak/react-progress-bar";

import Image from 'next/image';
import { db } from '@/firebase/firebaseConfig';
import { collection, doc, setDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

import data from "./data.json"; // statically importing the data

// format of firebase question datasets
interface QuestionData {
    id: number;
    question: string;
    quote: string;
    options: string[];
    layout: string | "table" | "bubble"; // table and bubble layouts supported
}

export default function Registration() {
    const router = useRouter();

    const { user } = useAuth();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionsData, setSelectedOptionsData] = useState<
        { id: number; options: string[] }[]
    >(data.map((item) => ({ id: item.id, options: [] }))); // contains id of questions, all selected options
    const currentQuestionData: QuestionData = data[currentQuestionIndex];

    // goes to next question
    const onNextClick = () => {
        if (currentQuestionIndex < data.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    // goes to previous question
    const onBackClick = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // updates selected options
    const onOptionClick = (option: string) => {
        const updatedSelectedOptionsData = [...selectedOptionsData];
        const questionIndex = updatedSelectedOptionsData.findIndex(
            (item) => item.id === currentQuestionData.id
        );
        const optionIndex = updatedSelectedOptionsData[questionIndex].options.indexOf(option);

        // if option is not selected (-1) then pushes
        // else removes the data
        if (optionIndex === -1) {
            updatedSelectedOptionsData[questionIndex].options.push(option);
        } else {
            updatedSelectedOptionsData[questionIndex].options.splice(optionIndex,1);
        }
        setSelectedOptionsData(updatedSelectedOptionsData);
    };

    // returns boolean
    // iterates through selected options of current question id
    // returns true for options saved
    const isOptionSelected = (option: string) => {
        const questionIndex = selectedOptionsData.findIndex(
            (item) => item.id === currentQuestionData.id
        );
        return selectedOptionsData[questionIndex].options.includes(option);
    };

    const uploadRegistrationData = async() => {
        const userEmail = user.email;
        const userDocRef = doc(collection(db, 'user-data'), userEmail);
        await setDoc(userDocRef, {
          'registration-question': selectedOptionsData,
        });
        router.push("/dashboard")
    }

    return (
        <div className={styles.registrationContainer}>
            <Image 
                src="/main-logo-dark.svg"
                alt="shine-ai"
                width={0}
                height={0}
                sizes="100vw"
                priority
                className={styles.mainLogoDark}
            />
            <div className={styles.arrowProgressBarContainer}>
                <Image 
                    src="/left-arrow.svg"
                    alt="shine-ai"
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority
                    onClick={onBackClick}
                    className={styles.leftArrow}
                />
                <div className={styles.progressbarContainer}>
                    <ProgressBar
                        completed={(currentQuestionIndex / (data.length - 1)) * 100}
                        bgColor="#1D2F5B"
                        baseBgColor="#E6E3EB"
                        height="15px"
                        customLabel=" "
                    />
                </div>
            </div>
            

            {currentQuestionData.layout === "bubble" ? (
                <>
                    <div className={styles.questionTitle}>
                        {currentQuestionData.question}
                    </div>
                    <div className={styles.questionQuote}>
                        {currentQuestionData.quote}
                    </div>
                    <div className={styles.bubbleStyleContainer}>
                        {currentQuestionData.options.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => onOptionClick(option)}
                                className={`${styles.bubbleStyleBox} ${isOptionSelected(option) ? styles.selected : ''}`}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                    {currentQuestionIndex < data.length - 1 ? (
                        <button className={styles.registrationButton} onClick={onNextClick}>Next</button>
                    ) : (
                        <button className={styles.registrationButton} onClick={uploadRegistrationData}>Submit</button>
                    )}
                </>
            ) : (
                <>
                    <div className={styles.questionTitle}>
                        {currentQuestionData.question}
                    </div>
                    <div className={styles.questionQuote}>
                        {currentQuestionData.quote}
                    </div>
                    <div className={styles.tableStyleContainer}>
                        {currentQuestionData.options.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => onOptionClick(option)}
                                className={`${styles.tableStyleBox} ${isOptionSelected(option) ? styles.selected : ''}`}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                    {currentQuestionIndex < data.length - 1 ? (
                        <button className={styles.registrationButton} onClick={onNextClick}>Next</button>
                    ) : (
                        <button className={styles.registrationButton} onClick={uploadRegistrationData}>Submit</button>
                    )}
                </>
            )}
        </div>
    );
}
