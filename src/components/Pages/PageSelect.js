import React, { Component } from 'react';
import { Label, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import { Menu, Button, Grid, Container } from 'semantic-ui-react';
import '../Styles/Pages.css'



class PageSelect extends Component {

//Defines initial state
    state = {
        days: [],
        modal: false,
        focus: "hide",
    };

    //toggles modal
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }





    pushDaysOfMonth = () => {
        const monthSelected = this.props.monthSelect
        const daysOfMonth = []
        for (let i = 1; i <= 31; i++) {
            daysOfMonth.push(i)
        }
        if (monthSelected === "february") {
                daysOfMonth.pop()
                daysOfMonth.pop()
        } else if (monthSelected === "september" || monthSelected === "april" || monthSelected === "june" || monthSelected === "november") {
            daysOfMonth.pop()
        }
        this.setState({
            days: daysOfMonth
        })
    }

    render(){
        const monthSelected = this.props.monthSelect
        return(
            <>
                <Menu.Item
                        onClick={() => {
                            this.props.setMonth(monthSelected)
                            this.pushDaysOfMonth()
                            this.toggle()
                        }}
                        >{monthSelected}
                </Menu.Item>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>select page</ModalHeader>
                    <ModalBody className="card__body">
                        <Container className="calendar__container">
                            <Grid columns={7}>
                                <Grid.Row centered>
                                    <Label />{monthSelected} {this.props.day}
                                </Grid.Row>
                                <Grid.Row>
                                    {this.state.days.map(day => {
                                        return (
                                            <Grid.Column key={day}>
                                                <Input
                                                    id="day"
                                                    type="button"
                                                    value={day.toString()}
                                                    className="dayInt__button "
                                                    onClick={this.props.handleFieldChange}

                                                >
                                                </Input>
                                            </Grid.Column>
                                        )
                                    })}
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                            <Button
                                primary
                                onClick={() => {
                                    this.props.handlePageSelect()
                                    this.toggle()
                                }
                                }>go
                            </Button>

                        <Button
                            onClick={
                                this.toggle
                            }>cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </>

        )
    }
}

export default PageSelect