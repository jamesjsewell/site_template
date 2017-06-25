import React, { Component } from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { resetPassword } from "../../actions/authActions.js"
import { Button, Grid, Segment, Input, Form } from "semantic-ui-react"
import { FormField } from "../helpers/formFields.js"
import {
    required,
    maxLength,
    minLength,
    alphaNumeric,
    email,
    shouldAsyncValidate,
    asyncValidate
} from "../helpers/formValidation.js"

const form = reduxForm({
    form: "resetPassword",
    validate
})

function validate(formProps) {
        const errors = {}

        if (!formProps.password) {
            errors.password = "enter your password"
        }

        if (!formProps.passwordConfirm) {
            errors.passwordConfirm = "confirm your password"
        }

        if (formProps.password !== formProps.passwordConfirm) {
            errors.passwordConfirm = "passwords must match"
        }

        return errors
    }

class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = { dispatchedReset: false }
    }

    handleFormSubmit({ password }) {
        console.log(this.props)
        const resetToken = this.props.match.params.resetToken
        this.props.resetPassword(resetToken, { password })
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <Segment color="red" compact>
                    <span>
                        <strong>Registration Error: </strong>
                        {" "}
                        {this.props.errorMessage}
                    </span>
                </Segment>
            )
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errorMessage) {
            this.state.dispatchedReset = false
        }
    }

    render() {
        const { handleSubmit } = this.props
        console.log(this.props)

        return (
            <div>
            <Form
                onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                inverted={this.props.isInverted}
            >
                {this.renderAlert()}

                <Field
                    name="password"
                    component={FormField}
                    type="password"
                    label="enter new password"
                    placeholder="new password"
                    validate={[required, minLength(2)]}
                    warn={[required, minLength(2)]}
                    required={false}
                />

                <Field
                    name="passwordConfirm"
                    component={FormField}
                    type="password"
                    placeholder="confirm new password"
                    validate={[required]}
                    warn={[required]}
                    required={false}
                />

                <Button type="submit" loading={this.state.dispatchedReset}>
                    reset password
                </Button>

            </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.registerError,
        message: state.auth.message,
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps, { resetPassword })(form(ResetPassword))
