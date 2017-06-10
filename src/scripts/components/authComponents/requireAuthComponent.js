import React, { Component } from "react"
import { connect } from "react-redux"
import bindActionCreators from "redux"
import PropTypes from "prop-types"
import Cookies from "universal-cookie"
import { protectedTest } from "../../actions/authActions"

const cookies = new Cookies()
var token = cookies.get("token")
var user = cookies.get("user")

class Authentication extends Component {
    componentWillMount() {
        if (token) {
            // Update application state. User has token and is probably authenticated
            //store.dispatch({ type: AUTH_USER });
            if (!this.props.authenticated) {
                this.props.protectedTest()
            }
        }
    }

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {
        if (token) {
            // Update application state. User has token and is probably authenticated
            //store.dispatch({ type: AUTH_USER });
            //nextProps.protectedTest()
        }

        if (nextProps.authenticated) {
            //this.context.router.push('/login');
        }
    }

    render() {
        //<h3>{this.props.authenticated ? "user is authenticated" : "not authenticated"}</h3>
        return (
            <div>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps, { protectedTest })(Authentication)
