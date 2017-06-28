import React, { Component } from "react"
import { Menu, Segment, Grid, Sidebar, Header, Button } from "semantic-ui-react"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import {
    setActiveNavLink,
    hideSidebar,
    activateSidebar
} from "../../actions/navActions.js"
import { logoutUser } from "../../actions/authActions.js"

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logoutPath: this.props.routes.logout,
            loginPath: this.props.routes.login,
            homePath: this.props.routes.home,
            profilePath: this.props.routes.profile
        }
    }

    handleItemClick(e) {
        e.preventDefault()
        var selectedItem = e.target.id.toLowerCase()
        this.props.setActiveNavLink(selectedItem)

        if (selectedItem === this.state.logoutPath) {
            this.props.logoutUser()
            selectedItem = this.state.loginPath
        }

        this.props.hideSidebar()

        this.props.history.replace(`/${selectedItem}`)
    }

    showHideSideBar(e) {
        e.preventDefault()
        if (this.props.sidebarVisible) {
            this.props.hideSidebar()
        } else {
            this.props.activateSidebar()
        }
    }

    render() {
        var activeItem = window.location.pathname

        return (
            <Grid columns={1} container centered divided>

                <Grid.Row centered only="computer" padded>

                    <Grid.Column>

                        <Menu size={"big"} pointing secondary>

                            <Menu.Menu>
                                <Menu.Item
                                    header
                                    id={this.state.homePath} //the url
                                    name="home"
                                    active={activeItem.includes(
                                        this.state.homePath
                                    )}
                                    onClick={this.handleItemClick.bind(this)}
                                />
                            </Menu.Menu>

                            {this.props.authenticated
                                ? <Menu.Menu>
                                      <Menu.Item
                                          header
                                          id={
                                              this.props.authenticated
                                                  ? this.state.profilePath
                                                  : ""
                                          } //the url
                                          name={
                                              this.props.authenticated
                                                  ? this.state.profilePath
                                                  : ""
                                          }
                                          active={activeItem.includes(
                                              this.state.profilePath
                                          )}
                                          onClick={this.handleItemClick.bind(
                                              this
                                          )}
                                      />
                                  </Menu.Menu>
                                : null}

                            <Menu.Menu position="right">
                                <Menu.Item
                                    header
                                    id={
                                        this.props.authenticated
                                            ? this.state.logoutPath
                                            : this.state.loginPath
                                    } //the url
                                    name={
                                        this.props.authenticated
                                            ? this.state.logoutPath
                                            : this.state.loginPath
                                    }
                                    active={activeItem.includes(
                                        this.props.authenticated
                                            ? this.state.logoutPath
                                            : this.state.loginPath
                                    )}
                                    onClick={this.handleItemClick.bind(this)}
                                />
                            </Menu.Menu>

                        </Menu>

                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>

                    <Grid.Column only="tablet mobile">

                        <Button onClick={this.showHideSideBar.bind(this)}>
                            Menu
                        </Button>

                        <Sidebar
                            as={Menu}
                            size='massive'
                            animation="push"
                            width="wide"
                            visible={this.props.sidebarVisible}
                            icon="labeled"
                            vertical
                            inverted={false}
                        >
                            <Menu.Menu>
                                <Menu.Item
                                    header
                                    id={this.state.homePath} //the url
                                    name="home"
                                    active={activeItem.includes(
                                        this.state.homePath
                                    )}
                                    onClick={this.handleItemClick.bind(this)}
                                />
                            </Menu.Menu>

                            {this.props.authenticated
                                ? <Menu.Menu>
                                      <Menu.Item
                                          header
                                          id={
                                              this.props.authenticated
                                                  ? this.state.profilePath
                                                  : ""
                                          } //the url
                                          name={
                                              this.props.authenticated
                                                  ? this.state.profilePath
                                                  : ""
                                          }
                                          active={activeItem.includes(
                                              this.state.profilePath
                                          )}
                                          onClick={this.handleItemClick.bind(
                                              this
                                          )}
                                      />
                                  </Menu.Menu>
                                : null}

                            <Menu.Menu position="right">
                                <Menu.Item
                                    header
                                    id={
                                        this.props.authenticated
                                            ? this.state.logoutPath
                                            : this.state.loginPath
                                    } //the url
                                    name={
                                        this.props.authenticated
                                            ? this.state.logoutPath
                                            : this.state.loginPath
                                    }
                                    active={activeItem.includes(
                                        this.props.authenticated
                                            ? this.state.logoutPath
                                            : this.state.loginPath
                                    )}
                                    onClick={this.handleItemClick.bind(this)}
                                />
                            </Menu.Menu>
                        </Sidebar>

                    </Grid.Column>

                </Grid.Row>

            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        routes: state.nav.routes,
        authenticated: state.auth.authenticated,
        activeItem: state.nav.activeItem,
        sidebarVisible: state.nav.sidebarVisible,
        currentLocation: state.nav.currentLocation
    }
}

export default withRouter(
    connect(mapStateToProps, {
        setActiveNavLink,
        activateSidebar,
        hideSidebar,
        logoutUser
    })(Navbar)
)
