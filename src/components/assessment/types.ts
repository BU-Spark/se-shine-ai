export interface QuestionData {
    number: number;
    text: string;
    answers: {
        low: string,
        high: string
    };
};