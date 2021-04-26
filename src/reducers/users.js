import {RECEIVE_USERS, SET_USER_QUESTION, SET_USER_ANSWER} from '../actions/user'

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            
            return{
                ...action.users
            }
        case SET_USER_QUESTION:
            return{
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.concat([action.question.id])
                }
            }
        case SET_USER_ANSWER:
            return{
                ...state,
                [action.answer.authedUser]: {
                    ...state[action.answer.authedUser],
                    answers: {
                    ...state[action.answer.authedUser].answers,
                    [action.answer.qid]: action.answer.answer
                    }
                }
            }
    
        default:
            return state
    }
}