import React, {Component} from 'react'
import {
    Container,
    Paper,
    Divider,
    TextField,
    Button
} from '@material-ui/core'

class New extends Component{
    render(){
        return(
            <Container>
                <Paper elevation={3}>
                    <h1>Create New Question</h1>
                    <Divider/>
                    <h2>Complete the question: </h2>
                    <h3>Would you rather</h3>
                    <form noValidate autoComplete="off">
                        <TextField id="optionOne" label="Outlined" variant="outlined" />
                        <br/>
                        <h4>Or</h4>
                        <br/>
                        <TextField id="optionTwo" label="Outlined" variant="outlined" />
                        <Divider/>
                        <Button variant="contained" >Submit</Button>
                    </form>
                </Paper>
            </Container>
        )
    }
}

export default New
