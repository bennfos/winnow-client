import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import BookManager from '../../API/BookManager'
import { register } from '../../API/userManager';
import axios from 'axios'

//import './Login.css';

class RegisterModal extends React.Component {
    state = {
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
            password_confirmation: "",
            modal: false,
            errors: []
        };


     submit = (event) => {
      const {
        first_name,
        last_name,
        email,
        username,
        password,
        password_confirmation
      } = this.state
      axios.post(
        'https://winnow-rails-api.herokuapp.com/api/v1/registrations',
        {first_name: first_name,
          last_name: last_name,
          email: email,
          username: username,
          password: password,
          password_confirmation: password_confirmation
        },
        { withCredentials: true}
        ).then(response => {
          console.log("registration response: ", response)
          if (response.data.status === "created") {
            this.props.handleSuccessfulAuth(response.data)
          }
          this.toggle();
          this.props.history.push('/quote');
        }).catch(error => console.log("registration error: ", error))

        event.preventDefault();
        // console.log(newUser)
        // register(newUser)
        // .then((user) => {
        //     this.props.onLogin(user);
        //     this.constructFirstBook();


        //     })
        //     .catch(err => {
        //     this.setState({ errors: err.messages });
        //     });
    }

    handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
        [name]: value,
    });
    }


    //toggles modal
    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    constructFirstBook = () => {

        const firstBook = {
            title: "quotebook",
            description: "we have created a quotebook for you, with inspiration for each day of the year.",
            starts_blank: false
        }
        BookManager.postBook(firstBook)
    }


    render() {
        return (
            <div className="auth">
                <div className="registerbtn">
                    <Button onClick={this.toggle}>sign up</Button>
                </div>
                <Modal autoFocus={false} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <form onSubmit={this.submit}>
                    <ModalHeader toggle={this.toggle}>Sign up</ModalHeader>
                    <ModalBody>
                    <ul>
                        {
                            this.state.errors ? this.state.errors.map((message, i) => (
                            <li key={i}>{message}</li>
                            )) : null
                        }
                    </ul>
                        <div>
                            <Input onChange={this.handleInputChange}
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    placeholder="first name"
                                    value={this.state.first_name}
                                    required
                                    autoFocus={true}
                                /><br/>
                            <Input onChange={this.handleInputChange}
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    placeholder="last name"
                                    value={this.state.last_name}
                                    required
                                    /><br/>
                            <Input onChange={this.handleInputChange}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="email"
                                    value={this.state.email}
                                    required
                                    autoFocus=""
                                    /><br/>
                            <Input onChange={this.handleInputChange}
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="username"
                                    value={this.state.username}
                                    required
                                    /><br/>
                            <Input onChange={this.handleInputChange}
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    value={this.state.password}
                                    required
                                    /><br/>
                            <Input onChange={this.handleInputChange}
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    placeholder="confirm password"
                                    required
                                />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="submit"
                            primary
                            >Sign up</Button>
                        <Button onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default withRouter(RegisterModal);