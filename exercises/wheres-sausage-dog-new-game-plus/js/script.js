"use strict";

/*****************

Where's Sausage Dog?
Radhika Patel

Displays a large number of random animal images as well as
a single sausage dog image. The player needs to click on the
dog to win the game.

******************/
//starts off the game with the title
let state = `title`;
// Constants for image loading
const NUM_ANIMAL_IMAGES = 10;
const ANIMAL_IMAGE_PREFIX = `assets/images/animal`;
const SAUSAGE_DOG_IMAGE = `assets/images/sausage-dog.png`;

// Number of images to display
const NUM_ANIMALS = 100;

// Array of the loaded animal images
let animalImages = [];
// Array of animal objects
let animals = [];
// Loaded sausage dog image
let sausageDogImage;
// Sausage dog object
let sausageDog;

// preload()
// Loads all the animal images and the sausage dog image
function preload() {
  // Loop once for each animal image, starting from 0
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    // Load the image with the current number (starting from 0)
    let animalImage = loadImage(`${ANIMAL_IMAGE_PREFIX}${i}.png`);
    // Add the image to the array for use later when randomly selecting
    animalImages.push(animalImage);
  }

  // Load the sausage dog image
  sausageDogImage = loadImage(`${SAUSAGE_DOG_IMAGE}`);
}

// setup()
// Creates all the animal objects and a sausage dog object
function setup() {
  createCanvas(windowWidth, windowHeight);
  createAnimals();
  createSausageDog();
}

// createAnimals()
// Creates all the animals at random positions with random animal images
function createAnimals() {
  // Create the correct number of animals
  for (let i = 0; i < NUM_ANIMALS; i++) {
    // Create one random animal
    let animal = createRandomAnimal();
    // Add it to the animals array
    animals.push(animal);
  }
}

// createRandomAnimal()
// Create an animal object at a random position with a random image
// then return that created animal
function createRandomAnimal() {
  let x = random(0, width);
  let y = random(0, height);
  let animalImage = random(animalImages);
  let animal = new Animal(x, y, animalImage);
  return animal;
}

// createSausageDog()
// Creates a sausage dog at a random position
function createSausageDog() {
  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

// draw()
// Draws the background and calls the state functions
function draw() {
  background(255);
  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `end`) {
    end();
  }
}

// updates all animals and the sausage dog
function simulation() {
  updateAnimals();
  updateSausageDog();
}
// updateAnimals()
// Calls the update() method for all animals
function updateAnimals() {
  // Loop through all animals
  for (let i = 0; i < animals.length; i++) {
    // Update the current animal
    animals[i].update();
  }
}

// updateSausageDog()
// Calls the update() method of the sausage dog
function updateSausageDog() {
  sausageDog.update();
}

// mousePressed()
// Automatically called by p5 when the mouse is pressed.
// Call the sausage dog's mousePressed() method so it knows
// the mouse was clicked.
//change the state if the dog was found
//change the state if the player is on the title screen
function mousePressed() {
  sausageDog.mousePressed();
  if (sausageDog.found) {
    setTimeout(displayEnd, 3000);
  }
  //checks if the player clicked during the title screen to start
  if (state === `title`) {
    state = `simulation`;
  }
}

//changes the game state to the end
function displayEnd() {
  state = `end`;
}

//displays start screen text
function title() {
  push();
  textSize(84);
  textStyle(BOLD);
  fill(0);
  textAlign(CENTER, CENTER);
  text(`Where's the sausage dog?`, width / 2, height / 2);
  textSize(54);
  text(`Left click to start`, width / 2, height / 1.5);
  pop();
}

//displays end text
function end() {
  push();
  textSize(85);
  textStyle(BOLD);
  fill(0);
  textAlign(CENTER, CENTER);
  text(`Found him!`, width / 2, height / 2);
  pop();
}
