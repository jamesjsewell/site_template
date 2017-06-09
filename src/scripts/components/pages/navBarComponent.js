import React, { Component } from "react"
import { Menu, Segment } from "semantic-ui-react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { setActiveNavLink } from "../../actions/navActions.js"

class Navbar extends Component {
  handleItemClick(e) {
    var selectedItem = e.target.text.toLowerCase()
    console.log(selectedItem)
    this.props.setActiveNavLink(selectedItem)

  }

  render() {
    const { activeItem } = this.props

    return (
      <Menu size={'massive'} pointing secondary padded container>

        <Link to="/register">
        <Menu.Item
          header
          name="register"
          active={activeItem === "register"}
          onClick={this.handleItemClick.bind(this)}

        />
        </Link>
       

        <Link to="/login">
        <Menu.Item
          header
          name="login"
          href="login"
          active={activeItem === "login"}
          onClick={this.handleItemClick.bind(this)}
        />
        </Link>

        <Link to="/home">
        <Menu.Item
          header
          name="home"
          href="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick.bind(this)}
        />
        </Link>

        <Link to="/logout">
        <Menu.Menu position="right">
          <Menu.Item
            header
            name="logout"
            href="logout"
            active={activeItem === "logout"}
            onClick={this.handleItemClick.bind(this)} 
        />
        </Menu.Menu>
        </Link>


      </Menu>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeItem: state.nav.activeItem
  }
}

export default connect(mapStateToProps, { setActiveNavLink })(Navbar)
