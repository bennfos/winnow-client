import { createAuthHeaders } from '../API/userManager';

const baseUrl = "/api/v1"
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
        const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/pages`, {
            headers: authHeader,
            method: "POST",           
            body: JSON.stringify(newPage)
        }).then(response => response.json())
    },
    editPage(id, editedPage) {
        const authHeader = createAuthHeaders();
        return fetch (`${baseUrl}/pages/${id}`, {
            headers: authHeader,
            method: "PUT",
            body: JSON.stringify(editedPage)
        })
    },
    checkForPage(bookId, month, day) {
        const authHeader = createAuthHeaders();
        return fetch(`${baseUrl}/pages?bookId=${bookId}&month=${month}&day=${day}`, {
            headers: authHeader
        }).then(response => response.json());
    }
}