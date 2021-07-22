// README
/*
<Break/Inspo/Focus Student Set: BrInFo>              
 BY: Tuka Alarbi
 TYPE: School Project
           
 INSTRUCTIONS
 
 <My program is designed as a multi-functional program. 
 The first screen displays the main page, there's three other screens that are accessed
 through the main page by clicking the boxes. The first one is a game with the goal for the student
 to avoid the geese and get to class before the time ends as the time marks the time
 left for the class to start. The student is moved with key arrows, the game can be
 restarted with the 'r' key, and the main page is accessed with key letter 'm' to switch to
 the other screens. The second screen, has the objective of displaying uwaterloo 
 quotes for student inspirations. On that screen, each time the button on the left
 is pressed, new quote is randomly selected and displayed on the right. The last one
 is a "Focus timer" for 25 minutes with the display of current time, and it starts as soon as 
 the screen box option is clicked, just as the game, it is restarted with 'r' key and paused if 
 swithced to the Main page with the 'm' key.>
 
 REFRENCE                     
 <Quote images from @uwaterloolife instagram account>
 https://www.instagram.com/uwaterloolife/?hl=en  
 
 */

let currentScreen;

// Main page variables
let rectY = [];
let rectX;
let rectW;
let rectH;
let BoxClick;

// AvoidGeese game variables and arrays
let imgG = [];
let geeseNum = 25;
let geeseX = [];
let geeseY = [];
let geeseSpeed = [];
let geeseSize = [];

let studentX;
let studentY;
let S;

let time;
let GameOver;
let attempt;
let KeyClick;
let Reached;
let Missed;

// RandomeUWQoutes variables
let ButtonX;
let ButtonY;
let ButtonS;
let ButtonClick;

let imgQ;
let Q;
let img_1;
let img_2;
let img_3;
let img_4;
let img_5;
let img_6;
let img_7;
let img_8;
let img_9;
let img_10;
let img_11;
let img_12;
let img_13;
let img_14;
let img_15;
let img_16;
let img_17;
let img_18;
let img_19;
let img_20;
let img_21;
let img_22;
let img_23;
let img_24;
let img_25;

//FocusTicks variables
let timerSec;
let timerMin;
let ding;

function preload() {
  for (let i = 0; i < geeseNum; i++) {
    imgG[i]= loadImage("data/goose.png");
  }

  // Quote images                                        
  img_1 = loadImage("data/img_1.jpg");
  img_2 = loadImage("data/img_2.jpg");
  img_3 = loadImage("data/img_3.jpg");
  img_4 = loadImage("data/img_4.jpg");
  img_5 = loadImage("data/img_5.jpg");
  img_6 = loadImage("data/img_6.jpg");
  img_7 = loadImage("data/img_7.jpg");
  img_8 = loadImage("data/img_8.jpg");
  img_9 = loadImage("data/img_9.jpg");
  img_10 = loadImage("data/img_10.jpg");
  img_11 = loadImage("data/img_11.jpg");
  img_12 = loadImage("data/img_12.jpg");
  img_13 = loadImage("data/img_13.jpg");
  img_14 = loadImage("data/img_14.jpg");
  img_15 = loadImage("data/img_15.jpg");
  img_16 = loadImage("data/img_16.jpg");
  img_17 = loadImage("data/img_17.jpg");
  img_18 = loadImage("data/img_18.jpg");
  img_19 = loadImage("data/img_19.jpg");
  img_20 = loadImage("data/img_20.jpg");
  img_21 = loadImage("data/img_21.jpg");
  img_22 = loadImage("data/img_22.jpg");
  img_23 = loadImage("data/img_23.jpg");
  img_24 = loadImage("data/img_24.jpg");
  img_25 = loadImage("data/img_25.jpg");

  // Sounds
  BoxClick = loadSound("data/BoxClick.mp3");
  ButtonClick = loadSound("data/ButtonClick.wav");
  KeyClick = loadSound("data/KeyClick.mp3");
  Reached = loadSound("data/Reached.mp3");
  Missed = loadSound("data/Missed.mp3");
  ding = loadSound("data/ding.mp3");
}

function setup() {
  createCanvas(850, 480);
  // Call user-defined function to initialize variables and arrays
  initialization();
}

function draw() {
  textSize(24);
  textAlign(CENTER);

  // Call the user defined functions and diplay when assigned screen is called
  if (currentScreen === 0) {
    MainPage();
  } else if (currentScreen === 1) {
    avoidGeese();
  } else if (currentScreen === 2) {
    randomUWQoutes();
  } else if (currentScreen === 3) {
    focusTicks();
  } else {
    currentScreen = 0;
  }
}

