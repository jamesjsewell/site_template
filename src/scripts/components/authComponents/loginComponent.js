import React, { Component } from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { Link } from "react-router-dom"
import { loginUser } from "../../actions/authActions"
import { Button, Grid, Segment, Input, Form, Header } from "semantic-ui-react"

const form = reduxForm({
    form: "loginForm"
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
        var { handleSubmit } = this.props

        return (
            <div>
                <Form
                    onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                    container
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
                    />

                    <Field
                        name="password"
                        component={FormField}
                        type="password"
                        label="Password"
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
        form: "loginForm" // a unique identifier for this form
    })(Login)
)
