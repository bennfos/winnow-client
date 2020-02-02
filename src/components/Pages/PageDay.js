import React, { Component } from 'react'
import QuoteList from '../Quotes/QuoteList'
import ThoughtList from '../Thoughts/ThoughtList'
import { Fade } from 'reactstrap'
import { Image } from 'semantic-ui-react'
import '../Styles/Pages.css'



class PageDay extends Component {
    state = {
        quotes: [],
        pages: [],
        thought: "",
        fadeIn: true
      };


    render() {
        return (
            <React.Fragment>

                <div className="quoteList__container">
                <Fade in={this.state.fadeIn}>
                    <div>
                        <QuoteList
                            {...this.props}
                        />
                    </div>
                </Fade>
                <Fade in={this.state.fadeIn}>
                    <div className="thoughtList">

                        <ThoughtList
                            {...this.props}
                        />
                    </div>
                </Fade>
                </div>
            </React.Fragment>
        )
    }
}

export default PageDay