
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {handleReceiveData} from './actions/shared'
import Dashboard from './components/Dashboard'
import 'fontsource-roboto'
class App extends Component{
  componentDidMount(){
    this.props.dispatch(handleReceiveData())
  }
  render(){
    return(
        <Dashboard/>
    )
  }
}

export default connect()(App)