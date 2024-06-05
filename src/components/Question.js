import { useContext } from "react";
import Answer from "./Answer";
import { QuizContext } from "../contexts/quiz";

const Question= ({questions})=>{
    const [quizState] = useContext(QuizContext);
    console.log("quizState in Question Comp",quizState)
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex].question;
    // console.log("currentQuestion",currentQuestion)
    return (
        <div>
            <div className="question">{currentQuestion}</div>
            <div className="answers">
                {quizState.answers.map((answer,index)=>(
                    <Answer answerText={answer} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default Question;