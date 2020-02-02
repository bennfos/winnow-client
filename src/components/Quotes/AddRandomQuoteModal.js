import React, { Component } from 'react'
import QuoteManager from '../../API/QuoteManager'
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap'
import { Button } from 'semantic-ui-react'
//import './Quotes.css'



class AddRandomQuoteModal extends Component {
    state = {
        quoteText: "",
        quoteAuthor: "",
        modal: false
      };

      toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

      handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);       
    };


        refreshRandomQuote = () => {
            QuoteManager.getRandomQuote()
                .then(quote => {
                    this.setState({
                        quoteText: quote.quoteText,
                        quoteAuthor: quote.quoteAuthor
                    })
            })
        }

        constructNewRandomQuote = event => {
            this.setState({ loadingStatus: true });
        //creates a new object for the quote that is to be added,
            const newRandomQuote = {               
                pageId: this.props.pageId,
                quoteText: this.state.quoteText,
                quoteAuthor: this.state.quoteAuthor,              
            };
        //posts the object to the database, gets all pageQuotes, and rerenders (see PageMain)
            this.props.addQuote(newRandomQuote, this.props.pageId)
        //closes the modal
            .then(this.toggle)
        }

        resetQuoteState = () => {
            this.setState({
                quoteText: "",
                quoteAuthor: ""
            })
        }

    render() {
       return (
        <>
                <section className="quoteSectionContent">
                    <div className="addRandomQuoteModal__button">
                        <Button
                            onClick={() => {
                                this.toggle()
                                this.refreshRandomQuote()
                            }}
                            circular
                            icon="quote left"
                            size="big"
                        >
                        </Button>
                    </div>
                </section>
                <div>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                    >
                        <div className="modal__header">
                            <ModalHeader

                                toggle={this.toggle}
                                >
                                <div>
                                    <Button
                                        onClick={this.refreshRandomQuote}
                                        circular
                                        icon="quote left"
                                    ></Button>
                                </div>
                            </ModalHeader>
                        </div>
                            <ModalBody>
                                <Input onChange={this.handleFieldChange}
                                        disabled
                                        type="textarea"
                                        id="quoteText"
                                        value={this.state.quoteText}
                                    /><br/>
                                <Input onChange={this.handleFieldChange}
                                        disabled
                                        type="text"
                                        id="quoteAuthor"
                                        value={this.state.quoteAuthor}
                                    /><br/>
                            </ModalBody>
                        <ModalFooter>
                            <Button
                                primary
                                onClick={ ()=> {
                                this.constructNewRandomQuote()
                                setTimeout(this.resetQuoteState, 1000)
                                }}>save</Button>
                            <Button
                                onClick={() => {
                                    this.toggle()
                                    this.resetQuoteState()
                                }}
                                >cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }
}

export default AddRandomQuoteModal