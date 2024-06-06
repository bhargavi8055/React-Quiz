import { act, createContext,useReducer } from "react";
import { shuffleAnswers,normalizeQuestions } from "../helpers";
const initialState ={
    currentQuestionIndex:0,
    questions:[],
    showResults:false,
    answers:[],
    currentAnswer:"",
    correctAnswerCount:0,
    error:null
};

const reducer = (state,action)=>{
    switch(action.type){
        case "SELECT_ANSWER":
            const correctAnswerCount = 
            action.payload === state.questions[state.currentQuestionIndex].correctAnswer 
            ? state.correctAnswerCount+1
            :state.correctAnswerCount
            return {
                ...state,
                currentAnswer:action.payload,
                correctAnswerCount
            }
            
        
        case "NEXT_QUESTION":
            const showResults =state.currentQuestionIndex ===state.questions.length-1;
            const currentQuestionIndex  = showResults ?state.currentQuestionIndex:state.currentQuestionIndex+1;
            const answers = showResults?[]:shuffleAnswers(state.questions[currentQuestionIndex]);
            return {
                ...state,
                currentQuestionIndex,
                showResults,
                answers,
                currentAnswer:""
            };
           
        
        case "RESTART":
            return initialState;

        
        case "LOADED_QUESTIONS":
            const normalizedQuestions = normalizeQuestions(action.payload);
            return {
                ...state,
                questions:normalizedQuestions,
                answers:shuffleAnswers(normalizedQuestions[0])
            };
        
        case "SERVER_ERROR":
            return {
                ...state,
                error:action.payload
            }
            
        default:
            return state;
        
    }
    
}

// create a context
export const QuizContext = createContext();

// create a provider which will give data to all components
export const QuizProvider = ({children})=>{
    const stateValue = useReducer(reducer,initialState);
    return <QuizContext.Provider value={stateValue} >{children}</QuizContext.Provider>
}
