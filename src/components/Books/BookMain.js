import React, { Component } from 'react';
import BookList from "./BookList"


class BookMain extends Component {


    render() {
        return (
            <React.Fragment>
                <BookList {...this.props}/>
            </React.Fragment>
        )
    }
}

export default BookMain