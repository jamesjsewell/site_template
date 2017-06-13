import React, { Component } from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { Link } from "react-router-dom"
import { loginUser } from "../../actions/authActions"
import { Button, Grid, Segment, Input, Form, Header } from "semantic-ui-react"
import {
    required,
    maxLength,
    minLength,
    alphaNumeric,
    email
} from "../helpers/formValidation.js"
import { FormField } from '../helpers/formFields.js'

const form = reduxForm({
    form: "loginForm"
})

class Login extends Component {
    handleFormSubmit(formProps) {
        var login = this.props.loginUser(formProps)
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

    componentWillUnMount() {}

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props

        return (
            <div>
                <Form
                    onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                    size="huge"
                    padded
                    inverted={this.props.isInverted}
                >

                    {this.renderAlert()}

                    <Field
                        name="email"
                        component={FormField}
                        type="text"
                        label="Email"
                        validate={[required, email, minLength(2)]}
                        warn={[required, minLength(2)]}
                    />

                    <Field
                        name="password"
                        component={FormField}
                        type="password"
                        label="Password"
                        validate={[required, minLength(6)]}
                        warn={[required, minLength(2)]}
                    />

                    <Button type="submit" className="btn btn-primary">
                        Login
                    </Button>

                </Form>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        redux: state,
        errorMessage: state.auth.error,
        message: state.auth.message,
        authenticated: state.auth.authenticated
    }
}
export default connect(mapStateToProps, { loginUser })(
    reduxForm({
        form: "loginForm",
        fields: ["email", "password"]
    })(Login)
)
