import React, { Component } from 'react'
import QuoteCard from './QuoteCard'
import AddQuoteModal from './AddQuoteModal'
import AddRandomQuoteModal from './AddRandomQuoteModal'
import { Icon } from 'semantic-ui-react'
import '../Styles/Pages.css'


class QuoteList extends Component {
  state = {
    daysOfMonth: [],
    months: ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
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
        console.log("day in props: ", parseInt(this.props.day))
        console.log(`days in this month of ${this.props.month}: ${this.state.daysOfMonth.length}`)
        console.log("dayInt: ", parseInt(this.props.day))
        console.log("days in this month: ", this.state.daysOfMonth.length)
        if (parseInt(this.props.day) < this.state.daysOfMonth.length) {
          console.log("Not the end of the month")
          const nextDayInt = parseInt(this.props.day) + 1
          this.props.setDay(nextDayInt.toString())
          console.log(`the next day is ${nextDayInt}`)
          console.log(`day in props: ${this.props.day}`)
        } else {
          console.log("It's the end of the month!")
          const currentMonthIndex = this.state.months.indexOf(this.props.month)
          let nextMonth = ""
          if (currentMonthIndex !== 11) {
            nextMonth = this.state.months[currentMonthIndex + 1]
          } else {
            nextMonth = this.state.months[0]
          }
          console.log(`the next month is ${nextMonth}`)
          this.props.setMonth(nextMonth)
          this.props.setDay("1")
        }
      } else {
        if (this.props.day !== "1") {
          console.log("Not the beginning of the month")
          const prevDayInt = parseInt(this.props.day) - 1
          this.props.setDay(prevDayInt.toString())
          console.log(`the prev day is ${prevDayInt}`)
          console.log(`day in props: ${this.props.day}`)
          this.props.handlePageChange()
        } else {
          console.log("It's the beginning of the month!")
          const currentMonthIndex = this.state.months.indexOf(this.props.month)
          let prevMonth = ""
          if (currentMonthIndex !== 0) {
            prevMonth = this.state.months[currentMonthIndex - 1]
          } else {
            prevMonth = this.state.months[11]
          }
          console.log(`the prev month is ${prevMonth}`)
          this.props.setMonth(prevMonth)
          this.setState({
            daysOfMonth: this.daysOfMonth(prevMonth)
          }, function () {
            console.log("days in ", prevMonth, ":", this.state.daysOfMonth)
            const lastDay = this.state.daysOfMonth.length
            console.log("last day: ", lastDay)
            this.props.setDay(lastDay.toString())
            this.props.handlePageChange()
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
    }


//When component receives new page_id in props (i.e., page is changed) from PageMain, update state in PageMain to cause a rerender of QuoteList
    componentDidUpdate(prevProps) {
      if (this.props.page_id !== prevProps.page_id) {
        this.setState({
          daysOfMonth: this.daysOfMonth(this.props.month)
        })
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
                  }}
                  name="angle left">
                </Icon>
                <h1>{this.props.month} {this.props.day}</h1>
                <Icon
                  onClick={() => {
                    this.changeDay("next")
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