function initialization() {
  // Main page option boxes variables initialization
  rectX = 212.5;
  rectW = 425;
  rectH = 50;

  // AvoidGeese game variables and arrays initialization
  studentX = width/2;
  studentY = height - 15;
  S = 15;

  time = 0;
  GameOver = false;
  attempt = 3;

  for (let i = 0; i < geeseNum; i++) {
    geeseSize[i] = int(random(300, 400)/(geeseNum));    
    geeseX[i] = 0 ;
    geeseY[i] = (geeseSize[i] * i) + (geeseSize[i] + 20);
    geeseSpeed[i] = random(0.5, 3);
  }

  // RandomUWQuotes variables initialization
  ButtonX = (width/5) + 18;
  ButtonY = height/2;
  ButtonS = (width/5) - 10;

  // Array for the Quote images  
  Q = int(random(25));
  imgQ = [img_1, img_2, img_3, img_4, img_5, img_6, 
    img_7, img_8, img_9, img_10, img_11, img_12, img_13, img_14, 
    img_15, img_16, img_17, img_18, img_19, img_20, img_21, img_22, 
    img_23, img_24, img_25];

  // focusTicks (timer) variables initialization
  timerSec = 60;
  timerMin = 25;
}

function mousePressed () { 
  for (let i = 0; i < 3; i++) {
    // The screens are changed via the boxes, only when the main page is displayed
    if (currentScreen === 0) { 
      // Click box for desired screen (Box/rect hit test)
      if (mouseX >= rectX && mouseX <= rectX + rectW &&
        mouseY >= rectY[i]  && mouseY <= rectY[i] + rectH) {  
        BoxClick.play();
        currentScreen = i + 1;
      }
    }
  }

  // The button functions only when the second screen is displayed
  if (currentScreen === 2) { 
    // Each time the button is clicked, randomly select and display one quote (Button hit-test)
    if (Button(mouseX, mouseY, ButtonX, ButtonY, ButtonS/2)) {                    
      ButtonClick.play();
      Q = int(random(25));
    }
  }
}

function keyPressed() {
  KeyClick.play();
  if (key === "m" || key === "M") { // Access the main page
    currentScreen = 0;
  } else if (key === "r" || key === "R") { // Restart avoidGeese game
    initialization();
  } 

  // Student is moved only when the game is on
  if (GameOver === false) { 
    // Move student with key arrows
    if (keyCode === DOWN_ARROW) {
      studentY = constrain(studentY + 10, 0, height - 12);
    } else if (keyCode === UP_ARROW) {
      studentY -= 10;
    } else if (keyCode === RIGHT_ARROW) {
      studentX = constrain(studentX + 10, 382, 450);
    } else if (keyCode === LEFT_ARROW) {
      studentX = constrain(studentX - 10, 382, 450);
    }
  }
}

function MainPage() {
  background(0);
  for (let i = 0; i < 3; i++) {
    rectY[i] = 100 + i*100;
    // Draw the boxes to access the screens
    fill("yellow");
    rect(rectX, rectY[i], rectW, rectH);

    // Display the screen names on their designated box 
    stroke("#8c6f8d"); 
    fill("#b0e0e6");
    text("Avoid Geese To Get To Class", rectX + 200, rectY[0] + 28);
    text("Get UWaterloo Inspiring Quotes", rectX + 210, rectY[1] + 28);
    text("FocusTicks (Focus Timer)", rectX + 220, rectY[2] + 28);
  }
}

function focusTicks() {   
  background("#ffff00");
  fill(0);

  // Display current Time
  let Hour = hour();
  let Minute = minute();
  let Second = second();
  textSize(22);
  text("CURRENT TIME:", 130, height - 80);
  textSize(35);
  text(Hour + ": ", 90, height - 40);
  text(Minute + ": ", 145, height - 40);
  text(Second, 190, height - 40);

  // Display timer
  textSize(100);
  text(timerSec, width / 2 + 60, height / 2);
  text(timerMin + ":", width / 2 - 75, height / 2);

  // Start timer
  if (frameCount % 60 === 0 && timerSec > 0) {
    timerSec--;
  }     
  // Decrease minute as second reaches zero and reset seconds
  if (timerSec === 0) {
    timerMin --;
    timerSec = 60;
  }
  // If timer ends diplay 
  if (timerMin === 0 && timerSec === 0) {
    ding.play();
    timerSec = 0;
    timerMin = 0;
  }
}

