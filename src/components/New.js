import React, {Component} from 'react'
import {
    Grid,
    Paper,
    Divider,
    TextField,
    Button
} from '@material-ui/core'
import {connect} from 'react-redux'
import {handleSetQuestion} from '../actions/question'
import {withRouter} from 'react-router-dom'
class New extends Component{
    state = {
        optionOneText: '',
        optionTwoText: ''
    }
    handleSubmit=()=>{
        let question = {}
        question.optionOneText = this.state.optionOneText
        question.optionTwoText = this.state.optionTwoText
        question.author = this.props.authedUser
        this.props.dispatch(handleSetQuestion(question, ()=>{
            this.props.history.push('/')
        }))
    }
    onOptionOneChange = (event)=>{
        this.setState({
            optionOneText: event.target.value
        })
    }
    onOptionTwoChange = (event)=>{
        this.setState({
            optionTwoText: event.target.value
        })
    }
    render(){
        return(
            <Grid container justify='center' alignItems="center" spacing={3}>
                    <Paper elevation={3} style={{padding:20}}>
                        <h1>Create New Question</h1>
                        <Divider/>
                        <h2>Complete the question: </h2>
                        <h3>Would you rather</h3>
                        <form noValidate autoComplete="off">
                            <TextField
                             id="optionOne"
                              value={this.state.optionOneText}
                               label="Option 1"
                                variant="outlined"
                                 onChange={this.onOptionOneChange}
                                  />
                            <h4>Or</h4>
                            <TextField 
                            id="optionTwo"
                             value={this.state.optionTwoText}
                              label="Option 2" 
                              variant="outlined" 
                              onChange={this.onOptionTwoChange} 
                              />
                            <Divider/>
                            <Button color='primary' variant="contained" onClick={this.handleSubmit} >Submit</Button>
                        </form>
                    </Paper>
               
            </Grid>
        )
    }
}
function mapStateToProps({authedUser}){
    return{
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(New))
