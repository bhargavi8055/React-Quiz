import { createContext,useReducer } from "react";
import questions from '../data';
import { shuffleAnswers } from "../helpers";
const initialState ={
    currentQuestionIndex:0,
    questions:questions,
    // questions
    showResults:false,
    answers:shuffleAnswers(questions[0]),
};

const reducer = (state,action)=>{
    if(action.type==='NEXT_QUESTION'){
        const showResults =state.currentQuestionIndex ===state.questions.length-1;
        const currentQuestionIndex  = showResults ?state.currentQuestionIndex:state.currentQuestionIndex+1;
        const answers = showResults?[]:shuffleAnswers(state.questions[currentQuestionIndex]);
        return {
            ...state,
            currentQuestionIndex,
            showResults,
            answers
        };
    }
    if(action.type==="RESTART"){
        return initialState;
    }
    return state;
}

// create a context
export const QuizContext = createContext();

// create a provider which will give data to all components
export const QuizProvider = ({children})=>{
    const stateValue = useReducer(reducer,initialState);
    console.log("state",stateValue)
    return <QuizContext.Provider value={stateValue} >{children}</QuizContext.Provider>
}