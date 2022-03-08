import React, { Component } from 'react'
import QuoteManager from '../../API/QuoteManager'
import EditQuoteModal from '../Quotes/EditQuoteModal'
import PageSelect from '../Pages/PageSelect'
import ConfirmDeleteQuoteModal from './ConfirmDeleteQuoteModal';
import { Icon } from 'semantic-ui-react'
import { Fade } from 'reactstrap'
import '../Styles/Pages.css'

class QuoteCard extends Component {
    state = {
        randomQuoteText: "",
        randomQuoteAuthor: "",
        visible: false,
        fadeIn: true
    }

    toggle = () => {
      this.setState(prevState => ({
          visible: !prevState.visible
      }));
  }

//get random quote from Forismatic API and set it in state (not used yet--stretch goal)
  getRandom = () => {
      QuoteManager.getRandomQuote()
        .then(quoteObj => {
            this.setState({
                randomQuoteText: quoteObj.quoteText,
                randomQuoteAuthor: quoteObj.quoteAuthor
            })
        })
  }

  componentDidMount () {
    if (this.props.editMode === true) {
      this.toggle()
    }
   }

  componentDidUpdate(prevProps) {
    if (this.props.editMode !== prevProps.editMode) {
      this.toggle();
    }
  }

  render() {
    return (
        <>
                <div className="quoteCard__container">
            <Fade in={this.state.fadeIn}>
                    <div className="quoteCard__contents">
                        <h3>{this.props.quote.quote_text}</h3>
                        <h5 className="author">{this.props.quote.quote_author}</h5>
                      <Fade in={this.state.visible}>
                        <div className="editAndDelete">
                          <div className="edit">
                            <EditQuoteModal
                              {...this.props}/>
                          </div>
                          <div className="move">
                            <Icon
                              onClick={() => this.props.toggleSidebarToMoveQuote(this.props.quote)}
                              name='calendar alternate outline'
                            >
                            </Icon>
                            <h1>|</h1>
                          </div>
                          <div className="delete">
                            <ConfirmDeleteQuoteModal
                              {...this.props}/>
                          </div>
                        </div>
                      </Fade>
                    </div>
            </Fade>
                </div>
        </>
    );
    }
}


export default QuoteCard