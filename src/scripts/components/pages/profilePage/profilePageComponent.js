import React, { Component } from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { Link } from "react-router-dom"
import { dataIsLoading } from "../../../actions/testActions.js"
import { fetchUser } from "../../../actions/index.js"
import { Button, Grid, Segment, Input, Form, Header, Container } from "semantic-ui-react"
import {
    required,
    maxLength,
    minLength,
    alphaNumeric,
    email
} from "../../helpers/formValidation.js"
import { FormField } from "../../helpers/formFields.js"

class ProfilePage extends Component {
    handleFormSubmit(formProps) {
        //
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
        }
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

        if (user) {
            const userAge = user.age ? user.age : undefined,
                userGender = user.gender ? user.gender : undefined,
                userLocation = user.location ? user.location : undefined,
                userRelationshipStatus = user.relationshipStatus
                    ? user.relationshipStatus
                    : undefined,
                userWebsite = user.website ? user.website : undefined

            return (
                <Grid container columns={1}>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <Segment>
                            <Form
                                onSubmit={handleSubmit(
                                    this.handleFormSubmit.bind(this)
                                )}
                                size="huge"
                                padded
                                inverted={this.props.isInverted}
                            >

                                {this.renderAlert()}

                                <Segment>
                                    <Field
                                        placeholder={user.firstName}
                                        name="firstName"
                                        component={FormField}
                                        type="text"
                                        label="first name"
                                        validate={[alphaNumeric]}
                                    />

                                    <Field
                                        placeholder={user.lastName}
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
                                        name="userAge"
                                        component={FormField}
                                        type="text"
                                        label="age"
                                        validate={[alphaNumeric]}
                                    />

                                    <Field
                                        placeholder={
                                            userGender
                                                ? userGender
                                                : "enter gender"
                                        }
                                        name="userGender"
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
                                        name="userLocation"
                                        component={FormField}
                                        type="text"
                                        label="location"
                                        validate={[alphaNumeric]}
                                    />

                                    <Field
                                        placeholder={
                                            userRelationshipStatus
                                                ? userRelationshipStatus
                                                : "enter relationship status"
                                        }
                                        name="userRelationshipStatus"
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
                                        name="userWebsite"
                                        component={FormField}
                                        type="text"
                                        label="your website"
                                        validate={[alphaNumeric]}
                                    />
                                </Segment>

                                <Button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save Changes
                                </Button>

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
        user: state.auth.user
    }
}
export default connect(mapStateToProps)(
    reduxForm({
        form: "profileForm"
    })(ProfilePage)
)
