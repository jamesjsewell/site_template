import React, { Component } from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { getForgotPasswordToken } from "../../actions/authActions.js"
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
    form: "forgotPassword",
    validate,
    blurFields: ["emailConfirm"]
})

function validate(formProps) {
        const errors = {}

        if (!formProps.email) {
            errors.email = "enter your email"
        }

        if (!formProps.emailConfirm) {
            errors.emailConfirm = "confirm your email"
        }

        if (formProps.email !== formProps.emailConfirm) {
            errors.emailConfirm = "emails must match"
        }

        return errors
    }

class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = { dispatchedSend: false }
    }

    handleFormSubmit(formProps) {
        this.props.getForgotPasswordToken(formProps)
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
            this.state.dispatchedSend = false
        }
    }

    render() {
        const { handleSubmit } = this.props
        console.log(this.props)

        return (
            <Form
                onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                inverted={this.props.isInverted}
            >
                {this.renderAlert()}

                <Field
                    name="email"
                    component={FormField}
                    type="text"
                    label="enter your email"
                    placeholder="enter email"
                    validate={[required, email, minLength(2)]}
                    warn={[required, minLength(2)]}
                    required={false}
                />

                <Field
                    name="emailConfirm"
                    component={FormField}
                    type="text"
                    placeholder="confirm email"
                    validate={[required, email, minLength(2)]}
                    warn={[required, minLength(2)]}
                    required={false}
                />

                <Button type="submit" loading={this.state.dispatchedSend}>
                    send email
                </Button>

            </Form>
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

export default connect(mapStateToProps, { getForgotPasswordToken })(
    form(ForgotPassword)
)
