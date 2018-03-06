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

function fetchMovie(){
  const url = 'https://ghibliapi.herokuapp.com/films/0440483e-ca0e-4120-8c50-4c8cd9b965d6';
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      console.log(data);
    })
}