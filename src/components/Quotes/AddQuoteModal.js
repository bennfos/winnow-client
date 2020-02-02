import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { Icon, Button } from 'semantic-ui-react'


class AddQuoteModal extends Component {

//Defines initial state
    state = {
        quoteText: "",
        quoteAuthor: "",
        modal: false,
        loadingStatus: false
    };


//toggles modal
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

//Sets state with input values as fields change
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    constructNewQuote = () => {

    //Validates user input
        if (this.state.quoteText === "") {
            alert("please provide the quote text");
        } else {
            this.setState({ loadingStatus: true });

            console.log(this.props.pageId)

        //creates a new object for the quote that is to be added,
            const newQuote = {
                pageId: this.props.pageId,
                quoteText: this.state.quoteText,
                quoteAuthor: this.state.quoteAuthor,
            };
            console.log(newQuote);
        //posts the object to the database, gets all pageQuotes, and rerenders (see PageMain)
            this.props.addQuote(newQuote, this.props.pageId)

        //closes the modal
                .then(this.toggle)
    }
};

//this is called after a new quote is created and rendered to DOM.
//This fixes a bug that allowed users to add the same quote twice
//in a row without typing anything in the input fields the second time,
//becuase the quote text and author were already in state.
    resetQuoteState = () => {
        this.setState({
            quoteText: "",
            quoteAuthor: ""
        })
    }

    render(){
        return(
            <>
                <section className="addQuote__button">
                    <Icon
                      onClick={this.toggle}
                      name="add">
                    </Icon>
                </section>
                <div>
                    <Modal
                        autoFocus={false}
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                    >
                        <ModalHeader toggle={this.toggle}>add quote</ModalHeader>
                        <ModalBody>
                          <Input onChange={this.handleFieldChange}
                                  type="textarea"
                                  id="quoteText"
                                  placeholder="text"
                                  required
                                  autoFocus={true}
                              /><br/>
                          <Input onChange={this.handleFieldChange}
                                  type="text"
                                  id="quoteAuthor"
                                  placeholder="author"
                              /><br/>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                primary
                                onClick={ ()=> {
                                this.constructNewQuote()
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

export default AddQuoteModal