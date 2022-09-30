import React, { Component } from 'react'
import QuoteCard from './QuoteCard'
import AddQuoteModal from './AddQuoteModal'
import AddRandomQuoteModal from './AddRandomQuoteModal'
import { Icon } from 'semantic-ui-react'
import { Fade } from 'reactstrap'
import '../Styles/Pages.css'

class QuoteList extends Component {
  state = {
    daysOfMonth: [],
    months: ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
    visible: false,
    fadeIn: true
  }

  toggleVisibility = () => {
    this.setState(prevState => ({
        visible: !prevState.visible
    }));
  }

  daysOfMonth = (month) => {
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
    return daysOfMonth
  }

  changeDay = (dir) => {
      if (dir === "next") {
        if (parseInt(this.props.day) < this.state.daysOfMonth.length) {
          const nextDayInt = parseInt(this.props.day) + 1
          this.props.changeMonthAndDay(this.props.month, nextDayInt.toString())
        } else {
          const currentMonthIndex = this.state.months.indexOf(this.props.month)
          let nextMonth = ""
          if (currentMonthIndex !== 11) {
            nextMonth = this.state.months[currentMonthIndex + 1]
          } else {
            nextMonth = this.state.months[0]
          }
          this.props.changeMonthAndDay(nextMonth, "1")
        }
      } else {
        if (this.props.day !== "1") {
          const prevDayInt = parseInt(this.props.day) - 1
          this.props.changeMonthAndDay(this.props.month, prevDayInt.toString())
        } else {
          const currentMonthIndex = this.state.months.indexOf(this.props.month)
          let prevMonth = ""
          if (currentMonthIndex !== 0) {
            prevMonth = this.state.months[currentMonthIndex - 1]
          } else {
            prevMonth = this.state.months[11]
          }
          this.setState({
            daysOfMonth:  this.daysOfMonth(prevMonth)
          }, () => {
            const lastDay = this.state.daysOfMonth.length
            this.props.changeMonthAndDay(prevMonth, lastDay.toString())
          })
        }
      }
  }

//when component mounts, update state of pageQuotes in PageMain
    componentDidMount() {
      this.props.renderPageQuotes(this.props.page_id)
      this.setState({
        daysOfMonth: this.daysOfMonth(this.props.month)
      })
      if (this.props.editMode === true) {
        this.toggleVisibility()
      }
    }

//When component receives new page_id in props (i.e., page is changed) from PageMain, update state in PageMain to cause a rerender of QuoteList
    componentDidUpdate(prevProps) {
      if (this.props.page_id !== prevProps.page_id) {
        this.setState({
          daysOfMonth: this.daysOfMonth(this.props.month)
        })
        this.props.renderPageQuotes(this.props.page_id)
      }
      if (this.props.editMode !== prevProps.editMode) {
        this.toggleVisibility();
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
                <Fade in={this.state.visible}>
                  <Icon
                    onClick={() => {
                      this.changeDay("prev")
                    }}
                    name="angle left">
                  </Icon>
                </Fade>
                <h1>{this.props.month} {this.props.day}</h1>
                <Fade in={this.state.visible}>
                  <Icon
                    onClick={() => {
                      this.changeDay("next")
                    }}
                    name="angle right">
                  </Icon>
                </Fade>
              </div>
              <div className="addQuoteModal">

                <AddQuoteModal
                  {...this.props}/>
              </div>
            </div>
            <div className="quoteCards">
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