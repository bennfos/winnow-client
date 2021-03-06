import fetchJsonp from 'fetch-jsonp'
import { createAuthHeaders } from '../API/userManager';

const baseUrl = "https://winnow-rails-api.herokuapp.com/api/v1"

export default {

//All methods that fetch the quote data, with varying parameters and/or methods

    getQuotes(user_id) {
        return fetch(`${baseUrl}/quotes?user_id=${user_id}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        .then(response => response.json())
    },
    getPageQuotes(page_id) {
        const authHeader = createAuthHeaders()
        return fetch(`${baseUrl}/quotes?page_id=${page_id}`, {
            headers: authHeader
        })
        .then(response => response.json())
    },
    getQuote(id) {
        const authHeader = createAuthHeaders()
        return fetch(`${baseUrl}/quotes/${id}`, {
            headers: authHeader
        })
        .then(response => response.json())
    },
    postQuote(newQuote) {
        const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/quotes`, {
            headers: authHeader,
            method: "POST",
            body: JSON.stringify(newQuote)
        }).then(response => response.json())
        .catch(error => console.log(error))
    },
    editQuote (id, editedQuote) {
        const authHeader = createAuthHeaders()
        return fetch (`${baseUrl}/quotes/${id}`,  {
            method: "PUT",
            headers: authHeader,
            body: JSON.stringify(editedQuote)
        })
    },
    deleteQuote(id) {
        const authHeader = createAuthHeaders()
        return fetch(`${baseUrl}/quotes/${id}`,
        {method: "DELETE",
        headers: authHeader,
        }).then(response => response.json())
        .catch(error => console.log(error))
    },
    getRandomQuote () {
        return fetchJsonp('http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en',
            {jsonpCallback: 'jsonp'})
            .then(function(response) {
            return response.json();
        })
    }
}