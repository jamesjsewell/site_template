import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Grid, Segment, Input, Header } from "semantic-ui-react"
import Login from "../../authComponents/loginComponent.js"
import Register from "../../authComponents/registerComponent.js"
import Navbar from "../navBarComponent.js"

class AuthPage extends Component {
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
            <div>

                <Grid columns={"2"} divided stackable stretched container>

                    <Grid.Row stretched>

                        <Grid.Column >

                            <Segment  padded>
                                <Header>login</Header>
                                <Login isInverted={false} />

                            </Segment>

                        </Grid.Column>

                        <Grid.Column >

                            <Segment  padded>
                                <Header>register</Header>
                                <Register isInverted={false} />
                            </Segment>

                        </Grid.Column>

                    </Grid.Row>

                </Grid>

            </div>
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

export default connect(mapStateToProps)(AuthPage)
