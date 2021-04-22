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

class Question extends Component{
    state={
        status: 'hidden', //hidden, asked, answered
        choice: ''
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
    handleSeePoll = ()=>{
        this.setState((prevState)=>({
            status: prevState.status === 'hidden'? 'answered': 'hidden'
        }))
    }
    render(){
        return(
            <div>
                <Paper>
                <h1>Sarah Edo asks: </h1>
                <Divider/>
                    <Grid container  alignItems='center' spacing={3}>
                        
                        <Grid   item xs={12} sm={2}>
                            <center>
                                <Avatar style={{height: 100, width: 100}} />
                            </center>
                            
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            {
                                this.state.status === 'hidden'
                                ?
                                <div>
                                    <h2>Would you rather</h2>
                                    <Button variant='contained' color='primary' onClick={this.handleSeePoll} >View poll</Button>
                                </div>
                                
                                :
                                this.state.status === 'asked'
                                ?
                                <div>
                                    <h2>Would you rather</h2>
                                <FormControl component="fieldset">
                                <RadioGroup aria-label="choice" name="choice" value={this.state.choice} onChange={this.handleChange}>
                                    <FormControlLabel value="option1" control={<Radio />} label="Option1" />
                                    <FormControlLabel value="option2" control={<Radio />} label="Option2" />
                                </RadioGroup>
                                <Button variant='contained' color='primary' >Submit</Button>
                                </FormControl>


                                
                                </div>
                                
                                :
                                <div>
                                    <h2>Results :</h2>
                                    <Paper variant="outlined" square elevation={0}>
                                        <b><Chip style={{position: 'relative', top: -15, left: -40}} label='Your choice' color='secondary' /></b>
                                        <h3>Would you rather</h3>
                                        <this.LinearProgressWithLabel value={50} />
                                    </Paper>
                                    <br/>
                                    <Paper variant="outlined" square elevation={0}>
                                        <b><Chip style={{position: 'relative', top: -15, left: -40}} label='Your choice' color='secondary' /></b>
                                        <h3>Would you rather</h3>
                                        <this.LinearProgressWithLabel value={30} />
                                    </Paper>
                                </div>
                                
                            }
                            
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
}
export default Question