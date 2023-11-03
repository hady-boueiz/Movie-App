const API_KEY = 'api_key=7e33af591ca012e1b8899d7194a2f157';
const BASE_URL = 'https://api.themoviedb.org/3';
const NOW_PLAYING_MOVIES_API_URL = BASE_URL + '/movie/now_playing?' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');

fetchNowPlayingMovies(NOW_PLAYING_MOVIES_API_URL);

function fetchNowPlayingMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => displayMovies(data.results));
}

function displayMovies(data) {
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average.toFixed(1))}">${vote_average.toFixed(1)}</span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>`;

        main.appendChild(movieElement);
    });
}

function getColor(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}