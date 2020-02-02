import fetchJsonp from 'fetch-jsonp'
import { createAuthHeaders } from '../API/userManager';

const baseUrl = "/api/v1"

export default {

//All methods that fetch the quote data, with varying parameters and/or methods

    getQuotes() {
        const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/quotes`, {
            headers: authHeader
        })
        .then(response => response.json());
    },
    getPageQuotes(pageId) {
        const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/quotes?pageId=${pageId}`, {
            headers: authHeader
        })
        .then(response => response.json());       
    },    
    getQuote(id) {
        const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/quotes/${id}`, {
            headers: authHeader
        })
        .then(response => response.json());
    },
    postQuote(newQuote) {
        const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/quotes`, {
            headers: authHeader,
            method: "POST",
            body: JSON.stringify(newQuote)
        }).then(response => response.json())
    },
    editQuote (id, editedQuote) {
        const authHeader = createAuthHeaders();
        return fetch (`${baseUrl}/quotes/${id}`,  {
            method: "PUT",
            headers: authHeader,
            body: JSON.stringify(editedQuote)
        })
    },    
    deleteQuote(id) {
        const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/quotes/${id}`,
        {method: "DELETE",
        headers: authHeader,
        }).then(response => response.json())
    },
    getRandomQuote () {      
        return fetchJsonp('http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en',
            {jsonpCallback: 'jsonp'})
            .then(function(response) {
            return response.json();
        })
    }
}