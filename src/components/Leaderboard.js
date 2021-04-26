import React from 'react';
import {connect} from 'react-redux';
import Score from './Score'
function Leaderboard(props){

    return(
        <div>
            {
                Object.values(props.users).map((u)=>
                    <Score key={u.id} user={u} />
                )
            }
        </div>
    )
}
function mapPropsToState({users}){
    const usersArray = Object.values(users)
    return{
        users: usersArray.sort((a,b)=>(b.questions.length + Object.values(b.answers).length) - (a.questions.length + Object.values(a.answers).length) )
    }
}
export default connect(mapPropsToState)(Leaderboard)