fetchMovieAsync();

//! Mitt mål: få ut alla personer som är med i filmen
function fetchMovieThen(){
  const url = 'https://ghibliapi.herokuapp.com/films/0440483e-ca0e-4120-8c50-4c8cd9b965d6';
  /* Fetch the movie */
  fetch(url)
    .then((response) => response.json())
    .then((movie) => {
      /* Each person connected to the movie is stored as an URL
       * inside the array movie.people. This means we must make additional 
       * fetch-requests to the API to get this information */
      let people = movie.people;
      /* We must create an array of promises and the resolve every call
       * at the same time*/
      let promiseArray = [];
      /* Loop through people and get the URL to every person. */
      for(personURL of people){
        /* Make a new request to each of these URLs and save the promise to this
         * call inside an array */
        const personPromise = fetch(personURL).then((response) => response.json())
        promiseArray.push(personPromise);
      }
      /* When we have all 10 promises we can resolve every promise at the same time */
      Promise.all(promiseArray)
        .then((allPeople) => {
          console.log(allPeople);
        })
    })
}


/* ASYNC FUNCTION */

// this won't work! `await` cannot be used like this in global scope.
// the await keyword can only be used inside of an async function.
//const movie = await fetch();


/* 
 * An async function is created by adding the keyword `async` in front
 * of the function. We can then use the `await` keyword and make each line
 * wait for the previous line before continuing.
*/
async function fetchTwoMovies(){
  const url = 'https://ghibliapi.herokuapp.com/films/0440483e-ca0e-4120-8c50-4c8cd9b965d6';
  /* Instead of saying `then()` we `await` the response. The fetch is still async
   * but the next line will wait the response to return */
  const response = await fetch(url);
  /* we must still convert the response to JSON, because the response is 
   * async we must await again, otherwise we will not await the response */
  const movie = await response.json();
  /* This works with multiple requests in the same function. We can await two different
   * API calls and the log them at the same time. */
  const response2 = await fetch('https://ghibliapi.herokuapp.com/films/cd3d059c-09f4-4ff3-8d63-bc765a5184fa');
  const movie2 = await response2.json();
  console.log(movie, movie2);
}

async function fetchMovieAsync(){
  const url = 'https://ghibliapi.herokuapp.com/films/0440483e-ca0e-4120-8c50-4c8cd9b965d6';
  const response = await fetch(url);
  const movie = await response.json();
  let people = movie.people;
  let promiseArray = [];
  for(personURL of people){ 
    let personPromise = await fetch(personURL)
    let person = await personPromise.json();
    promiseArray.push(person);
  }
  const allPeople = await Promise.all(promiseArray);
  const movieInfo = document.getElementById('movieInfo');
  let htmlBlock = `<h1>${movie.title} Characters</h1>`;
  for(let person of allPeople){
    htmlBlock += `
      <div class="person">
        <p><span style="color: #999">name:</span> ${person.name}</p>
        <p><span style="color: #999">age:</span> ${person.age}</p>
      </div>
    `;
  }
  movieInfo.innerHTML = htmlBlock;
}
