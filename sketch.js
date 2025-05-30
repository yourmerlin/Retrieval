// Merlin Enriquez
// Final Project
// Mentor: Ilia Urgen
// Title: Retrieval 
// USE LOCALHOST !!!

//imgs & particles
let selfies = []; // to hold all my selfies
let pixelsArray = []; // to hold all my pixels
let particles = []; // to hold all my particles
let IndexCounter = 0; // tracks my images 
let particleCount = 100000; // # of particles on each img (helped to minimize browser from crashing)

let birthdaySong;

//script 
let currentText = 0;
let lastChangeTime = 0;
let changeInterval = 6000;
let script = [
    'Birthdays used to feel trivial and even burdensome',
    'rather than a celebration',
    'I never looked forward to mine',
    ',questioning why it should be celebrated',
    'simply because I had made it through another year',
    'That all changed when I turned 20.',
    'I began to realize that birthdays are milestones',
    'markers of survival',
    'There were many times I thought I wouldnt make it this far',
    'especially after surviving 8 suicide attempts',
    'during some of the darkest periods of my life',
    'Now, I am deeply grateful to be alive',
    'I see birthdays as a celebration of survival',
    'A reminder that despite the challenges',
    'I am still here.',
    'My mental health has often been,',
    'the deciding factor in my journey',
    'but I am still standing.',
    'Birthdays will continue to be my favorite holiday,',
    'because it is a day to remind myself that',
    'I survived :)'
    ]


function preload() {
    birthdaySong = loadSound("http://localhost:8000/birthdaysong.wav");
    pictures();  
}

function setup() {
    createCanvas(400, 400);
    background(220);
    frameRate(128);

    birthdaySong.setVolume(0.25);
    selfieSelection(IndexCounter);
    
}
function selfieSelection(index){ //makes the pixels into particles 

    particles = [];

    let currentSelfie = selfies[index];
    currentSelfie.img.loadPixels();

    for (let i = 0; i < particleCount; i++){ // limits the amount of pixels = particles (to reduce lag)
        let x = floor(random(currentSelfie.img.width));
        let y = floor(random(currentSelfie.img.height));
          let index = (y * currentSelfie.img.width + x) * 4; 

            let r = currentSelfie.img.pixels[index];
            let g = currentSelfie.img.pixels[index + 1];
            let b = currentSelfie.img.pixels[index + 2];

            let px = x * (width / currentSelfie.img.width);
            let py = y * (height / currentSelfie.img.height);

           let particle = makeParticle(px, py, random(-0.5,1.0),random(-0.5,1),color(r, g, b));
           particles.push(particle);
    }

}

function draw() {
    background(220);
    checkParticles(50,50);
    click();
    scriptDisplay(10, 350);  
}

function click(){
    fill(0,0,0);
    stroke(0.25);
    textFont('Courier New');
    textSize(11);
    text('Click to hear birthday Song!', 110, 30)
};

function scriptDisplay(x, y){
    fill(0,0,0);
    stroke(0.25);
    textFont('Courier New');
    textSize(11);
    text(script[currentText], x, y);

//check if the timing for script change to display is accurate 
    let currentTime = millis();
    if (currentTime - lastChangeTime >= changeInterval){
        lastChangeTime = currentTime;
        changeText();
    }
}

function changeText(){
    currentText++;
    if (currentText >= script.length){
        currentText = 0;
    }
}

function mousePressed(){
    birthdaySong.play();

}
