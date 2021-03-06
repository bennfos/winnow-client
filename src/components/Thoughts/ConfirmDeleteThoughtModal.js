import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button} from 'semantic-ui-react'

class ConfirmDeleteThoughtModal extends Component {

//Defines initial state
    state = {
            quote_author: "",
            quote_text: "",
            modal: false
        };

//Displays/hides the modal
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

//edits page so that thought is removed, and puts edited page in database (see PageMain)
    removeThought = () => {
        const pageWithThought = {
            id: this.props.page_id,
            book_id: this.props.book_id,
            month: this.props.month,
            day: this.props.day,
            thought: ""
        }
        this.props.putThought(pageWithThought, this.props.page_id)
        this.toggle()
    }

    render(){
        return(
            <>
                <section className="confirmSectionContent">
                    <Button
                        negative
                        className="delete__icon"
                        name="delete"
                        onClick={this.toggle}

                    >delete
                    </Button>
                </section>
                <div>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                    >
                        <ModalHeader toggle={this.toggle}>confirm delete</ModalHeader>
                        <ModalBody>
                            <div className="confirm__message">
                                <h4>are you sure you want to delete this thought?</h4>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                negative
                                onClick={() => {
                                    this.removeThought()
                                    this.props.toggle()
                                }}>yes
                            </Button>
                            <Button
                                onClick={this.toggle}
                            >cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }

}
export default ConfirmDeleteThoughtModal