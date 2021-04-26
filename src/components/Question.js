import React from 'react'
import {
    Paper,
    Grid,
    Divider,
    Avatar,
    Button,
} from '@material-ui/core'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
function Question(props){
    
    const toParent = (e, id)=>{
        e.preventDefault()
        props.history.push(`/questions/${id}`)
    }
  
    const {id} = props.question
        return(
                <Grid item style={{margin: 'auto'}} sm={8}>
                <Paper>
                <h2>{props.authorName} asks: </h2>
                <Divider/>
                    <Grid container  alignItems='center' spacing={3}>
                        
                        <Grid   item xs={12} sm={2}>
                            <center>
                                <Avatar src={require(`../images/${props.avatar}`).default} style={{height: 100, width: 100}} />
                            </center>
                            
                        </Grid>
                        <Grid item xs={12} sm={10}>
                                <div>
                                    <h2>Would you rather</h2>
                                    
                                    <Button variant='contained' color='primary' onClick={(e)=> toParent(e, id)}  >View poll</Button>
                                    
                                </div> 
                        </Grid>
                    </Grid>
                </Paper>
                </Grid>

        )
    
}
function mapPropsToState({questions, users}, props){
    const {questionId} = props
    const question = questions[questionId]
    return {
        question: question,
        avatar: users[question.author].avatarURL,
        authorName: users[question.author].name
    }
}
export default withRouter(connect(mapPropsToState)(Question))