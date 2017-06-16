import React, { Component } from "react"
import { connect } from "react-redux"
import bindActionCreators from "redux"
import PropTypes from "prop-types"
import Cookies from "universal-cookie"
import { protectedTest } from "../../actions/authActions"
import { withRouter } from "react-router"

const cookies = new Cookies()
var token = cookies.get("token")
var user = cookies.get("user")

class Authentication extends Component {
    componentWillMount() {
        if (token) {
            // Update application state. User has token and is probably authenticated
            //store.dispatch({ type: AUTH_USER });
            if (!this.props.authenticated) {
                this.props.protectedTest(user)
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
            if(this.props.location.pathname.includes(this.props.routes.login)){
                this.props.history.push('/'+this.props.routes.home)
            }
            // if(window.location.includes('login')){
            //     this.context.router.push('/home');
            // }
            
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
    return { authenticated: state.auth.authenticated,
    routes: state.nav.routes }
}

export default withRouter(connect(mapStateToProps, { protectedTest })(Authentication))
