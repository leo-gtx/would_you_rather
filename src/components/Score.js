import React from 'react'
import {
    Paper,
    Grid,
    Avatar,
    Typography,
    Badge,
    Divider
} from '@material-ui/core'
function Score(props) {
    const {name, answers, questions, avatarURL} = props.user
    return(
        <center>
            <Grid sm={6}>
            <Paper >
          <Grid container alignItems='center'>
            <Grid item xs={3} sm={2} >
                <center>
                    <Avatar src={require(`../images/${avatarURL}`).default} style={{height: 100, width: 100}} />
                    
                </center>
            </Grid>
            <Grid item xs={6} sm={8} >
                <center>
                    <h3>{name}</h3>
                <Typography>Answered questions : <Badge badgeContent={Object.values(answers).length} color='primary' /></Typography>
                <Typography>Asked questions : <Badge badgeContent={questions.length} color='primary' /></Typography>
                </center>
                
            </Grid>
            <Grid justify='space-between' item xs={3} sm={2} >
                <h3>Score</h3>
                <Divider/>
                <h1>{Object.values(answers).length + questions.length}</h1>
            </Grid>
          </Grid>
        </Paper>  
        </Grid>
        <br/>
        </center>

        
    )
        
      
}
export default Score