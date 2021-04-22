
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {handleReceiveData} from './actions/shared'
import Dashboard from './components/Dashboard'
import 'fontsource-roboto'
import Login from './components/Login'
class App extends Component{
  componentDidMount(){
    this.props.dispatch(handleReceiveData())
  }
  render(){
    const {authedUser} = this.props
    return(
      <div>
         {
        authedUser
        ?
        <Dashboard/>
        :
        <Login/>
      }
      </div>
     
        
    )
  }
}
function mapPropsToState({authedUser}){
  return{
    authedUser
  }
}
export default connect(mapPropsToState)(App)