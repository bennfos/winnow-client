import { createAuthHeaders } from '../API/userManager';

const baseUrl = "https://winnow-rails-api.herokuapp.com/api/v1"
export default {

    //All methods that fetch the pages data, with varying parameters and/or methods

    getPage(id) {
        const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/pages/${id}`, {
            headers: authHeader
        })
        .then(response => response.json())
    },
    postPage(newPage) {
        //const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/pages`, {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(newPage)
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    },
    editPage(id, editedPage) {
        const authHeader = createAuthHeaders();
        return fetch (`${baseUrl}/pages/${id}`, {
            headers: authHeader,
            method: "PUT",
            body: JSON.stringify(editedPage)
        })
    },
    checkForPage(book_id, month, day) {
        const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/pages/${book_id}/${month}/${day}`, {
            headers: authHeader
        }).then(response => response.json());
    }
}