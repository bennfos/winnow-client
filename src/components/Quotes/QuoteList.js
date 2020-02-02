import React, { Component } from 'react'
import QuoteCard from './QuoteCard'
import AddQuoteModal from './AddQuoteModal'
import AddRandomQuoteModal from './AddRandomQuoteModal'
//import './Quotes.css'
import '../Styles/Pages.css'


class QuoteList extends Component {
    state = {
        month: "",
        day: "",

    }


//when component mounts, update state of pageQuotes in PageMain
    componentDidMount() {
      this.props.renderPageQuotes(this.props.pageId)
      }

//When component receives new pageId in props (i.e., page is changed) from PageMain, update state in PageMain to cause a rerender of QuoteList
    componentDidUpdate(prevProps) {
      if (this.props.pageId !== prevProps.pageId) {
        this.props.renderPageQuotes(this.props.pageId)
        this.setState({
          quotes: this.props.quotes
        })
      }
    }


    render() {
        return (
          <React.Fragment>

          <div className="quoteList__contents">


                <div className="addRandomQuoteModal__container">
                  <AddRandomQuoteModal
                        {...this.props}
                  />
                </div>
                <div className="quoteList__header">
                    <h1>{this.props.month} {this.props.day}</h1>
                    <div className="addQuoteModal">
                      <AddQuoteModal
                          {...this.props}/>
                    </div>
                </div>



            <div className="quoteCard">
              {this.props.quotes.map(quote => (

                <QuoteCard
                    key={quote.id}
                    quote={quote}
                    pageId={this.props.pageId}
                    {...this.props}/>

              ))}
            </div>

          </div>

        </React.Fragment>
        )
    }
}


export default QuoteList