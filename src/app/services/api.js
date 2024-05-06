import axios from 'axios';

//Change API KEY ON PAJE.JS TO MAKE PROJECT WORK//
{/*BASE URL: https://api.themoviedb.org/3/ */}
{/*URL API ref: https://api.themoviedb.org/3/movie/now_playing?api_key=b0d5979aeace1163c787c8bee0edda9b&language=pt-BR*/}

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});

export default api;