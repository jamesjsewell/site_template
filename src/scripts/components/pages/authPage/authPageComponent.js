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

                <Grid columns={"2"} divided inverted padded stackable>

                    <Grid.Row color="black" stretched>

                        <Grid.Column width={4}>

                            <Segment inverted color={"green"} padded>
                                <Header>login</Header>
                                <Login isInverted={true} />

                            </Segment>

                        </Grid.Column>

                        <Grid.Column width={"width"}>

                            <Segment inverted color={"grey"} padded>
                                <Header>register</Header>
                                <Register isInverted={true} />
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
