import React, { Component } from 'react'
import { Sidebar, Menu } from 'semantic-ui-react'
import '../Styles/Pages.css'
import PageManager from '../../API/PageManager'
import PageViews from './PageViews'
import QuoteManager from '../../API/QuoteManager'
import PageSelect from './PageSelect'
import BookDataManager from '../../API/BookManager'


const d = new Date();
class PageMain extends Component {

    state = {
      visible: false,
      modal: false,
      currentMonth: d.getMonth(),
      currentDate: d.getDate().toString(),
      month: d.getMonth(),
      day: d.getDate().toString(),
      page_id: 0,
      page: {},
      quotes: [],
      quoteIdToMove: 0,
      thought: "",
      starts_blank: false,
      monthOptions: ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
      loadingStatus: false
    }

    toggleSidebar = () => {
      if (this.state.visible === false) {
        this.setState({ visible: true })
      } else {
        this.setState({ visible: false })
      }
    }

    toggleSidebarToMoveQuote = (quoteId) => {
      if (this.state.visible === false) {
        this.setState({ visible: true, quoteIdToMove: quoteId })
      } else {
        this.setState({ visible: false })
      }
    }

    toggle = () => {
      if (this.state.modal === false) {
        this.setState({ modal: true })
      } else {
        this.setState({ modal: false })
      }
    }

      //set month in state when selected in month menu
    setMonth = (month) => {
      this.setState({
          month: month
      })
    }

    setDay = (day) => {
      this.setState({
        day: day
      })
    }

    changeMonthAndDay = (month, day) => {
      this.setState({
        month: month,
        day: day
      }, this.handlePageChange)
    }

    //set day in state when day input button is selected in the month menu
    handleFieldChange = evt => {
      const stateToChange = {};
      stateToChange[evt.target.id] = evt.target.value;
      this.setState(stateToChange);
    }

    navigateToPage = (page) => {
      this.setState({
        page: page,
        month: page.month,
        day: page.day,
        page_id: page.id,
        thought: page.thought
      })
      this.props.history.push(`/books/${this.props.book_id}/${this.state.page_id}/${this.state.month}/${this.state.day}`)
      this.toggle()
      if (this.state.visible === true) {
        this.toggleSidebar()
      }
    }

    constructNewPage = () => {
      if (this.state.month === "" && this.state.day === "") {
        this.setState({
          month: this.state.currentMonth,
          day: this.state.currentDate
        })
      }
      const newPage = {
        book_id: this.props.book_id,
        month: this.state.month,
        day: this.state.day,
        thought: ""
      };
      //post the page object to the database, THEN set state with that page's id, and push user to that page's view
      PageManager.postPage(newPage)
      .then(page => {
        this.setState({
            page_id: page.id
        })
      })
      .then(() => {
        //then get a random quote
        if (this.state.starts_blank === false) {
          QuoteManager.getRandomQuote()
        //then post quote for that page
            .then(quote => {
              const initialQuote = {
                page_id: this.state.page_id,
                quote_text: quote.quoteText,
                quote_author: quote.quoteAuthor
              };
              QuoteManager.postQuote(initialQuote)
                .then(() => {
                  this.props.history.push(`/books/${this.props.book_id}/${this.state.page_id}/${this.state.month}/${this.state.day}`)
                  this.toggle()
                  this.toggleSidebar()
              })
            })
        } else {
          this.props.history.push(`/books/${this.props.book_id}/${this.state.page_id}/${this.state.month}/${this.state.day}`)
          this.toggle()
          if (this.state.visible === true) {
            this.toggleSidebar()
          }
        }
      })
    }

    handlePageChange = () => {
      this.setState({loadingStatus: true},
        this.handlePageSelect
      )
    }

//Construct or navigate to page (called in PageSelect)
    handlePageSelect = () => {
    //check to see if the page already exists in the database
      PageManager.checkForPage(this.props.book_id, this.state.month, this.state.day)
        .then(page => {
          //THEN, if it does exist, set state with that page's info, and push user to that page's view
          if (page.id !== 0) {
            console.log("day in state: ", this.state.month, this.state.day)
            console.log("navigating to ", page.month, page.day)
            this.navigateToPage(page)
          } else {
            console.log("about to construct page ", this.state.month, this.state.day)
          //else, if the page does not exist yet, construct an object for that page
            this.constructNewPage()
          }
        })
      this.setState({loadingStatus: false})
    }

//update state with appropriate quotes whenever page is changed (called in componentDidUpdate in QuoteList)
    renderPageQuotes = (page_id) => {
    //get quotes for the page that is passed in as an argument, and set them in state
      QuoteManager.getPageQuotes(page_id)
        .then(quotes => {
          this.setState({
            quotes: quotes,
          })
        })
    }

//update state with appropriate thought whenever page is changed (called in componentDidUpdate ThoughtList)
    renderThought = (page_id) => {
    //get page data for page that is passed in as argument, and set thought in state
      PageManager.getPage(page_id)
        .then(page => {
            this.setState({
                thought: page.thought
            })
        })
    }

