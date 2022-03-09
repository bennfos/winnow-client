import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import { Button, Icon } from 'semantic-ui-react'
import QuoteManager from '../../API/QuoteManager'
import '../Styles/Pages.css'


class EditQuoteModal extends Component {

//Defines initial state
    state = {
        quote_text: "",
        quote_author: "",
        loadingStatus: false,
        modal: false
    };



//Displays/hides the edit modal
    toggle = () => {
      if (this.props.editMode === true) {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    }

//Sets state with input values as fields change
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };


    editExistingQuote = (event) => {
        event.preventDefault();

    //Validates user input
        if (this.state.quote_text === ""
        ) {
            alert("please provide the quote text");
        } else {
            this.setState({ loadingStatus: true });

        //creates a new object for the edited news item,
            const editedQuote = {
                id: this.props.quote.id,
                page_id: this.props.quote.page_id,
                quote_text: this.state.quote_text,
                quote_author: this.state.quote_author,
            };
        //posts the object to the database (see PageMain)
            this.props.putEditedQuote(editedQuote, this.props.page_id)
        //closes the modal
            .then(this.toggle)
        }
    }


//Gets the quote that is being edited and sets state to populate the input fields
    componentDidMount() {
        QuoteManager.getQuote(this.props.quote.id)
        .then(quote => {
            this.setState({
                quote_text: quote.quote_text,
                quote_author: quote.quote_author,
            });
        });
    }

    render(){
        return(
          <>
            <div className="editWithPipe">
              <Icon
                onClick={this.toggle}
                name='edit'
              >
              </Icon>
              <h1>|</h1>
            </div>
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}
                className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle}>edit quote</ModalHeader>
                        <ModalBody>

                            <div className="editBookForm">
                                <Input onChange={this.handleFieldChange} type="textarea"
                                    id="quote_text"
                                    value={this.state.quote_text}
                                    required
                                    autoFocus=""
                                /><br/>
                                <Input onChange={this.handleFieldChange} type="text"
                                    id="quote_author"
                                    value={this.state.quote_author}
                                    required
                                /><br/>
                            </div>

                        </ModalBody>
                    <ModalFooter>
                        <Button primary onClick={this.editExistingQuote}>save</Button>
                        <Button onClick={this.toggle}>cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
        )
    }
}

export default EditQuoteModal