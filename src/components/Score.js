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
    return(
        <center>
            <Grid sm={6}>
            <Paper >
          <Grid container alignItems='center'>
            <Grid item xs={3} sm={2} >
                <center>
                    <Avatar style={{height: 100, width: 100}} />
                    
                </center>
            </Grid>
            <Grid item xs={6} sm={8} >
                <center>
                    <h3>Sarah Edo</h3>
                <Typography>Answered questions : <Badge badgeContent={2} color='primary' /></Typography>
                <Typography>Asked questions : <Badge badgeContent={2} color='primary' /></Typography>
                </center>
                
            </Grid>
            <Grid justify='space-between' item xs={3} sm={2} >
                <h3>Score</h3>
                <Divider/>
                <h1>10</h1>
            </Grid>
          </Grid>
        </Paper>  
        </Grid>
        </center>
        
    )
        
      
}
export default Score