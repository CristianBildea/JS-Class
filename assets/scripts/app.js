const addMovieModal = document.getElementById("add-modal");
//const addMovieModal = document.querySelector("#add-modal");

const startAddMovieButton = document.querySelector("header button");
//const startAddMovieButton = document.querySelector("header").querySelector("button");

const backdrop = document.getElementById("backdrop"); //to do a background ca in ceata
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;

const userInputs = document.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const list = document.getElementById("movie-list"); //ul

const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible"); ////to do a background ca in ceata
};

const toggleMoveModal = () => {
  addMovieModal.classList.toggle("visible");
  toggleBackdrop();
};

const cancelAddMovieHandler = () => {
  toggleMoveModal();
  clearInputs();
};

const backdropClickHandle = () => {
  toggleMoveModal();
  clearInputs();
};

const clearInputs = () => {
  for (const input of userInputs) {
    input.value = "";
  }
};

const deleteMovieHandler = (movieId) => {
  console.log("In deleteMovieHandler", movieId);
  //const index = movies.findIndex((movie)=> movie.id === movieId); - this is one away more avans
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }

  movies.splice(movieIndex, 1); //splice - delete parameter from the array
  list.children[movieIndex].remove();
  updateUI();
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.classList.add("movie-element");
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}" />
  </div>
  <div class="movie-element__info">
  <h2>${title}</h2>
  <p>${rating}/5 stars</p>
  `;

  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  //bind - is pass parameter to the function

  list.append(newMovieElement); //add li to ul
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    ratingValue < 1 ||
    ratingValue > 5
  ) {
    alert("Please enter valid values");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  clearInputs();
  toggleMoveModal();
  updateUI();
};

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block"; // will display the text
  } else {
    entryTextSection.style.display = "none"; //no display
  }
};

backdrop.addEventListener("click", backdropClickHandle);
startAddMovieButton.addEventListener("click", toggleMoveModal);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
