import * as API from '../utils/_DATA';
import {setUserQuestion, setUserAnswer} from '../actions/user'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SET_QUESTION = 'SET_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export function receiveQuestions(questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function setQuestion(question){
    return {
        type: SET_QUESTION,
        question
    }
}
function answerQuestion(answer){
    return {
        type: ANSWER_QUESTION,
        answer
    }
}

export function handleSetQuestion(question, callback){
    return (dispatch)=>{
        API._saveQuestion(question)
        .then((question)=>{
            dispatch(setQuestion(question))
            dispatch(setUserQuestion(question))
            callback()
        })
    }
}

export function handleAnswerQuestions(answer) {
    return (dispatch)=>{
        API._saveQuestionAnswer(answer)
        .then(()=>{
            dispatch(setUserAnswer(answer))
            dispatch(answerQuestion(answer))
        })
    }
}