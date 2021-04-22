import React, {Component} from 'react'
import {
    Grid,
    Paper,
    Divider,
    TextField,
    Button
} from '@material-ui/core'

class New extends Component{
    render(){
        return(
            <Grid container justify='center' alignItems="center" spacing={3}>
                    <Paper elevation={3} style={{padding:20}}>
                        <h1>Create New Question</h1>
                        <Divider/>
                        <h2>Complete the question: </h2>
                        <h3>Would you rather</h3>
                        <form noValidate autoComplete="off">
                            <TextField id="optionOne" label="Option 1" variant="outlined" />
                            <h4>Or</h4>
                            <TextField id="optionTwo" label="Option 2" variant="outlined" />
                            <Divider/>
                            <Button color='primary' variant="contained" >Submit</Button>
                        </form>
                    </Paper>
               
            </Grid>
        )
    }
}

export default New
