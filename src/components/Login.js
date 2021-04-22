import React,{Component} from 'react'
import { Grid, Paper, Select } from '@material-ui/core'
import  logo from '../logo.svg'
import {connect} from 'react-redux'
import {signIn} from '../actions/authedUser'
class Login extends Component{
    state = {
        user: ''
    }
    handleChange = (event)=>{
        this.props.dispatch(signIn(event.target.value))
    }
    render(){
        const {users} = this.props
        return(
            <center>
                <Grid justify='center' sm={6} >
                    <Paper>
                        <Grid alignItems='center' item >
                            <center>
                                <img src={logo}/>
                            </center>
                        </Grid>
                        <Grid item>
                            <center>
                                <Select
                                style={{width: '100%'}}
                                native
                                onChange={this.handleChange}
                                value={this.state.user}
                                variant='outlined'
                                label='Select your player'
                                >
                                    {
                                        Object.values(users).map((user)=>
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                        )
                                    }
                                    
                                </Select>
                            </center>
                        
                        </Grid>
                    </Paper>
                </Grid>
            </center>
        )
    }
}
function mapPropsToState({users}){
    return {
        users
    }
}
export default connect(mapPropsToState)(Login)