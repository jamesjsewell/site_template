import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Grid, Segment, Input } from "semantic-ui-react"
import Login from "../../authComponents/loginComponent.js"
import Navbar from "../navBarComponent.js"

class HomePage extends Component {
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

                <Grid columns={"2"} divided inverted padded>

                    <Grid.Row color="black" stretched>

                        <Grid.Column width={4}>

                            <Segment inverted color={"grey"}>

                                <Login isInverted={true} />

                            </Segment>

                        </Grid.Column>

                        <Grid.Column width={"width"}>
                            <Login isInverted={true} />
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

export default connect(mapStateToProps)(HomePage)
