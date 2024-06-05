import { QuizContext } from "../contexts/quiz";
import Question from "./Question";
import { useContext } from "react";


const Quiz= ()=>{

    const [quizState,dispatch] = useContext(QuizContext);
    console.log(quizState)
    

    // console.log("render",state)
    
    return (
        <div className="quiz">
            {quizState.showResults && (
                <div className="results">
                    <div className="congratulations">Congratulations</div>
                    <div className="results-info">
                        <div>You have completed the quiz.</div>
                        <div>You have got 4 of {quizState.questions.length}.</div>
                    </div>
                    <div className="next-button" onClick={()=>dispatch({type:"RESTART"})}>
                        Restart
                    </div>

                </div>
            )}
            { !quizState.showResults && (
                <div>
                    <div className="score">
                        Question {quizState.currentQuestionIndex+1}/{quizState.questions.length}
                    </div>
                    <Question  />
                    <div className="next-button" onClick={()=>{dispatch({type:'NEXT_QUESTION'})}}>Next Question</div>
                </div>
            )
            }
            
        </div>
    );
}

export default Quiz;