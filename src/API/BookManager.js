import { createAuthHeaders } from '../API/userManager';

const baseUrl = "https://winnow-rails-api.herokuapp.com/api/v1"
export default {

    //All methods that fetch the book data, with varying parameters and/or methods

    getUserBooks(userId) {
        const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/books?user_id=${userId}`, {
            headers: authHeader
        })
        .then(response => response.json())
    },
    getBook(id) {
        const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/books/${id}`, {
            headers: authHeader
        })
        .then(response => response.json())
    },
    postBook(newBook) {
        // const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/books`, {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify(newBook)
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    },
    editBook(id, editedBook) {
        const authHeader = createAuthHeaders();
        return fetch (`${baseUrl}/books/${id}`, {
            headers: authHeader,
            method: "PUT",
            body: JSON.stringify(editedBook)
        })
    },
    deleteBook(id) {
        const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/books/${id}`, {
            headers: authHeader,
            method: "DELETE"
        })
    }
}