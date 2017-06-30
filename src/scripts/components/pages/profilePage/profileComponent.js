import React, { Component } from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { Link } from "react-router-dom"
import { fetchUser } from "../../../actions/index.js"
import {
    updatePersonalInfo,
    resetStatusOfUpdate
} from "../../../actions/userProfileActions.js"

import {
    Button,
    Grid,
    Segment,
    Input,
    Form,
    Header,
    Container,
    Message,
    Item
} from "semantic-ui-react"
import {
    required,
    maxLength,
    minLength,
    alphaNumeric,
    email,
    number,
    asyncValidate,
    shouldAsyncValidate
} from "../../helpers/formValidation.js"

import _ from "underscore"

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messageIsOpen: false,
            upToDateProfile: this.props.profile,
            upToDateUsername: this.props.username
        }
    }

    componentWillMount() {
        // console.log(this.props.user._id)
        // this.props.fetchUser(this.props.user._id)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile) {
            this.state.upToDateProfile = nextProps.profile
            this.state.upToDateUsername = nextProps.username
        }

        if (nextProps.username) {
            this.state.upToDateUsername = nextProps.username
        }

        if (
            nextProps.updated === true ||
            nextProps.updating === true ||
            nextProps.errorUpdating === true
        ) {
            if (this.props.anyTouched) {
                this.props.untouch()
                this.props.reset()
                this.handleOpenMessage()
            }
        }
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div>

                    <span>

                        <strong>Error!</strong> {this.props.errorUpdating}

                    </span>

                </div>
            )
        }
    }

    render() {
        const user = this.props.user
        const username = this.state.upToDateUsername
            ? this.state.upToDateUsername
            : undefined
        const profile = this.state.upToDateProfile

        if (user) {
            var userAttributes = [`username: ${username}`]
            for (var attribute in profile) {
                switch (attribute) {
                    case "firstName": {
                        if (profile.firstName && profile.lastName) {
                            userAttributes[1] = `full name: ${profile.firstName} ${profile.lastName}`
                        } else {
                            if (profile.lastName && !profile.firstName) {
                                userAttributes[1] = `last name: ${profile.lastName}`
                            }
                            if (profile.firstName && !profile.lastName) {
                                userAttributes[1] = `first name: ${profile.firstName}`
                            }
                        }
                    }

                    case "age": {
                        userAttributes[2] = profile.age
                            ? `age: ${profile.age}`
                            : undefined
                    }

                    case "gender": {
                        userAttributes[3] = profile.gender
                            ? `gender: ${profile.gender}`
                            : undefined
                    }

                    case "location": {
                        userAttributes[4] = profile.location
                            ? `location: ${profile.location}`
                            : undefined
                    }

                    case "relationshipStatus": {
                        userAttributes[5] = profile.relationshipStatus
                            ? `relationship: ${profile.relationshipStatus}`
                            : undefined
                    }

                    case "website": {
                        userAttributes[6] = profile.relationshipStatus
                            ? `website: ${profile.website}`
                            : undefined
                    }
                }
            }

            var attributeNodes = []

            for (var attr = 0; attr < userAttributes.length; attr++) {
                var theAttribute = userAttributes[attr]
                    ? userAttributes[attr].toString()
                    : undefined
                console.log(theAttribute)
                if (theAttribute && theAttribute.replace(/ /g, "")) {
                    attributeNodes.push(
                        <Segment>{userAttributes[attr]}</Segment>
                    )
                }
            }

            return (
                <Segment.Group as={Segment} attached>
                    {attributeNodes}
                </Segment.Group>
            )
        } else {
            return <div>could not find user</div>
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        profile: state.user.profile,
        username: state.user.username
    }
}

export default connect(mapStateToProps)(Profile)
