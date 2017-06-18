import React, { Component } from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { Link } from "react-router-dom"
import { fetchUser } from "../../../actions/index.js"
import { updatePersonalInfo } from "../../../actions/userProfileActions.js"
import { UPDATED_USER, UPDATE_USER_ERROR } from "../../../actions/types.js"
import {
    Button,
    Grid,
    Segment,
    Input,
    Form,
    Header,
    Container
} from "semantic-ui-react"
import {
    required,
    maxLength,
    minLength,
    alphaNumeric,
    email
} from "../../helpers/formValidation.js"
import { FormField } from "../../helpers/formFields.js"
import _ from "underscore"

class ProfilePage extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.props.fetchUser(this.props.user._id)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.profile != this.props.profile) {
            this.props.fetchUser(this.props.user._id)
        }
    }
    handleFormSubmit(formProps) {
        console.log(this.props.profile)
        var userInput = formProps

        var parsedInput = {
            profile: {
                firstName: userInput.firstName? userInput.firstName : this.props.profile.firstName,
                lastName: userInput.lastName? userInput.lastName : this.props.profile.lastName,
                age: userInput.age? userInput.age : this.props.profile.age,
                gender: userInput.gender? userInput.gender : this.props.profile.gender,
                location: userInput.location? userInput.location : this.props.profile.location,
                relationshipStatus: userInput.relationshipStatus? userInput.relationshipStatus : this.props.profile.relationshipStatus,
                website: userInput.website? userInput.website : this.props.profile.website
            }
        }
        var updatedInfo = _.extend({}, this.props.profile, parsedInput)
        this.props.updatePersonalInfo(this.props.user._id, parsedInput)
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
        const profile = this.props.profile

        if (user) {
            const userFistName = profile.firstName ? profile.firstName : undefined,
                userLastName = profile.lastName ? profile.lastName : undefined,
                userAge = profile.age ? profile.age : undefined,
                userGender = profile.gender ? profile.gender : undefined,
                userLocation = profile.location ? profile.location : undefined,
                userRelationshipStatus = profile.relationshipStatus
                    ? profile.relationshipStatus
                    : undefined,
                userWebsite = profile.website ? profile.website : undefined

            return (
                <Grid container columns={1}>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Segment>
                                 <Form
                                          onSubmit={handleSubmit(
                                              this.handleFormSubmit.bind(this)
                                          )}
                                          size="huge"
                                          padded
                                          inverted={this.props.isInverted}
                                          loading={this.props.profile ? false : true}
                                      >

                                          {this.renderAlert()}

                                          <Segment>
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
                                          </Segment>

                                          <Segment>
                                              <Field
                                                  placeholder={
                                                      userAge
                                                          ? userAge
                                                          : "enter age"
                                                  }
                                                  name="age"
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
                                                  name="gender"
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
                                                      userWebsite
                                                          ? userWebsite
                                                          : "enter your website"
                                                  }
                                                  name="website"
                                                  component={FormField}
                                                  type="text"
                                                  label="your website"
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
        user: state.auth.user,
        profile: state.user.profile
    }
}
export default connect(mapStateToProps, { fetchUser, updatePersonalInfo })(
    reduxForm({
        form: "profileForm"
    })(ProfilePage)
)
