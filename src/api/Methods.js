import Axios from "axios";

export const baseUrl = "https://topicos.azurewebsites.net/api/";

function doApiGet(suburl, params) {
    return Axios.get(baseUrl + suburl, params);
}
function doApiPost(suburl, params) {
    return Axios.post(baseUrl + suburl, params);
}

export default { baseUrl, doApiGet, doApiPost };
