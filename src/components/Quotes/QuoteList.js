import React, { Component } from 'react'
import QuoteCard from './QuoteCard'
import AddQuoteModal from './AddQuoteModal'
import AddRandomQuoteModal from './AddRandomQuoteModal'
import { Icon } from 'semantic-ui-react'
import '../Styles/Pages.css'


class QuoteList extends Component {
  state = {
    day: "",
    month: "",
    daysOfMonth: [],
    months: ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
  }

  setMonthAndDays = () => {
    const month = this.props.month
    const daysOfMonth = []
    for (let i = 1; i <= 31; i++) {
      daysOfMonth.push(i)
    }
    if (month === "february") {
      daysOfMonth.pop()
      daysOfMonth.pop()
    } else if (month === "september" || month === "april" || month === "june" || month === "november") {
      daysOfMonth.pop()
    }
    this.setState({
      month: month,
      days: daysOfMonth
    })
  }

  changeDay = (dir) => {
      if (dir === "next") {
        if (parseInt(this.state.day) < this.state.daysOfMonth.length) {
          const nextDay = parseInt(this.props.day) + 1
          this.setState({
            day: nextDay.toString()
          })
        } else {
          const currentMonthIndex = this.state.months.indexOf(this.props.month)
          const nextMonth = this.state.months[currentMonthIndex + 1]
          this.setState({
            month: nextMonth,
            day: "1"
          })
        }
      } else {
        const prevDay = parseInt(this.props.day) - 1
        this.setState({
          day: prevDay.toString()
        })
      }

  }

//when component mounts, update state of pageQuotes in PageMain
    componentDidMount() {
      this.props.renderPageQuotes(this.props.page_id)
      this.setMonthAndDays()
    }

//When component receives new page_id in props (i.e., page is changed) from PageMain, update state in PageMain to cause a rerender of QuoteList
    componentDidUpdate(prevProps) {
      if (this.props.page_id !== prevProps.page_id) {
        this.props.renderPageQuotes(this.props.page_id)
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
              <div className="quoteList__page">
                <Icon
                  onClick={() => {
                    this.changeDay("prev")
                    this.props.setDay(this.state.day)
                    this.props.setMonth(this.state.month)
                    this.props.handlePageSelect()
                  }}
                  name="angle left">
                </Icon>
                <h1>{this.props.month} {this.props.day}</h1>
                <Icon
                  onClick={() => {
                    this.changeDay("next")
                    this.props.setDay(this.state.day)
                    this.props.setMonth(this.state.month)
                    this.props.handlePageSelect()
                  }}
                  name="angle right">
                </Icon>
              </div>
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
                  page_id={this.props.page_id}
                  {...this.props}/>
              ))}
            </div>
          </div>
        </React.Fragment>
      )
    }
}


export default QuoteList