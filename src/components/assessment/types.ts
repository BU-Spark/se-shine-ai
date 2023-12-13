// Holds data for one question
export interface QuestionData {
    number: number;     // The question # in the user's assessment (not db)
    text: string;       // The actual question
    answers: {          // Currently only supports questions that ask for an answer along a spectrum
        low: string,    // Text for low end of spectrum
        high: string    // Text for high end of spectrum
    };
};

// Questions that need more complex data (i.e. weighted answer choices)
// should be defined or modified here.
