import React, { Component } from 'react';
import { Redirect, Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'semantic-ui-react'
import { getUser, removeUser } from '../API/userManager';
import './App.css';
import ApplicationViews from "./ApplicationViews"
import axios from 'axios'


class App extends Component {
  state = {
    isAuthenticated: false,
    currentUser: {},
    editMode: false
  }

  toggleEditMode = () => {
    this.setState(state => ({ editMode: !state.editMode }))
  }

  handleLogin = (data) => {
    this.setState({
      isAuthenticated: true,
      currentUser: data.user
    })
  }

  handleLogout = () => {
    axios.delete("https://winnow-rails-api.herokuapp.com/api/v1/logout", {withCredentials: true})
      .then(
        this.setState({
          isAuthenticated: false,
          currentUser: {}
        })
      ).catch(error => console.log("logout error: ", error))
  }

  checkLoginStatus = () => {
    axios.get("https://winnow-rails-api.herokuapp.com/api/v1/logged_in", {withCredentials: true})
      .then(response => {
        console.log("logged in? ", response)
        if (response.data.logged_in && this.state.isAuthenticated === false) {
          this.setState({
            isAuthenticated: true,
            currentUser: response.data.user
          })
        } else if (!response.data.logged_in && this.state.isAuthenticated === true) {
          this.setState({
            isAuthenticated: false,
            currentUser: {}
          })
        }
        console.log("isAuthenticated status in react state: ", this.state.isAuthenticated)
      })
      .catch(error => {
        console.log("check login error: ", error)
      })
  }

  componentDidMount() {
    this.checkLoginStatus()
  }

  logout = () => {
    this.setState({ user: null });
    removeUser();
  }

  render() {
    return (
      <div className="App">
        <div className="appViews">
              <ApplicationViews
               editMode={this.state.editMode}
               isAuthenticated={this.state.isAuthenticated}
               handleLogin={this.handleLogin}
              />
        </div>
        <div className="nav__container">
            <Menu
                className="nav__menu"
                size="large"
                icon='labeled'
                borderless
                inverted
                fixed="bottom"
                fluid widths={4}
            >

                <Menu.Item
                  as={Link}
                  to='/quote'
                  className="sidebarButton"
                  icon="quote left"
                >
                </Menu.Item>

                <Menu.Item
                  as={Link}
                  to='/books'
                  className="sidebarButton"
                  icon="book"
                >
                </Menu.Item>

                <Menu.Item
                  as={Link}
                  to='/search'
                  className="sidebarButton"
                  icon="search"
                >
                </Menu.Item>


                <Dropdown item
                  className="sidebarButton"
                  icon="setting"
                >
                  <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={this.toggleEditMode}
                        >edit mode
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="logout red"
                        as={Link}
                        to='/'
                        onClick={this.handleLogout}
                        >logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
            </Menu>
        </div>
      </div>
    );
  }
}

export default App;
