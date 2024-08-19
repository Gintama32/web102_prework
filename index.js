/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i=0; i<games.length; i++){
        const dv = document.createElement('div');
        dv.classList.add('game-card');
        dv.innerHTML = `
        <img src = "${games[i].img}"class= "game-img" />
        <h2>${games[i].name}</h2> 
        <p>${games[i].description}</p>.
        <p>Backers: ${games[i].backers}</p>
        `;
        gamesContainer.appendChild(dv);
    }

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}
addGamesToPage(GAMES_JSON)
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const contributors = GAMES_JSON.reduce((p,n)=>{
    return p + n.backers;
},0)
;
contributionsCard.innerHTML= `
                            <p>${contributors.toLocaleString('en-US')}</p>
                            `
// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const moneyRaised = GAMES_JSON.reduce((p,n)=>{
    return p + n.pledged;
},0)
;
// set inner HTML using template literal
raisedCard.innerHTML = `
                        <p>${moneyRaised.toLocaleString('en-US')}</p>
`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGame = GAMES_JSON.reduce((p,n)=>{
    return p + 1;
},0)
;
// set inner HTML using template literal
gamesCard.innerHTML = `
                        <p>${totalGame.toLocaleString('en-US')}</p>
`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have not yet met their goal
    const unfunded = GAMES_JSON.filter((game)=>{
        return game.goal>game.pledged;
        
    });
    addGamesToPage(unfunded);
    }

    // use the function we previously created to add the unfunded games to the DOM
// show only games that are fully funded
function filterFundedOnly() {

    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let funded = GAMES_JSON.filter((game)=>{
        return game.goal<= game.pledged;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(funded);
}
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
//bonus functionality js code to link nav items to link with the different kind of games based on funding
const all_games_link = document.getElementById('all-games-link')
const unfunded_games_link = document.getElementById('unfunded-games-link')
const funded_games_link = document.getElementById('funded-games-link')
unfunded_games_link.addEventListener("click", filterUnfundedOnly);
funded_games_link.addEventListener("click", filterFundedOnly);
all_games_link.addEventListener("click",showAllGames);
// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click",showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let num_unfundedgames = GAMES_JSON.reduce((acc,game)=>{
  if (game.pledged<game.goal){
    return acc + 1;
  }
  return acc;
},0);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = 
                    `A total of ${moneyRaised.toLocaleString('en-US')} has been raised for ${totalGame} games. Currently, ${num_unfundedgames} ${num_unfundedgames===1? 'game':'games'} remain
                    unfunded. We need your help to fund these amazing games!`;
console.log(displayStr);
// create a new DOM element containing the template string and append it to the description container
let str_div = document.createElement('div');
str_div.innerHTML = `<p>${displayStr}</p>`;
descriptionContainer.appendChild(str_div);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [first_game, second_game,..._] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const top_pledged = document.createElement('div');
const second_pledged = document.createElement('div');
top_pledged.innerHTML = `
                        <h2>${first_game.name}</h2>
                        `
firstGameContainer.appendChild(top_pledged);
// do the same for the runner up item
second_pledged.innerHTML = `
                        <h2>${second_game.name}</h2>
                        `
secondGameContainer.appendChild(second_pledged);