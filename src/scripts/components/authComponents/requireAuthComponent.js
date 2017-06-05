import React, { Component } from 'react';
import { connect } from 'react-redux';
import bindActionCreators from 'redux'
import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'
import { protectedTest } from '../../actions/authActions';

const cookies = new Cookies();
var token = cookies.get('token');
var user = cookies.get('user')


class Authentication extends Component {

  componentWillMount() {
    console.log('i will mount', this.props.authenticated)
    if (token) {
      
      console.log(token)
      console.log(user)
      // Update application state. User has token and is probably authenticated
      //store.dispatch({ type: AUTH_USER });
      if(!this.props.authenticated){
        this.props.protectedTest()
      }
      
      console.log(this.props)
    
    }

    if (this.props.authenticated) {
      console.log('updated the component')
      //this.context.router.push('/login');
    }

  }

  componentDidMount() {
    console.log('component Mounted')
    if (this.props.authenticated) {
      console.log('updated the component')
      //this.context.router.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {

    if (token) {
      
      console.log(token)
      console.log(user)
      // Update application state. User has token and is probably authenticated
      //store.dispatch({ type: AUTH_USER });
      //nextProps.protectedTest()
      console.log(nextProps, nextProps)
     
    }

    if (nextProps.authenticated) {

      console.log('updated the component')
      //this.context.router.push('/login');

    }

  }

  render() {
    return <div><h3>is it authed {this.props.authenticated ? 'yes' : 'no'}</h3></div>;
  }

}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, { protectedTest })(Authentication);
