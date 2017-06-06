import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'

class HomePage extends Component {

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {

    return (
      <div>
        <Button.Group>
          <Button basic color='red'>One</Button>
          <Button basic color='green'>Two</Button>
          <Button basic color='blue'>Three</Button>
        </Button.Group>
         <Button.Group size='large'>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Button.Group>
        <h3>welcome to the home page</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps)(HomePage);
