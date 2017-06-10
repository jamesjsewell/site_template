import React, { Component } from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { registerUser } from "../../actions/authActions.js"
import { Button, Grid, Segment, Input, Form } from "semantic-ui-react"

const form = reduxForm({
    form: "register",
    validate
})

const FormField = props => (
    <Form.Field required>
        <label>{props.label}</label>
        <Input
            type={props.type}
            value={props.input.value}
            onChange={(param, data) => props.input.onChange(data.value)}
            placeholder={props.label}
        />
    </Form.Field>
)

function validate(formProps) {
    const errors = {}

    if (!formProps.firstName) {
        errors.firstName = "Please enter a first name"
    }

    if (!formProps.lastName) {
        errors.lastName = "Please enter a last name"
    }

    if (!formProps.email) {
        errors.email = "Please enter an email"
    }

    if (!formProps.password) {
        errors.password = "Please enter a password"
    }

    return errors
}

class Register extends Component {
    handleFormSubmit(formProps) {
        this.props.registerUser(formProps)
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

        return (
            <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} inverted={this.props.isInverted}>
                {this.renderAlert()}

                <Field
                    name="firstName"
                    component={FormField}
                    type="text"
                    label="First Name"
                />

                <Field
                    name="lastName"
                    component={FormField}
                    type="text"
                    label="Last Name"
                />

                <Field
                    name="email"
                    component={FormField}
                    type="text"
                    label="Email"
                />

                <Field
                    name="password"
                    component={FormField}
                    type="password"
                    label="Password"
                />

                <Button type="submit">
                    Register
                </Button>

            </Form>
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

export default connect(mapStateToProps, { registerUser })(form(Register))
