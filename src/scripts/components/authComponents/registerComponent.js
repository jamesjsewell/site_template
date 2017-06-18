import React, { Component } from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { registerUser } from "../../actions/authActions.js"
import { Button, Grid, Segment, Input, Form } from "semantic-ui-react"
import { FormField } from "../helpers/formFields.js"
import {
    required,
    maxLength,
    minLength,
    alphaNumeric,
    email
} from "../helpers/formValidation.js"

const form = reduxForm({
    form: "register"
})

class Register extends Component {

    constructor(props){
        super(props)
        this.state = { dispatchedRegister: false }
    }

    handleFormSubmit(formProps) {
        this.props.registerUser(formProps)
        this.state.dispatchedRegister = true
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <Segment color="red" compact>
                    <span>
                        <strong>Registration Error: </strong> {this.props.errorMessage}
                    </span>
                </Segment>
            )
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errorMessage){
            this.state.dispatchedRegister = false
        }
    }

    render() {
        const { handleSubmit } = this.props

        return (
            <Form
                onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                inverted={this.props.isInverted}
            >
                {this.renderAlert()}

                <Field
                    name="firstName"
                    component={FormField}
                    type="text"
                    label="first name"
                    placeholder="first name"
                    validate={[required, minLength(2), maxLength(14)]}
                    warn={[required, minLength(2)]}
                    required={false}
                />

                <Field
                    name="lastName"
                    component={FormField}
                    type="text"
                    label="last name"
                    placeholder="last name"
                    validate={[required, minLength(2), maxLength(14)]}
                    warn={[required, minLength(2)]}
                    required={false}
                />

                <Field
                    name="email"
                    component={FormField}
                    type="text"
                    label="email"
                    placeholder="email"
                    validate={[required, email, minLength(2)]}
                    warn={[required, minLength(2)]}
                    required={false}
                />

                <Field
                    name="password"
                    component={FormField}
                    type="password"
                    label="Password"
                    placeholder="password"
                    validate={[required, minLength(6), maxLength(14)]}
                    warn={[required, minLength(6)]}
                    required={false}
                />

                <Button type="submit" loading={this.state.dispatchedRegister}>
                    Register
                </Button>

            </Form>
        )
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.register_error,
        message: state.auth.message,
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps, { registerUser })(form(Register))
