import requests from './requests';
import './Row.css';
import React, { useState  , useEffect} from "react";
import axios from './axios';
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title , fetchUrl , isLargeRow})
{
    // creating an empty movies array
    const [movies, setMovies] = useState([]
    );
    const [trailerUrl , setTrailerUrl] = useState("");
    // we need a snippet of code that runs based on a specific condition/variable
    useEffect(() => {
        // if we leave [] brackets blank, we mean - run once the row loads and dont run again
        // if we pass a variable inside [] , like [movies] - it will run once the row loads and run every single time movies changes - dependent on movies
        async function fetchData()
        {
            const request = await axios.get(requests.fetchUrl);
            // https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US
           // console.log(request);
            setMovies(request.data.results);
            return request;
        }
        fetchData(); 
        //
    } , [fetchUrl]);
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
      const handleClick = (movie) =>
      {
        if(trailerUrl)
        {
            setTrailerUrl('');
        }
        
        else
        {
        movieTrailer(movie?.name || "")
        .then((url) =>{
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get('v'));

        })
        .catch((error) => console.log(error));
        }
        
      };
    console.table(movies);
    return (
        <div className="row">
            {/* title */}
            <h2>{title}</h2>
            <div className="row_posters">
                { /* several row posters */}
                {movies.map(movie => (<img 
                key={movie.id}
                oneClick={() => handleClick(movie)}
                className = {'row__poster ${isLargeRow &&"row__posterLarge"}'} src ={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt = {movie.name}/>) )}
            </div>
            
           {trailerUrl && <Youtube videoId = {trailerUrl} opts = {opts}/>}
        </div>
    )
}
export default Row;