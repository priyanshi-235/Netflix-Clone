import axios from "axios";
// base url will be same for all the requests, the requests are sent to the movie database
const instance = axios.create({
    baseURL : "https://api.themoviedb.org/3", 
});
// instance.get('/foo-bar');
export default instance;