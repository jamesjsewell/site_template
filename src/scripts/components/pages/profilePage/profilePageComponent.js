import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Grid, Segment, Input, Container } from "semantic-ui-react"
import { dataIsLoading } from "../../../actions/testActions.js"
import { fetchUser } from "../../../actions/index.js"

class ProfilePage extends Component {

    componentWillReceiveProps(nextProps) {
        
        if(nextProps.user){

        }
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div>

                    <span>

                        <strong>Error!</strong> {this.props.errorMessage}

                    </span>

                </div>
            )
        }
    }

    render() {
        console.log(this.props.user)
        //first name
        //last name
        //location
        //dob
        //sex
        //profile image
        
        return (
            <Grid container columns='equal' padded>
                <Grid.Column>
                  <h3>{this.props.user._id}</h3>
                </Grid.Column>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {

        user: state.auth.user,
        errorMessage: state.auth.error,
        message: state.auth.message,
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps, { dataIsLoading, fetchUser })(ProfilePage)
