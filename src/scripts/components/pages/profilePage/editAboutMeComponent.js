import React, { Component } from "react"
const { DOM: { input, select, textarea } } = React
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
    TextArea,
    FormField
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

class EditAboutMe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messageIsOpen: false,
            upToDateProfile: this.props.profile,
            upToDateUsername: this.props.username,
            value: ''
        }

    }
    componentWillMount() {
        //this.props.fetchUser(this.props.user._id)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.profile) {
            this.state.upToDateProfile = nextProps.profile
            this.state.upToDateUsername = nextProps.username
            this.state.value = nextProps.profile.aboutMe
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

    handleChange(event) {
        this.setState({ value: event.target.value })
    }
    handleOpenMessage() {
        this.state.messageIsOpen = true

        this.state.messageIsOpen = setTimeout(() => {
            this.setState({ messageIsOpen: false })
            this.props.resetStatusOfUpdate()
        }, 2500)
    }

    handleFormSubmit() {

        var userInput = this.state.value
        var updatedProfile = {}
        updatedProfile["profile"] = this.state.upToDateProfile
        updatedProfile["profile"]["aboutMe"] = userInput

        if (!this.props.updating && !this.props.updated) {
            this.props.updatePersonalInfo(this.props.user._id, updatedProfile)
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
        const { handleSubmit } = this.props,
            user = this.props.user,
            username = this.state.upToDateUsername
                ? this.state.upToDateUsername
                : undefined,
            profile = this.state.upToDateProfile

        if (user) {
            var aboutMe = profile && profile.aboutMe
                ? profile.aboutMe
                : "tell us about yourself"

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

            return (
                <Form
                    onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                    size="huge"
                    padded
                    inverted={this.props.isInverted}
                    loading={
                        this.props.updating || !profile === true ? true : false
                    }
                >

                    {this.renderAlert()}

                    <textarea
                        name="dicks"
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                    />

                    <Message
                        visible={this.state.messageIsOpen ? true : false}
                        hidden={this.state.messageIsOpen ? false : true}
                        floating
                        compact
                        success={this.props.updated ? true : false}
                        content={messageToUser}
                    />

                    <Segment>
                        {this.props.updating
                            ? null
                            : <Form.Field
                                  id="form-button-control-public"
                                  control={Button}
                                  content="save"
                                  loading={this.props.updating}
                                  type="submit"
                              />}
                    </Segment>

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
        form: "aboutMeForm"
    })(EditAboutMe)
)