    //Add quote and pageQuote to database (called in AddQuoteModal)
    addQuote = (newQuote, page_id) => {
      //post new quote object to the database
      return QuoteManager.postQuote(newQuote)
        .then(quote => {
            console.log("quote posted:", quote.quote_text)
          //post the new pageQuote to the database
            QuoteManager.getPageQuotes(page_id)
            .then(quotes => {
              this.setState({
                quotes: quotes
            })
          })
        })
    }


//put edited quote object in database, then get all quotes for that page and set them in state (called in EditQuoteModal)
    putEditedQuote = (editedQuote, page_id) => {
        return QuoteManager.editQuote(editedQuote.id, editedQuote)
            .then(() => {
                QuoteManager.getPageQuotes(page_id)
                .then(quotes => {
                    this.setState({
                        quotes: quotes,
                    })
                })
            })
    }

//delete quote from database, then get all pageQuotes and set them in state (called in QuoteCard)
    removeQuote = (id, page_id) => {
        QuoteManager.deleteQuote(id)
            .then(() => {
                QuoteManager.getPageQuotes(page_id)
                    .then(quotes => {
                        this.setState({
                            quotes: quotes,
                        })

                    })
            })
    };

//put page object with edited thought in database, then get the page and set thought in state (called in AddThoughtModal)
    putThought = (pageWithThought, page_id) => {
        console.log(page_id, pageWithThought)
        PageManager.editPage(page_id, pageWithThought)
            .then(()=> {
                PageManager.getPage(page_id)
                .then(page => {
                    this.setState({
                        thought: page.thought
                })
            })
        })
    }

    componentDidMount () {
        BookDataManager.getBook(this.props.book_id)
            .then(book => {
              this.setState({
                  starts_blank: book.starts_blank,
              })
            })
    }

    render() {
        const { visible } = this.state
        return (
        <>
            <div className="pageSelect">
                <Menu
                  fluid widths={1}
                  borderless
                  fixed="top"
                  inverted
                  color="grey"
                >
                  <Menu.Item
                    onClick={this.toggleSidebar}
                    icon="chevron down"
                  >
                  </Menu.Item>
                </Menu>
            <div className="spacer"></div>
            <Sidebar.Pushable animation='push'>
                <div className="sidebar">
                <Sidebar
                    as={Menu}
                    color="grey"
                    animation='push'
                    icon='labeled'
                    inverted
                    horizontal="true"
                    direction='top'
                    visible={visible}
                    className="sidebar__menu"
                >
                {this.state.monthOptions.map(monthSelect => (
                  <PageSelect
                    key={monthSelect}
                    setMonth={this.setMonth}
                    toggleSidebar={this.toggleSidebar}
                    toggle={this.toggle}
                    handleFieldChange={this.handleFieldChange}
                    handlePageSelect={this.handlePageSelect}
                    monthSelect={monthSelect}
                    day={this.state.day}
                    {...this.props}
                  />
                ))}

            </Sidebar>

            </div>
            <Sidebar.Pusher className="sidebar__pusher" dimmed={this.state.visible}>
              <PageViews
                thought={this.state.thought}
                toggleSidebar={this.toggleSidebar}
                putEditedQuote={this.putEditedQuote}
                addQuote={this.addQuote}
                removeQuote={this.removeQuote}
                putThought={this.putThought}
                renderThought={this.renderThought}
                renderPageQuotes={this.renderPageQuotes}
                quotes={this.state.quotes}
                changeMonthAndDay={this.changeMonthAndDay}
                {...this.props}
              />
            </Sidebar.Pusher>
            </Sidebar.Pushable>

            </div>
        </>
        )
    }
}


export default PageMain