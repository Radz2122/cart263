"use strict";

/*****************

Slamina New Game+
Radhika Patel

A guessing game in which the page pronounces the name of an animal
backwards and the user has to figure out what it was and say the
name forwards.

******************/

// An array of animal names from
// https://github.com/dariusk/corpora/blob/master/data/animals/common.json
const animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];
//starts off the game with the title screen
let state = `title`;
const QUESTION_DELAY = 2000; // in milliseconds

// The current answer to display (we use it initially to display the click instruction)
let currentAnswer = `Click to begin.`;
// The current animal name the user is trying to guess
let currentAnimal = ``;
//counts the amount of points the player got
let points=0;
//checks if the player got the current answer when they click to go to the next
let gotAnswer=false;
//the amount of guesses the player needs to win
let amountToWin=20;

/**
Create a canvas
Set up annyang with the guessing command
Set text defaults
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Is annyang available?
  if (annyang) {
    // Create the guessing command
    let commands = {
      'I think it is *animal': guessAnimal
    };
    // Setup annyang and start
    annyang.addCommands(commands);
    annyang.start();
  }

  // Text defaults
  textSize(102);
  textStyle(BOLD);
  textAlign(CENTER);
}


/**
Display the current answer.
 */
function draw() {
  background(0);
  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `end`) {
    end();

  }
}

function simulation(){
    displayAnswer();
}

/**
Display the current answer in red if incorrect and green if correct
(Displays nothing if no guess entered yet)
*/
function displayAnswer() {
  if (currentAnswer === currentAnimal) {
    fill(0, 255, 0);
    gotAnswer=true;

  }
  else {
    fill(255, 0, 0);
  }
  text(currentAnswer, width / 2, height / 2);
  fill(100);
  text(points,width / 2, height /4);
}

/**
Reverse the animal name and say it with ResponsiveVoice
*/
function sayAnimalBackwards(animal) {
  let reverseAnimal = reverseString(animal);
  //make the voice talk slower to make it more difficult
  responsiveVoice.setDefaultRate(0.15);
  responsiveVoice.speak(reverseAnimal);
}

/**
Reverses the provided string
*/
function reverseString(string) {
  // Split the string into an array of characters
  let characters = string.split('');
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join('');
  // Return the result
  return result;
}

/**
Called by annyang when the user make a guess.
animal parameter contains the guess as a string.
Sets the answer text to the guess.
*/
function guessAnimal(animal) {
  // Convert the guess to lowercase to match the answer format
  currentAnswer = animal.toLowerCase();
}

/**
Reset the answer text, get a new random animal, say its name
*/
function nextQuestion() {
  if(state!==`end`){
    //add a point if the player guessed the answer
    if(gotAnswer){
      points++;
    }
    currentAnswer = ``;
    currentAnimal = random(animals);
    sayAnimalBackwards(currentAnimal);

    //reset gotAsnwer to false for the next question
    gotAnswer=false;

  }

}

/**
When the user clicks, go to the next question
*/
function mousePressed() {

  if (state === `title`) {
    state = `simulation`;
  }
  else if(state===`simulation` && points<amountToWin){
      nextQuestion();
  }
  else if(state===`simulation`&& points>=amountToWin){
      state=`end`;
    }
}
//title()
//displays start screen text
function title() {
  push();
  textSize(84);
  textStyle(BOLD);
  fill(100);
  textAlign(CENTER, CENTER);
  text(`Guess the animal`, width / 2, height / 2);
  textSize(54);
  text(`Left click to start`, width / 2, height / 1.5);
  pop();
}

//end()
//displays end text
function end() {
  push();
  textSize(85);
  textStyle(BOLD);
  fill(100);
  textAlign(CENTER, CENTER);
  text(`Congrats! You guessed all of them`, width / 2, height / 2);
  pop();
}
