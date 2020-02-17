import React, { Component } from 'react';
import { Input, InputGroup, Fade } from 'reactstrap';
import { Image } from 'semantic-ui-react'
import QuoteManager from '../../API/QuoteManager';
import SearchResultCard from './SearchResultCard';
import '../Styles/Search.css'
import logo from '../../agronomy.png'


class Search extends Component {

        state = {
            searchInput: "",
            searchResults: [],
            initialMessage: "search and you shall find",
            loadingStatus: true,
        }


    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange);
    }

    searchPageQuotes = () => {
        this.setState({initialMessage: ""})
        let search = this.state.searchInput.toLowerCase()
        QuoteManager.searchQuotes(search)
        .then(quotes => {
            console.log(quotes)
            this.setState({
                searchResults: quotes,
                loadingStatus: false
            })
            console.log(this.state.searchResults)
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
                        { this.state.searchResults.length > 0 ?
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

