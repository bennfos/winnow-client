import React, { Component } from 'react'
import { Sidebar, Menu } from 'semantic-ui-react'
import '../Styles/Pages.css'
import PageManager from '../../API/PageManager'
import PageViews from './PageViews'
import QuoteManager from '../../API/QuoteManager'
import PageSelect from './PageSelect'
import BookDataManager from '../../API/BookManager'



class PageMain extends Component {

    state = {
        visible: false,
        modal: false,
        day: "",
        month: "",
        pageId: 0,
        page: {},
        quotes: [],
        thought: "",
        startsBlank: false,
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

    //set day in state when day input button is selected in the month menu
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
        console.log(this.state.day)
    };

    navigateToPage = (page) => {
        this.setState({
            page: page,
            month: page.month,
            day: page.day,
            pageId: page.id,
            thought: page.thought
        })
        this.props.history.push(`/books/${this.props.bookId}/${this.state.pageId}/${this.state.month}/${this.state.day}`)
        this.toggle()
        this.toggleSidebar()
    }

    constructNewPage = () => {
        const newPage = {
            bookId: this.props.bookId,
            month: this.state.month,
            day: this.state.day,
            thought: ""
        };
        console.log("constructed: ", newPage)
        //post the page object to the database, THEN set state with that page's id, and push user to that page's view
        PageManager.postPage(newPage)
        .then(page => {
            console.log("posted new page", page.id)
            this.setState({
                pageId: page.id
            })
        })
        .then(() => {
            //then get a random quote
            if (this.state.startsBlank === false) {
                QuoteManager.getRandomQuote()

            //then post quote for that page
                .then(quote => {
                    console.log("got random quote:", quote.quoteText)
                    const initialQuote = {
                        pageId: this.state.pageId,
                        quoteText: quote.quoteText,
                        quoteAuthor: quote.quoteAuthor,
                    };
                    QuoteManager.postQuote(initialQuote)
                        .then(quote => {
                            console.log("random quote posted:", quote.quoteText)
                            this.props.history.push(`/books/${this.props.bookId}/${this.state.pageId}/${this.state.month}/${this.state.day}`)

                            this.toggle()
                            this.toggleSidebar()
                        })
                })

        } else {
            console.log("pushing...")
            this.props.history.push(`/books/${this.props.bookId}/${this.state.pageId}/${this.state.month}/${this.state.day}`)
            this.toggle()
            this.toggleSidebar()
         }
    })
    }

//Construct or navigate to page (called in Month components)
    handlePageSelect = () => {
    //Validates user input
        if (this.state.day === "") {
            alert("please select a day");
        } else {
            this.setState({ loadingStatus: true });

        //check to see if the page already exists in the database
            PageManager.checkForPage(this.props.bookId, this.state.month, this.state.day)
                .then(page => {

                    //THEN, if it does exist, set state with that page's info, and push user to that page's view
                    if (page.id !== 0) {
                        console.log("navigating to ", this.state.day)
                        this.navigateToPage(page)
                    } else {
                        console.log("about to construct page ", this.state.month, this.state.day)
                    //else, if the page does not exist yet, construct an object for that page
                        this.constructNewPage()
                    }
                })

        }

    }

//update state with appropriate quotes whenever page is changed (called in componentDidUpdate in QuoteList)
    renderPageQuotes = (pageId) => {
    //get quotes for the page that is passed in as an argument, and set them in state
        console.log("pageId passed in to renderPageQuotes: ", pageId)
        QuoteManager.getPageQuotes(pageId)
          .then(quotes => {
            this.setState({
                quotes: quotes,
            })
          })
    }

//update state with appropriate thought whenever page is changed (called in componentDidUpdate ThoughtList)
    renderThought = (pageId) => {
    //get page data for page that is passed in as argument, and set thought in state
        PageManager.getPage(pageId)
            .then(page => {
                this.setState({
                    thought: page.thought
                })
            })
    }

    //Add quote and pageQuote to database (called in AddQuoteModal)
    addQuote = (newQuote, pageId) => {
        console.log("newQuote in addQuote method: ", pageId, newQuote, )
        //post new quote object to the database
        return QuoteManager.postQuote(newQuote)
            .then(quote => {
                console.log("quote posted:", quote.quoteText)
              //post the new pageQuote to the database
                QuoteManager.getPageQuotes(pageId)
                .then(quotes => {
                    this.setState({
                        quotes: quotes
                })
              });
            });
    };


//put edited quote object in database, then get all quotes for that page and set them in state (called in EditQuoteModal)
    putEditedQuote = (editedQuote, pageId) => {
        return QuoteManager.editQuote(editedQuote.id, editedQuote)
            .then(() => {
                QuoteManager.getPageQuotes(pageId)
                .then(quotes => {
                    this.setState({
                        quotes: quotes,
                    })
                })
            })
    }

//delete quote from database, then get all pageQuotes and set them in state (called in QuoteCard)
    removeQuote = (id, pageId) => {
        QuoteManager.deleteQuote(id)
            .then(() => {
                QuoteManager.getPageQuotes(pageId)
                    .then(quotes => {
                        this.setState({
                            quotes: quotes,
                        })

                    })
            })
    };

//put page object with edited thought in database, then get the page and set thought in state (called in AddThoughtModal)
    putThought = (pageWithThought, pageId) => {
        console.log(pageId, pageWithThought)
        PageManager.editPage(pageId, pageWithThought)
            .then(()=> {
                PageManager.getPage(pageId)
                .then(page => {
                    this.setState({
                        thought: page.thought
                })
            })
        })
    }




    componentDidMount () {
        BookDataManager.getBook(this.props.bookId)
            .then(book => {
                this.setState({
                    startsBlank: book.startsBlank
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
                    putEditedQuote={this.putEditedQuote}
                    addQuote={this.addQuote}
                    removeQuote={this.removeQuote}
                    putThought={this.putThought}
                    renderThought={this.renderThought}
                    renderPageQuotes={this.renderPageQuotes}
                    quotes={this.state.quotes}
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