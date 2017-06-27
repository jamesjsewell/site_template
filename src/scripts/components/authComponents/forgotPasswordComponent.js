import React, { Component } from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { getForgotPasswordToken } from "../../actions/authActions.js"
import { Button, Grid, Segment, Input, Form, Message } from "semantic-ui-react"
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
        this.state = { messageShowing: false }
    }

    handleFormSubmit(formProps) {
        this.props.getForgotPasswordToken(formProps)
    }

    handleShowMessage() {
        this.state.messageShowing = true

        this.state.messageShowing = setTimeout(() => {
            this.setState({ messageShowing: false })
        }, 2500)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.didSend) {
            this.handleShowMessage()
        }
    }

    render() {

        const { handleSubmit } = this.props
     
        return (
            <Form
                onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                inverted={this.props.isInverted}
            >

                {this.props.didSend ? <Segment>check your email and follow the link</Segment> : 

                <Field
                    name="email"
                    component={FormField}
                    type="text"
                    label="enter your email"
                    placeholder="enter email"
                    validate={[required, email, minLength(2)]}
                    warn={[required, minLength(2)]}
                    required={false}
                /> }

                {this.props.didSend ? <div></div> : <Field
                    name="emailConfirm"
                    component={FormField}
                    type="text"
                    placeholder="confirm email"
                    validate={[required, email, minLength(2)]}
                    warn={[required, minLength(2)]}
                    required={false}
                /> }

                <Message
                    visible={this.state.messageShowing ? true : false}
                    hidden={this.state.messageShowing ? false : true}
                    floating
                    content={this.props.stateOfSend}
                />

                <Button type="submit" loading={this.state.dispatchedSend}>
                    {this.props.didSend ? "resend email" : "send email"}
                </Button>


            </Form>
        )
    }
}

function mapStateToProps(state) {
    return {
        didSend: state.auth.didEmailSend,
        stateOfSend: state.auth.stateOfEmailSend
    }
}

export default connect(mapStateToProps, { getForgotPasswordToken })(
    form(ForgotPassword)
)
