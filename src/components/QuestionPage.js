import React, {Component} from 'react'
import {
    Paper,
    Grid,
    Divider,
    Avatar,
    Button,
    FormControl,
    RadioGroup,
    Radio,
    FormControlLabel,
    LinearProgress,
    Box,
    Typography,
    Chip
} from '@material-ui/core'
import {connect} from 'react-redux'
import {handleAnswerQuestions} from '../actions/question'
class QuestionPage extends Component{
    state={
        choice: undefined
    }
    LinearProgressWithLabel = (props)=> {
        return (
          <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${Math.round(
                props.value,
              )}%`}</Typography>
            </Box>
          </Box>
        );
      }
   
    handleChange=(event)=>{
        this.setState({
            choice: event.target.value
        })
    }
    handleSubmit = ()=>{
        if(this.state.choice){
            let answer = {}
        answer.authedUser = this.props.authedUser
        answer.qid = this.props.question.id
        answer.answer = this.state.choice
        this.props.dispatch(handleAnswerQuestions(answer))
        }
        
    }
    getAnswerPercentageAndVotes(idq){
        const usersHasAnswered = Object.values(this.props.users).filter((u)=> u.answers[idq])
        const usersHasAnsweredOptionOne =  Object.values(this.props.users).filter((u)=> u.answers[idq] === "optionOne")
        const usersHasAnsweredOptionTwo =  Object.values(this.props.users).filter((u)=> u.answers[idq] === "optionTwo")
        return {
            optionOnePercentage: (usersHasAnsweredOptionOne.length / usersHasAnswered.length) * 100,
            optionTwoPercentage: (usersHasAnsweredOptionTwo.length / usersHasAnswered.length) * 100,
            optionOneVotes: `${usersHasAnsweredOptionOne.length} out of ${usersHasAnswered.length} ${usersHasAnswered.length>1?'votes':'vote'}`,
            optionTwoVotes: `${usersHasAnsweredOptionTwo.length} out of ${usersHasAnswered.length} ${usersHasAnswered.length>1?'votes':'vote'}`
        }
    }
 
    render(){
        const {users, authedUser, question, status} = this.props
        if(!question){
            return(<center>
                <h1>404 Error</h1>
                <h2>Poll does not exist!</h2>
            </center>)
        }
        const {id, author, optionOne, optionTwo} = question
        
        let answer = users[authedUser].answers[id]

        return(
                <Grid item style={{margin: 'auto'}} sm={8}>
                <Paper>
                <h2>{users[author].name} asks: </h2>
                <Divider/>
                    <Grid container  alignItems='center' spacing={3}>
                        
                        <Grid   item xs={12} sm={2}>
                            <center>
                                <Avatar src={require(`../images/${this.props.avatar}`).default} style={{height: 100, width: 100}} />
                            </center>
                            
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            {
                                status === 'asked'
                                ?
                                <div>
                                    <h2>Would you rather</h2>
                                <FormControl component="fieldset">
                                <RadioGroup aria-label="choice" name="choice" value={this.state.choice} onChange={this.handleChange}>
                                    <FormControlLabel value="optionOne" control={<Radio />} label={optionOne.text} />
                                    <FormControlLabel value="optionTwo" control={<Radio />} label={optionTwo.text} />
                                </RadioGroup>
                                <Button variant='contained' onClick={this.handleSubmit} color='primary' >Submit</Button>
                                </FormControl>


                                
                                </div>
                                
                                :
                                <div>
                                    <h2>Results :</h2>
                                    <Paper variant="outlined" square elevation={0}>
                                        {
                                            answer  === 'optionOne'?
                                            <b><Chip style={{position: 'relative', top: -15, left: -40}} label='Your choice' color='secondary' /></b>
                                            :
                                            null
                                        }
                                        
                                        <b><Typography>{`Whould you rather ${optionOne.text}`}</Typography></b>
                                        <this.LinearProgressWithLabel value={this.getAnswerPercentageAndVotes(id).optionOnePercentage} />
                                        <b><p style={{textAlign: 'center'}} >{this.getAnswerPercentageAndVotes(id).optionOneVotes}</p></b>
                                    </Paper>
                                    <br/>
                                    <Paper variant="outlined" square elevation={0}>
                                    {
                                            answer  === 'optionTwo'?
                                            <b><Chip style={{position: 'relative', top: -15, left: -40}} label='Your choice' color='secondary' /></b>
                                            :
                                            null
                                        }
                                        <b><Typography>{`Whould you rather ${optionTwo.text}`}</Typography></b>
                                        <this.LinearProgressWithLabel value={this.getAnswerPercentageAndVotes(id).optionTwoPercentage} />
                                        <b><p style={{textAlign: 'center'}} >{this.getAnswerPercentageAndVotes(id).optionTwoVotes}</p></b>
                                    </Paper>
                                </div>
                                
                            }
                            
                        </Grid>
                    </Grid>
                </Paper>
                </Grid>

        )
    }
}
function mapPropsToState({authedUser, users, questions}, props){
    const {question_id} = props.match.params
    const question = questions[question_id]
    return {
        authedUser,
        users,
        question: question,
        status: users[authedUser].answers[question_id] ? 'answered': 'asked',
        avatar: question ? users[question.author].avatarURL: ''
    }
}
export default connect(mapPropsToState)(QuestionPage)