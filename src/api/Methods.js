import Axios from 'axios';

export const url = 'http://localhost:3001/transactions';
export const apiUrl = 'http://topicos.azurewebsites.net/api/';

export const doApiPost = (transaction) => {
    console.log("transaction");
    console.log(transaction);
    Axios.post(url, transaction)
    .then(response => {
        console.log(response);
        console.log(response.data);
    });
}

export default doApiPost;