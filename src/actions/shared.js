import {receiveUsers} from './user'
import {receiveQuestions} from './question'
import * as API from '../utils/_DATA'

export function handleReceiveData(){
    return (dispatch)=>{
        API._getUsers()
        .then((users)=>{
            dispatch(receiveUsers(users))
            API._getQuestions()
            .then((questions)=>{
                dispatch(receiveQuestions(questions))
            })
        })
    }
}