import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import createHistory from "history/createBrowserHistory"
import Navbar from "./components/pages/navBarComponent.js"
import Register from "./components/authComponents/registerComponent.js"
import Login from "./components/authComponents/loginComponent.js"
import Authentication from "./components/authComponents/requireAuthComponent.js"
import ResetPasswordPage
    from "./components/pages/resetPasswordPage/resetPasswordPageComponent.js"
import HomePage from "./components/pages/homePage/homePageComponent.js"
import AuthPage from "./components/pages/authPage/authPageComponent.js"
import ProfilePage from "./components/pages/profilePage/profilePageComponent.js"
import NotAuthenticatedPage
    from "./components/pages/notAuthenticatedPage/notAuthenticatedPageComponent.js"
import {
    setActiveNavLink,
    hideSidebar,
    activateSidebar
} from "./actions/navActions.js"
import { dataIsLoading } from "./actions/testActions.js"
import {
    Menu,
    Segment,
    Grid,
    Sidebar,
    Header,
    Button,
    Dimmer,
    Loader,
    Container,
    Icon,
    Divider
} from "semantic-ui-react"

class Blank extends Component {
    render() {
        return <div />
    }
}

class RouteConfig extends Component {
    handleHideSidebar() {
        this.props.hideSidebar()
    }

    render() {
        return (
            <Router>

                <Container as={Segment} secondary stretched>

                    <Dimmer active={this.props.loadingData} page>

                        <Grid columns="equal" padded>

                            <Grid.Row>

                                <Grid.Column>
                                    <Loader size="big">Loading</Loader>
                                </Grid.Column>

                            </Grid.Row>

                            <Divider hidden />

                            <Grid.Row>

                                <Grid.Column>
                                    <Button
                                        onClick={() => {
                                            this.props.dataIsLoading(false)
                                        }}
                                    >
                                        finish testing
                                    </Button>
                                </Grid.Column>

                            </Grid.Row>

                        </Grid>

                    </Dimmer>

                    <Authentication />

                    <Navbar />

                    <Switch>
                        <Route
                            location={location}
                            key={location.key}
                            path="/reset-password/:resetToken"
                            component={ResetPasswordPage}
                        />
                        <Route
                            path="/profile"
                            component={this.props.user ? ProfilePage : Blank}
                        />
                        <Route path="/login" component={AuthPage} />
                        <Route path="/register" component={AuthPage} />
                        <Route exact path="/" component={HomePage} />
                        <Route path="*" component={HomePage} />

                    </Switch>

                </Container>

            </Router>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        sidebarVisible: state.nav.sidebarVisible,
        loadingData: state.data.loadingData
    }
}

export default withRouter(
    connect(mapStateToProps, {
        setActiveNavLink,
        hideSidebar,
        dataIsLoading
    })(RouteConfig)
)

