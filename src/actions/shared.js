import {receiveUsers} from './user'
import {receiveQuestions} from './question'
import { showLoading, hideLoading } from 'react-redux-loading'
import * as API from '../utils/_DATA'

export function handleReceiveData(){
    return (dispatch)=>{
        dispatch(showLoading())
        API._getUsers()
        .then((users)=>{
            dispatch(receiveUsers(users))
            API._getQuestions()
            .then((questions)=>{
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            })
            
        })
    }
}