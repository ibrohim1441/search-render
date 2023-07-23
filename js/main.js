const apiKey = "1133b44aa5ee88fa87de5b4927c2f2f9";
const urlmovie = "https://api.themoviedb.org/3/";

const imagesUrl = "https://image.tmdb.org/t/p/w500";
const fragment = document.createDocumentFragment();
// console.log(url);



async function moviekey() {
  const searchmovie = document.querySelector("#search").value;

  let url;

  if (searchmovie) {
    url = `${urlmovie}search/movie?api_key=${apiKey}&query=${searchmovie}`;
  } else {
    url = `${urlmovie}discover/movie?api_key=${apiKey}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    const movie_container = document.querySelector(".movie-container");
    movie_container.innerHTML = "";

    data.results.map((movie) => {
      const movie_card = document.createElement("div");
      movie_card.classList.add("movie-card");

      const movieImage = document.createElement("img");
      movieImage.src = `${imagesUrl}${movie.backdrop_path}`;
      movieImage.alt = movie.title;

      const movieTitle = document.createElement("h4");
      movieTitle.textContent = movie.title;

      const movieRelease = document.createElement("span");
      movieRelease.textContent = `Released: ${movie.release_date}`;

      fragment.appendChild(movieImage);
      fragment.appendChild(movieTitle);
      fragment.appendChild(movieRelease);
      movie_card.appendChild(fragment);
      movie_container.appendChild(movie_card);
    });
  } catch (error) {
    console.error(error.message);
  } finally {
    const loader = document.querySelector(".loader");
    if (loader) {
      loader_container.remove();
    }
  }
}

const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", () => {
  moviekey();
});

moviekey();
