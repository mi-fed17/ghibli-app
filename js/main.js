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
  fetch(url)
    .then((response) => response.json())
    .then((movie) => {
      let people = movie.people;
      for(personURL of people){
        fetch(personURL)
          .then((response) => response.json())
          .then((person) => {
            console.log(person);
          })
      }
    })
}
