import { Route } from "react-router-dom";
import React, { Component } from "react";
import PageDay from './PageDay'
import Auth from '../Auth/Auth'
//import './PageMain.css'


export default class PageViews extends Component {
    isAuthenticated = () => localStorage.getItem("user") !== null;

  render() {
    return (
      <React.Fragment>
        <Route
          exact path="/books/:bookId(\d+)/:pageId(\d+)/:month/:day" render={props => {
            if (this.isAuthenticated()) {
              return <PageDay
                        className="pusher"
                        pageId={parseInt(props.match.params.pageId)}
                        bookId={parseInt(props.match.params.bookId)}
                        month={props.match.params.month}
                        day={props.match.params.day}
                        {...this.props}
                      />
            }
              return <Auth {...props} />
          }}
        />


      </React.Fragment>
    );
  }
}
