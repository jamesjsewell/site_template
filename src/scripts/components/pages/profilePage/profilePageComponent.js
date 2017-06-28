import React, { Component } from "react"
import { connect } from "react-redux"

import {
    Button,
    Grid,
    Segment,
    Input,
    Form,
    Header,
    Container,
    Message
} from "semantic-ui-react"

import EditProfile from "./editProfileComponent.js"

class ProfilePage extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {}
    componentWillReceiveProps(nextProps) {}

    render() {
        return (
            <Grid container columns={1}>
                <Grid.Row>
                    <Grid.Column width={9}>
                        <EditProfile />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
    undefined: undefined
    }
}

export default connect(mapStateToProps)(ProfilePage)

