/*******************
 * Method chaining *
 *******************/

// const string = "Agneta och Göran har skiljt sig";
// const splitString = string.split(' ')
// const reversedString = splitString.reverse()
// const joinedString = reversedString.join(' ')
// const subString = joinedString.substr(14);
// console.log(subString);

fetchMovie();

//! Mitt mål: få ut alla personer som är med i filmen
function fetchMovie(){
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
