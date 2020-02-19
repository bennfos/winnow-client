import React, { Component } from 'react';
import { Input, InputGroup, Fade } from 'reactstrap';
import { Image } from 'semantic-ui-react'
import QuoteManager from '../../API/QuoteManager';
import SearchResultCard from './SearchResultCard';
import '../Styles/Search.css'
import logo from '../../agronomy.png'


class Search extends Component {

        state = {
            quotes: [],
            searchInput: "",
            searchResults: [],
            initialMessage: "search and you shall find",
        }


    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    }

    searchPageQuotes = () => {
      //4. Filter the quotes to include only those objects whose quote_text, quote_author or month include the search input value
      this.setState({initialMessage: ""})
      const searchResults = this.state.quotes.filter(quote =>
              quote.quote_text.toLowerCase().includes(this.state.searchInput.toLowerCase())
              || quote.quote_author.toLowerCase().includes(this.state.searchInput.toLowerCase())
              || quote.page.month.toLowerCase().includes(this.state.searchInput.toLowerCase())
              || quote.page.thought.toLowerCase().includes(this.state.searchInput.toLowerCase()))

              this.setState({ searchResults: searchResults})
    }

  componentDidMount () {
    QuoteManager.getQuotes(this.props.currentUser.id)
        .then(quotes => {
            this.setState({
                quotes: quotes,
            })
        })
    }


    render() {
        return (
            <React.Fragment>
                <div className="search__container">
                    <div className="search__input">
                        <InputGroup size="lg">
                        <Input
                            onChange={this.handleFieldChange}
                            onKeyUp={this.searchPageQuotes}
                            type="text"
                            id="searchInput"
                            placeholder="search quotes, authors, months, or thoughts"
                            value={this.state.searchInput}
                            autoFocus>
                        </Input>
                        </InputGroup>
                    </div>
                    <div className="results__container">
                        {this.state.searchResults !== undefined ?
                          this.state.searchResults.map(searchResult => (
                            <SearchResultCard
                                key={searchResult.id}
                                searchResult={searchResult}
                                {...this.props}/>
                            ))
                          : <div></div> }
                          <div className="initialMessage">
                              <Image className="logo" src={logo}></Image>
                              <div className="initialMessage--text">
                                  <h2>{this.state.initialMessage}</h2>
                              </div>
                          </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Search;

