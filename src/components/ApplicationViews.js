import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Auth from './Auth/Auth'
import BookMain from './Books/BookMain'
import RandomQuote from './Quotes/RandomQuote'
import PageMain from './Pages/PageMain'
import Search from './Search/Search'


export default class ApplicationViews extends Component {

  state = {
    loggedIn: false,
    currentUser: {},
  }

  isAuthenticated = () => localStorage.getItem("user") !== null;

  handleSuccessfulAuth = (data) => {
    this.handleLogin(data)
    console.log(this.state)
  }

  handleLogin = (data) => {
    this.setState({
      loggedIn: true,
      currentUser: data.user
    })
  }

  render() {
    return (
      <React.Fragment>

          <Route
          exact path="/"
          render={props => {
              return <Auth
                {...props}
                loggedIn={this.state.loggedIn}
                currentUser={this.state.user}
                handleLogin={this.handleLogin}
                handleSuccessfulAuth={this.handleSuccessfulAuth}
                onLogin={(user) => this.setState({ user })}
              />;
          }}
          />

          <Route
            exact path="/books" render={props => {
                // if (this.isAuthenticated()) {
                return <BookMain
                    {...this.props}
                    {...props}
                    onLogin={(user) => this.setState({ user })}
                />
                // }
                // return <Redirect to="/" />
            }
          }
          />

            <Route
            //NOT EXACT PATH  so that only pages include the month select top nav bar
                path="/books/:book_id(\d+)" render={props => {
                    // if (this.isAuthenticated()) {
                    return <PageMain
                        book_id={parseInt(props.match.params.book_id)}
                        {...this.props}
                        {...props}/>
                    // }
                    // return <Redirect to="/" />
                }}
            />

          <Route
          exact path="/quote" render={props => {
              return <RandomQuote {...props} />
          }}
          />

          <Route
          exact path="/search" render={props => {
              // if (this.isAuthenticated()) {
              return <Search
                {...props}
                />
              // }
              // return <Redirect to="/" />
          }}
          />

      </React.Fragment>
    );
  }
}
