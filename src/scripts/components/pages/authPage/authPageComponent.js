import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Grid, Segment, Input, Header, Modal } from "semantic-ui-react"
import Login from "../../authComponents/loginComponent.js"
import ForgotPassword from "../../authComponents/forgotPasswordComponent.js"
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

                        <Grid.Column>

                            <Header
                                size="large"
                                attached="top"
                                textAlign="center"
                            >
                                login
                            </Header>

                            <Segment attached>

                                <Login isInverted={false} />

                                <Segment>
                                    <Modal
                                        trigger={
                                            <Button>forgot password?</Button>
                                        }
                                    >
                                        <Modal.Header>
                                            Request password change
                                        </Modal.Header>
                                        <Modal.Content>
                                            <Modal.Description>
                                                <ForgotPassword />
                                            </Modal.Description>
                                        </Modal.Content>
                                    </Modal>
                                </Segment>
                            </Segment>

                        </Grid.Column>

                        <Grid.Column>

                            <Header attached="top" size="large" textAlign="center">
                                <Header.Content>
                                    register
                                </Header.Content>
                            </Header>

                            <Segment attached>
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
