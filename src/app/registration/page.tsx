"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import ProgressBar from "@ramonak/react-progress-bar";

import Image from 'next/image';
import { db } from '@/firebase/firebaseConfig';
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

// notification modals for over clicking options
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// format of firebase question datasets
interface QuestionData {
    id: number;
    layout: string | "table" | "bubble"; // table and bubble layouts supported
    maxSelect: number;
    options: string[];
    question: string;
    quote: string;
}

export default function Registration() {
    const router = useRouter();

    const { user } = useAuth();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [data, setData] = useState<QuestionData[]>([])
    const [selectedOptionsData, setSelectedOptionsData] = useState<{ id: number; options: string[] }[]>([]);
    const currentQuestionData: QuestionData = data[currentQuestionIndex];

    useEffect(() => {
        // fetch data from registration-bank/registration-data/ collections
        const fetchData = async () => {
            const docRef = doc(db, "registration-bank", "registration-data");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const registrationData = docSnap.data();
                const fetchedData = registrationData['registration-data']; // questions inside registration-data
                // initialize data and selectedOptionsData which will be empty
                setData(fetchedData);
                setSelectedOptionsData(fetchedData.map((item: QuestionData) => ({ id: item.id, options: [] })));
            }
        };

        fetchData();
    }, []);

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
        const selectedOptions = updatedSelectedOptionsData[questionIndex].options;
        const optionIndex = selectedOptions.indexOf(option);
    
        if (optionIndex === -1) {
            if (selectedOptions.length < currentQuestionData.maxSelect) {
                selectedOptions.push(option);
            } else {
                toast.warn(`Can't go over ${currentQuestionData.maxSelect} options.`);
            }
        } else {
            selectedOptions.splice(optionIndex, 1);
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
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
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
            
            {/* checking data length and currentQuestionData is crucial here
            need to wait until it renders from useEffect above */}
            {data.length > 0 && currentQuestionData && (
                currentQuestionData.layout === "bubble" ? (
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
                )
            )}
        </div>
    );
}
