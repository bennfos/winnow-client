import React, { Component } from 'react'
import { Card, CardTitle, Modal, ModalBody, ModalFooter, ModalHeader, Input} from 'reactstrap'
import { Button } from 'semantic-ui-react'
import PageManager from '../../API/PageManager'
import ConfirmDeleteThoughtModal from './ConfirmDeleteThoughtModal'
import { Image } from 'semantic-ui-react'
import logo from '../../agronomy.png'

class ThoughtCard extends Component {
    state = {
        pages: [],
        pageId: 0,
        thought: "",
        modal: false,
        loadingStatus: false,
        className: "hide"
    }


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

    constructOrEditThought = event => {
        //Validates user input
        if (this.state.thought === "") {
            alert("please provide the thought text or cancel");
        } else {
            //construct a page object that includes the new or edited thought
            const pageWithThought = {
                id: this.props.pageId,
                bookId: this.props.bookId,
                month: this.props.month,
                day: this.props.day,
                thought: this.state.thought
            }
            //put the page record with new or edited thought in the database (see PageMain)
            this.props.putThought(pageWithThought, pageWithThought.id)
        }
        this.toggle()
    }

    // renderThought updates state of thought in PageMain to trigger render when ThoughtCard is mounted
        componentDidMount() {
            this.props.renderThought(this.props.pageId)
            //gets thought for that page into state so that it can be displayed in input field for user
            PageManager.getPage(this.props.pageId)
                .then(page => {
                    this.setState({
                        thought: page.thought,
                        loadingStatus: false,
                    });
                });
            setTimeout(() => {
                this.setState({
                    className: "thoughtCard"
                })
            }, 2400)
        }


//When component receives new pageId in props (i.e., page is changed) from PageMain, update state in PageMain to cause an update of state in this modal. Ensures correct value will populate in input field after page change.
componentDidUpdate(prevProps) {
    if (this.props.pageId !== prevProps.pageId) {
      this.props.renderThought(this.props.pageId)
      this.setState({
        thought: this.props.thought
      })
    }
  }

//clears state of thought so that nothing will display if there is no thought in props.
//This ensures input field will be empty if opening modal from page with no thought yet added.
//This fixes a bug which caused thought from previous page to input field when adding thought to a new page.
resetThoughtInStateIfNoThoughtInProps = () => {
    if (this.props.thought === "") {
        this.setState({
            thought: ""
        })
    }
}

  render() {
    return (

        <div className={this.state.className}>
            <Image
              className="logo" src={logo}
              onClick={()=> {
                    this.toggle()
                    this.resetThoughtInStateIfNoThoughtInProps()
                }}>
            </Image>
            <Card
                className="thoughtCard--background"
                body
                onClick={()=> {
                    this.toggle()
                    this.resetThoughtInStateIfNoThoughtInProps()
                }}
            >
            <div>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        autoFocus={false}
                    >
                        <ModalHeader toggle={this.toggle}>thought</ModalHeader>
                        <ModalBody>
                            <Input onChange={this.handleFieldChange}
                                    type="textarea"
                                    id="thought"
                                    placeholder="add thought"
                                    required
                                    autoFocus={true}
                                    value={this.state.thought}
                            ></Input>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                primary
                                onClick={ () => {
                                    this.constructOrEditThought()
                                }}>save
                            </Button>

                          {/* render delete button only if thought already exists */}
                            {this.props.thought !== "" ?
                              <ConfirmDeleteThoughtModal
                              {...this.props}
                              toggle={this.toggle}
                          /> : null}

                            <Button
                                onClick={this.toggle}
                                >cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div className="card__content">
                        <CardTitle
                            className="card__thought">
                            <h6><em>{this.props.thought}</em></h6>
                        </CardTitle>

                </div>
            </Card>
        </div>


    );
  }
}

export default ThoughtCard

