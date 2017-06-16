import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Grid, Segment, Input, Container } from "semantic-ui-react"
import { dataIsLoading } from '../../../actions/testActions.js'


class NotAuthenticatedPage extends Component {
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

        return (

            <Container centered type="text">

                <p>
                    You do not have permission to view this content
                </p>

            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        message: state.auth.message,
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps, { dataIsLoading })(NotAuthenticatedPage)
