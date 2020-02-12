import React, { Component } from 'react'
import { Fade } from 'reactstrap'
import { Button } from 'semantic-ui-react'
import QuoteDataManager from '../../API/QuoteManager'
import '../Styles/RandomQuote.css'




class RandomQuote extends Component {
    state = {
        quoteText: "",
        quoteAuthor: "",
        fadeIn: true
      };

      refreshRandomQuote = () => {
        QuoteDataManager.getRandomQuote()
            .then(quote => {
                this.setState({
                    quoteText: quote.quoteText,
                    quoteAuthor: quote.quoteAuthor
                })
        })
    }

    toggle = () => {
        this.setState({
            fadeIn: !this.state.fadeIn,
        });
    }

    componentDidMount () {
        this.refreshRandomQuote()
    }

    componentWillUnmount () {
        this.setState({
            fadeIn: false
        })
    }


    render() {
       return (
        <>
            <div className="randomQuote__container">
                <div className="randomQuote__button">
                        <Button
                            circular
                            size="big"
                            icon="quote left"
                            onMouseDown={this.toggle}
                            onClick={() => {
                                this.refreshRandomQuote()
                                this.toggle()
                                }
                            }
                        ></Button>
                </div>

                <Fade in={this.state.fadeIn} tag='h3' timeout={600}>
                    {this.state.quoteText}
                </Fade>
                <div className="author">
                    <Fade in={this.state.fadeIn}  tag='h5' timeout={600}>
                        {this.state.quoteAuthor}
                    </Fade>
                </div>

            </div>
        </>
       )}
}

export default RandomQuote