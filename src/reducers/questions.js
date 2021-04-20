import {RECEIVE_QUESTIONS, SET_QUESTION, ANSWER_QUESTION} from '../actions/question'
export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...action.questions
            }
        case SET_QUESTION:
            return{
                ...state,
                [action.question.id]: action.question
            }

        case ANSWER_QUESTION:
            return{
                ...state,
                [action.answer.qid]: {
                    ...state[action.answer.qid],
                    [action.answer.answer]: {
                    ...state[action.answer.qid][action.answer.answer],
                    votes: state[action.answer.qid][action.answer.answer].votes.concat([action.answer.authedUser])
                    }
                }
            }
    
        default:
            return state
    }
}