function avoidGeese() {  
  // Draw the Field                                                 
  background("#ccff00");
  fill("#c6e2ff");
  rect(0, 150, width, height/3);

  // Draw the road for student to get to class/door step
  fill(125);
  rect((width/2) - 50, 80, 85, height);

  // Draw Class/door step
  fill("#411f16");
  arc((width/2) - 10, 0, 245, 185, 0, PI);
  rect(0, 0, width, 50);
  fill("#fff0f5");
  arc((width/2) - 5, 0, 150, 100, 0, PI);

  // Display and perform the following only when the game is on
  if (GameOver === false) { 
    // Draw and move the geese 
    for (let i = 0; i < geeseNum; i++) {
      image(imgG[i], geeseX[i], geeseY[i], geeseSize[i] + 20, geeseSize[i] + 20);
      geeseX[i] += geeseSpeed[i];

      // Reset geese when they reach the end of canvas (geese hit test)
      if (geeseX[i] >= width) {
        geeseSize[i] = int(random(300, 400)/(geeseNum));
        geeseX[i] = 0;
        geeseY[i] = (geeseSize[i] * i) + (geeseSize[i] + 20);
        geeseSpeed[i] = random(0.5, 2.5);
      }

      // If student touches geese; (student and geese hit test)                 
      if (geeseX[i] >= studentX - 14 &&  // Left Arm
        geeseX[i] <= studentX - 14 + (S - 9.5) && 
        geeseY[i] >= studentY - 38 &&
        geeseY[i] <= studentY - 38 + (S + 10) ||
        // Body
        geeseX[i] >= studentX - 10 &&  
        geeseX[i] <= studentX - 10 + (S + 5) && 
        geeseY[i] >= studentY - 42.5 &&
        geeseY[i] <= studentY - 42.5 + (S + 10) ||
        // Left Leg
        geeseX[i] >= studentX && 
        geeseX[i] <= studentX + (S - 10) && 
        geeseY[i] >= studentY - 50 &&
        geeseY[i] <= studentY - 50 + (S + 6)) {
        // Student goes back to the start, and loses one attempt
        attempt--;

        // Reset student position after hit
        studentX = width/2;
        studentY = height - 15;
      }
    }
  }
  drawStudent();
  endGame();
}

function drawStudent() {
  fill("#fff68f");
  noStroke();
  ellipse(studentX, studentY - 50, S, S, 9); // Head
  rect(studentX - 10, studentY - 42.5, S + 5, S + 10, 6); // Body
  rect(studentX - 9.5, studentY - 20, S - 10, S + 6, 5); // Legs
  rect(studentX + 4, studentY - 20, S - 10, S + 6, 5);
  rect(studentX - 14, studentY - 38, S - 9.5, S + 10, 8); // Arms  
  rect(studentX + 8, studentY - 38, S - 9.5, S + 10, 8);

  // Draw attempts of student label
  fill(245, 245, 220, 150);
  rect(0, 5, 135, 40);
  fill("#ffff66");
  textSize(18);
  text("Attempts Left: " + attempt, 65, 30);
}

function endGame() {
  // Timer until class starts 
  fill("#cce0eb");
  rect(0, height - 10, width, 10);
  fill('#460046');
  rect(0, height - 10, time, 9);
  time = time + 1;

  // End the game if either of the following conditions are met

  // If time is up, and student did not reach class (line hit-test)
  let MAX_TIME = width;
  if (time > MAX_TIME && studentY + 44 >= 97) { 
    GameOver = true;
    Missed.play();

    // Display the message
    background('#3ca9d0');
    fill(255);
    text("FAIL! Time is up.", width/2, (height/2) - 50);
    text("You MISSED class!", width/2, height/2);
    text("Press R to restart or M to get to main page.", width/2, height/2 + 50);
  } 

  // If student reached class (student hit-test)
  if (studentY + 44 <= 97) { 
    GameOver = true;
    time = 0;
    Reached.play();

    // Display the message
    background('#003366');
    fill(255);
    text("SUCCESS!", width/2, (height/2) - 50);
    text("You REACHED class!", width/2, height/2);
    text("Press R to restart or M to get to main page.", width/2, height/2 + 50);
  }

  // If all attempts are used
  if (attempt === 0) {
    GameOver = true;
    Missed.play();

    // Display the message
    background('#3ca9d0');
    fill(255);
    text("FAIL! All attempts were used.", width/2, (height/2) - 50);
    text("You MISSED class!", width/2, height/2);
    text("Press R to restart or M to get to main page.", width/2, height/2 + 50);
  }
}

function randomUWQoutes() {
  background("#8a2be2");

  // Draw image border
  noStroke();
  fill("#6ee6ee");
  rect((width/2)-30, 40, 400, 400);

  // Draw the button
  fill("#081697");
  ellipse(ButtonX, ButtonY, ButtonS, ButtonS);
  fill(255);
  text("Press To", ButtonX, ButtonY - 30);
  text("Get Inspiring", ButtonX, ButtonY);
  text("UW Quote", ButtonX, ButtonY + 30);

  // Draw the quote images
  image(imgQ[Q], (width/2) + 14, 83, 23 + (imgQ[Q].width/2) + 23, 30 + (imgQ[Q].height/2) + 30);
}

function Button(pX, pY, cX, cY, R) {
  // Calculate the distance between the mouse position and the center of the button
  let Distance = dist(pX, pY, cX, cY);
  // The Button is clicked if the mouse is inside the circle (Button hit-test)
  if (Distance <= R) {
    return true;
  } else {
    return false;
  }
}
