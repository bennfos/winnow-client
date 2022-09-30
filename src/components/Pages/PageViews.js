import { Route } from "react-router-dom";
import React, { Component } from "react";
import PageDay from './PageDay'


export default class PageViews extends Component {
    isAuthenticated = () => localStorage.getItem("user") !== null;

  render() {
    return (
      <React.Fragment>
        <Route
          exact path="/books/:book_id(\d+)/:page_id(\d+)/:month/:day" render={props => {
            // if (this.isAuthenticated()) {
              return <PageDay
                        className="pusher"
                        page_id={parseInt(props.match.params.page_id)}
                        book_id={parseInt(props.match.params.book_id)}
                        month={props.match.params.month}
                        day={props.match.params.day}
                        {...this.props}
                      />
            }
              // return <Auth {...props} />
          }
        // }
        />


      </React.Fragment>
    );
  }
}
