'use strict'

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fee0c975e3af011c4e363be61eb897e7&page=1';

const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=fee0c975e3af011c4e363be61eb897e7&query=';

const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280';

// const imageContainer = document.querySelector('.movie').children[0];
// const createImage = function(){

// };
const main  = document.querySelector('#main');
const Search = document.querySelector('#search');
const renderMovie = function(data){
    const imagepath = data.poster_path;
    const html = `
    <div class="movie">
            <img src="https://image.tmdb.org/t/p/w1280${imagepath}" alt="img">
            <div class="movie-info">
                <h3>${data.original_title}</h3>
                <span class="green">${data.vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${data.overview},
            </div>
        </div>
    `
    main.insertAdjacentHTML('beforeend',html);
}
const movie = document.querySelectorAll('.movie');
const getMoviedata = async function(){
    
    try{
        const res = await fetch(API_URL);
        // console.log(res);
        const data = await res.json();
        // console.log(data);   
        const result = data.results;
        // console.log(result);
        result.forEach(element => {
            renderMovie(element);
        });
    }
    catch(err){
        console.error(err);
    }
}
// getMoviedata();

const getMoviebyInput = async function(value){
    try{
        const res = await fetch(`${SEARCH_URL}${value}`)
        const data = await res.json();
        const result = data.results;
        // console.log(result);
        // Array.from(document.querySelectorAll('.movie'),ele => ele.remove());
        main.innerHTML = '';
        result.forEach(element => {

            renderMovie(element);
        });
        console.log(data);
    }catch(err){
        console.log(err);
    }
}
document.addEventListener('keydown',(e)=>{
    
    if(e.key === 'Enter' && Search.value != ''){
        e.preventDefault();
        getMoviebyInput(Search.value);
    }
    
});
getMoviedata();