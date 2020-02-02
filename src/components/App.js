import React, { Component } from 'react';
import { Redirect, Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'semantic-ui-react'
import { getUser, removeUser } from '../API/userManager';
import './App.css';
import ApplicationViews from "./ApplicationViews"


class App extends Component {
  state = {
    user: getUser(),
    editMode: false
  }

  toggleEditMode = () => {
    this.setState(state => ({ editMode: !state.editMode }))
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
                        onClick={this.logout}
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
