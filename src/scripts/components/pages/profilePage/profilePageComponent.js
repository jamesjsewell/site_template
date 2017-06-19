import React, { Component } from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { Link } from "react-router-dom"
import { fetchUser } from "../../../actions/index.js"
import {
    updatePersonalInfo,
    readyToUpdatePersonalInfo
} from "../../../actions/userProfileActions.js"

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
import {
    required,
    maxLength,
    minLength,
    alphaNumeric,
    email,
    number
} from "../../helpers/formValidation.js"
import { FormField } from "../../helpers/formFields.js"
import _ from "underscore"

class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = { popupIsOpen: false }
    }
    componentWillMount() {
        this.props.fetchUser(this.props.user._id)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.updatedUser === true) {
            if (this.props.anyTouched) {
                this.props.untouch()
                this.props.reset()
                this.props.readyToUpdatePersonalInfo()
                this.handleOpenPopup()
            }
        } else {
            ///this.handleClosePopup()
        }
    }
    handleOpenPopup() {
        this.state.popupIsOpen = true

        this.state.popupIsOpen = setTimeout(() => {
            console.log("shit")
            this.setState({popupIsOpen: false })
            
        }, 2500)
        // setTimeout(() => {
        //     this.state.popupIsOpen = false
        // }, 2500)
    }

    handleClosePopup() {
        this.state.popupIsOpen = false
        clearTimeout(this.timeout)
    }

    handleFormSubmit(formProps) {
        var userInput = formProps

        var parsedInput = {
            profile: {
                firstName: userInput.firstName
                    ? userInput.firstName
                    : this.props.profile.firstName,
                lastName: userInput.lastName
                    ? userInput.lastName
                    : this.props.profile.lastName,
                age: userInput.age ? userInput.age : this.props.profile.age,
                gender: userInput.gender
                    ? userInput.gender
                    : this.props.profile.gender,
                location: userInput.location
                    ? userInput.location
                    : this.props.profile.location,
                relationshipStatus: userInput.relationshipStatus
                    ? userInput.relationshipStatus
                    : this.props.profile.relationshipStatus,
                website: userInput.website
                    ? userInput.website
                    : this.props.profile.website
            }
        }
        var updatedInfo = _.extend({}, this.props.profile, parsedInput)
        this.props.updatePersonalInfo(this.props.user._id, parsedInput)
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
        const { handleSubmit } = this.props
        console.log(this.props)
        const user = this.props.user
        const profile = this.props.profile
        console.log(this.props)

        if (user) {
            const userFistName = profile && profile.firstName
                ? profile.firstName
                : undefined,
                userLastName = profile && profile.lastName
                    ? profile.lastName
                    : undefined,
                userAge = profile && profile.age ? profile.age : undefined,
                userGender = profile && profile.gender
                    ? profile.gender
                    : undefined,
                userLocation = profile && profile.location
                    ? profile.location
                    : undefined,
                userRelationshipStatus = profile && profile.relationshipStatus
                    ? profile.relationshipStatus
                    : undefined,
                userWebsite = profile && profile.website
                    ? profile.website
                    : undefined

            return (
                <Grid container columns={1}>
                    <Grid.Row>
                        <Grid.Column width={6}>

                            <Segment>
                                <Form
                                    onSubmit={handleSubmit(
                                        this.handleFormSubmit.bind(this)
                                    )}
                                    size="huge"
                                    padded
                                    inverted={this.props.isInverted}
                                    loading={this.props.profile ? false : true}
                                >

                                    {this.renderAlert()}

                                    <Segment>
                                        <Field
                                            placeholder={userFistName}
                                            name="firstName"
                                            component={FormField}
                                            type="text"
                                            label="first name"
                                            validate={[alphaNumeric]}
                                        />

                                        <Field
                                            placeholder={userLastName}
                                            name="lastName"
                                            component={FormField}
                                            type="text"
                                            label="last name"
                                            validate={[alphaNumeric]}
                                        />
                                    </Segment>

                                    <Segment>
                                        <Field
                                            placeholder={
                                                userAge ? userAge : "enter age"
                                            }
                                            name="age"
                                            component={FormField}
                                            type="text"
                                            label="age"
                                            validate={[alphaNumeric, number]}
                                        />

                                        <Field
                                            placeholder={
                                                userGender
                                                    ? userGender
                                                    : "enter gender"
                                            }
                                            name="gender"
                                            component={FormField}
                                            type="text"
                                            label="gender"
                                            validate={[alphaNumeric]}
                                        />

                                        <Field
                                            placeholder={
                                                userLocation
                                                    ? userLocation
                                                    : "enter location"
                                            }
                                            name="location"
                                            component={FormField}
                                            type="text"
                                            label="location"
                                        />

                                        <Field
                                            placeholder={
                                                userRelationshipStatus
                                                    ? userRelationshipStatus
                                                    : "enter relationship status"
                                            }
                                            name="relationshipStatus"
                                            component={FormField}
                                            type="text"
                                            label="relationship status"
                                            validate={[alphaNumeric]}
                                        />

                                        <Field
                                            placeholder={
                                                userWebsite
                                                    ? userWebsite
                                                    : "enter your website"
                                            }
                                            name="website"
                                            component={FormField}
                                            type="text"
                                            label="your website"
                                        />
                                    </Segment>

                                    <Message
                                        visible={
                                            this.state.popupIsOpen
                                                ? true
                                                : false
                                        }
                                        hidden={
                                            this.state.popupIsOpen
                                                ? false
                                                : true
                                        }
                                        floating
                                        content="profile updated"
                                    />

                                    <Button
                                        type="submit"
                                        content="Save Changes"
                                    />

                                </Form>

                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            )
        } else {
            return <div>could not find user</div>
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        updatedUser: state.user.updatedUser,
        profile: state.user.profile
    }
}

export default connect(mapStateToProps, {
    fetchUser,
    updatePersonalInfo,
    readyToUpdatePersonalInfo
})(
    reduxForm({
        form: "profileForm"
    })(ProfilePage)
)
