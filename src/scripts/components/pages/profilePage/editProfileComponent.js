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
    Item,
    Label
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
import { FormField } from "../../helpers/formFields.js"
import _ from "underscore"

class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messageIsOpen: false,
            upToDateProfile: this.props.profile,
            upToDateUsername: this.props.username
        }
    }
    componentWillMount() {
        this.props.fetchUser(this.props.user._id)
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
    handleOpenMessage() {
        this.state.messageIsOpen = true

        this.state.messageIsOpen = setTimeout(() => {
            this.setState({ messageIsOpen: false })
            this.props.resetStatusOfUpdate()
        }, 2500)
    }

    handleFormSubmit(formProps) {
        var userInput = formProps

        const profile = this.state.upToDateProfile
        const username = this.state.upToDateUsername

        var parsedInput = {
            username: userInput.username ? userInput.username : username,
            profile: {
                firstName: userInput.firstName
                    ? userInput.firstName
                    : profile.firstName,
                lastName: userInput.lastName
                    ? userInput.lastName
                    : profile.lastName,
                age: userInput.age ? userInput.age : profile.age,
                gender: userInput.gender ? userInput.gender : profile.gender,
                location: userInput.location
                    ? userInput.location
                    : profile.location,
                relationshipStatus: userInput.relationshipStatus
                    ? userInput.relationshipStatus
                    : profile.relationshipStatus,
                website: userInput.website ? userInput.website : profile.website
            }
        }

        if (!this.props.updating && !this.props.updated) {
            this.props.updatePersonalInfo(this.props.user._id, parsedInput)
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
        const { handleSubmit } = this.props
        const user = this.props.user
        const username = this.state.upToDateUsername
            ? this.state.upToDateUsername
            : undefined
        const profile = this.state.upToDateProfile

        if (user) {
            var messageToUser = ""
            if (this.props.updating === true) {
                messageToUser = "updating your profile"
            }
            if (this.props.updated === true) {
                messageToUser = "updated your profile"
            }
            if (this.props.errorUpdating) {
                messageToUser = this.props.errorUpdating
            }
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
                <Form
                    onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                    size="large"
                    padded
                    inverted={this.props.isInverted}
                    loading={
                        this.props.updating || !profile === true ? true : false
                    }
                >

                    {this.renderAlert()}

                    <Segment.Group horizontal>
                    <Segment>

                        <Field
                            placeholder={username}
                            name="username"
                            component={FormField}
                            type="text"
                            label="username"
                            validate={[alphaNumeric]}
                        />

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

                        <Field
                            placeholder={userAge ? userAge : "enter age"}
                            name="age"
                            component={FormField}
                            type="text"
                            label="age"
                            validate={[alphaNumeric, number]}
                        />

                    </Segment>

                    <Segment>
                    </Segment>

                    <Segment>

                        <Field
                            placeholder={
                                userGender ? userGender : "enter gender"
                            }
                            name="gender"
                            component={FormField}
                            type="text"
                            label="gender"
                            validate={[alphaNumeric]}
                        />

                        <Field
                            placeholder={
                                userLocation ? userLocation : "enter location"
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
                                userWebsite ? userWebsite : "enter your website"
                            }
                            name="website"
                            component={FormField}
                            type="text"
                            label="your website"
                        />

                    </Segment>

                    <Segment>
                    </Segment>

                    <Segment>
                    <Header>about me</Header>
                    <textarea
                        name="aboutMe"
                        value={'lol'}
                        // onChange={this.handleChange.bind(this)}
                    />  
                    </Segment>


                    </Segment.Group>

                    <Message
                        visible={this.state.messageIsOpen ? true : false}
                        hidden={this.state.messageIsOpen ? false : true}
                        floating
                        compact
                        success={this.props.updated ? true : false}
                        content={messageToUser}
                    />

                    {this.props.updating
                        ? null
                        : <Button
                              type="submit"
                              content="save"
                              loading={this.props.updating}
                          />}

                </Form>
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
        username: state.user.username,
        updating: state.user.updatingProfile,
        updated: state.user.updateProfileSuccess,
        errorUpdating: state.user.updateProfileError
    }
}

export default connect(mapStateToProps, {
    fetchUser,
    updatePersonalInfo,
    resetStatusOfUpdate
})(
    reduxForm({
        form: "profileForm",
        asyncValidate,
        asyncBlurFields: ["username"],
        shouldAsyncValidate
    })(EditProfile)
)
