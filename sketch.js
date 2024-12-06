let sceneNum = 0;
//let doubleClicks = 0;
let spiderImage = [];
let index = 0;
let web;
let webBoundary = [
  { x: 600, y: 2 },
  { x: 444, y: 98 },
  { x: 225, y: 135 },
  { x: 109, y: 143 },
  { x: 78, y: 256 },
  { x: 2, y: 326 },
  { x: 0, y: 0 },
];
let inside = false;
let i = 0;
let wiggleDuration = 0;
let isWiggling = false;
let spiderMoved = false;
let spiderPickedUp = false;
let trees;
let tree;

let video;
let handPose;
let hands = [];
let hand;
let domHand;
let nonDomHand;

let BalooThambi2;
let Gluten;
let txt;
let secondTextBlock1 = false;
let stubborn = false;
let secondTextBlock2 = false;
let previousMillis;
let shootingOnboard = true;
let threadLength1 = 0;
let blownAway = false;
let wind;
let windAligned = false;
let moveToCenter = false;
let threadLength2 = 0;
let tuning = false;
let heavedLength = 0;
let moveToLeftAnchor = false;
let diagonalLeft = false;
let makeRightAnchorThread = false;
let moveToRightAnchor = false;
let diagonalRight = false;
let moveToBottomAnchor = false;
let secondTextBlock3 = false;
let dying = false;
let secondTextBlock4 = false;

function preload() {
  for (let i = 0; i < 3; i++){
    spiderImage[i] = loadImage('spider_' + i + '.png');
  }
  web = loadImage("web.jpg");
  trees = loadImage("trees.png");
  tree = loadImage("tree.png");
  handPose = ml5.handPose({ flipped: true });
  wind = loadSound("wind.mp3");
  gluten = loadFont("Gluten.ttf");
  BalooThambi2 = loadFont("BalooThambi2.ttf");
}

function keyPressed() {
  //getting hand positions
  console.log(hands);
}

function mousePressed() {
  //for developing only
  sceneNum++;
}

// function keyPressed(){
//  //for developing only
//  doubleClicks++;
// }

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(window.innerWidth, window.innerWidth * 0.75);
  document.body.style.cursor = "none";
  spider = new Spider(95, 170);

  video = createCapture(VIDEO, { flipped: true });
  video.size(window.innerWidth, window.innerWidth * 0.75);
  video.hide();
  handPose.detectStart(video, gotHands);
}

function draw() {
  background(255);
  switch (sceneNum) {
    case 0:
      webTouched();
      spiderTouched();
      image(web, 0, 0);
      stroke(0);
      strokeWeight(0.1);
      textSize(25);
      textFont(BalooThambi2);
      push();
      rectMode(CENTER);
      textAlign(CENTER);
      text(
        "Use your dominant hand to interact with me",
        window.innerWidth / 2,
        window.innerHeight / 2, 
      );
      pop();

      if (i == 200 ||spiderTouched ()) {
        spider.fall();
      }

      if (isWiggling) {
        spider.wiggle();
        wiggleDuration--;
        if (wiggleDuration <= 0) {
          isWiggling = false;
        }
      } 
      else {
        spider.body();
      }
      if (spider.y >= window.innerHeight) {
        sceneNum = 1;
      }
      break;
    case 1:
      imageMode(CORNERS);
      image(trees, 0, 0, window.innerWidth, window.innerHeight);
      if (!spiderMoved) {
        spider.x = window.innerWidth/2;
        spider.y = window.innerHeight/2;
      }
      push();
      rectMode(LEFT);
      textAlign(LEFT);
      text(
        "I can't keep holding onto other spider webs. I need to learn how to build my own web… a place for myself. Let’s look for a spot for my web. Pinch your fingers to pick me up!",
        window.innerWidth / 10,
        window.innerHeight / 2,
        window.innerWidth / 3
      );
      pop();
      detectPinch(hand);
      imageMode(CENTER);
      image(spiderImage[index], spider.x, spider.y, 100, 100);
        if (frameCount % 10 == 0){
        if (index < 2){
          index++;
        } 
        else {
          index = 0;
        }
      if (spider.x >= window.innerWidth*3/4) {
        sceneNum = 2;
        //spiderMoved = false;
      }
        }
      break;
    case 2:
      // if(doubleClicks == 1){ //bridge the gap
      //   threadLength1 = window.innerWidth - 220;
      //   moveToCenter = true;
      //   blownAway = true;
      //   shootingOnboard = false;
      // }
      // else if(doubleClicks == 2){ //move to the center
      //   windAligned = false;
      //   imageMode(CENTER);
      //   image(spiderImage[index], window.innerWidth / 2, 110 + threadLength2, 100, 100);

      // }
      // else if(doubleClicks == 3){ //move to bottom
      // push();
      // strokeWeight(2);
      // stroke(0);
      // line(window.innerWidth / 2, 110 + heavedLength, window.innerWidth / 2, 110 + threadLength2);
      // pop();
      // moveToLeftAnchor = true;
      // }

      //tree, tree
      push();
      imageMode(CENTER);
      image(tree, 110, window.innerHeight/2, window.innerWidth/10, window.innerHeight);
      image(tree, window.innerWidth-110, window.innerHeight/2, window.innerWidth/10, window.innerHeight);
      pop();

      let isIndexFingerBent = detectBendingIndexFinger(hand);
      if (shootingOnboard) {
        if (isIndexFingerBent) {
          if (threadLength1 < window.innerWidth / 3) {
            threadLength1 += 4;
            txt = "The gap in between the branches looks like a perfect spot for my web! Spider silk requires both strength and elasticity. We will start with the stronger silk to build the anchor points & support threads. Bend the index finger of your non-dominant hand to shoot spider silk.";
            blownAway = false;
          } else {
            txt = "It seems that the wind isn’t in our favor! Straighten your index finger to stop shooting.";
            blownAway = true;
          }
        }
        if (!isIndexFingerBent) {
          if (threadLength1 > 0) {
            threadLength1 -= 4;
            txt = "It seems that the wind isn’t in our favor! Straighten your index finger to stop shooting.";
            blownAway = true;
          }
          if (threadLength1 == 0) {
            if (blownAway) {
              txt = "Now wait for the wind direction to align so that the breeze can take up the thread. Start shooting silk again to reach the other side.";
              shootingOnboard = false;
            } else {
              txt = "The gap in between the branches looks like a perfect spot for my web! Spider silk requires both strength and elasticity. We will start with the stronger silk to build the anchor points & support threads. Bend the index finger of your non-dominant hand to shoot spider silk.";
            }
          }
        }
      } 
      else {
        if (second() % 8 == 0 && threadLength1 == 0) {
          wind.play();
          windAligned = true;
        }
        if (windAligned && isIndexFingerBent) {
          if (threadLength1 < window.innerWidth - 220) {
            threadLength1 += 4;
            txt = "Look at you! Keep going!";
          } else {
            threadLength1 = threadLength1;
            txt = "We just successfully bridged the gap! Let’s move to the center of the silk strand and continue weaving our orb web!";
            moveToCenter = true;
          }
        }
        if (windAligned && !isIndexFingerBent && !moveToCenter) {
          txt = "You missed the wind! Remember to wait for the wind direction to align.";
          if (threadLength1 > 0) {
            threadLength1 -= 4;
          }
          if (threadLength1 == 0) {
            windAligned = false;
          }
        }
      }
      push();
      strokeWeight(1);
      stroke(0);
      line(110, 110, 110 + threadLength1, 110);
      pop();

      if (!moveToCenter) { //while shooting thread
        spider.x = 100;
        spider.y = 100
        image(spiderImage[index], spider.x, spider.y, 100, 100);
        if (frameCount % 10 == 0){
          if (index < 2){
            index++;
          } 
          else {
            index = 0;
          }
        } 
      }
      else { //start moving to the center
        windAligned = false;
        if (!moveToLeftAnchor){
          detectPinch(hand);
          //console.log(detectPinch(hand));
          if (spider.x < window.innerWidth / 2 - 30 || spider.x > window.innerWidth / 2 + 30){
            imageMode(CENTER);
            image(spiderImage[index], constrain(spider.x, 100, window.innerWidth - 100), 100, 100, 100);
            if (frameCount % 10 == 0){
              if (index < 2){
                index++;
              } 
              else {
               index = 0;
              }
            }
          }
          else if (spider.x > window.innerWidth / 2 - 30 && spider.x < window.innerWidth / 2 + 30) { //if at center
            imageMode(CENTER);
            image(spiderImage[index], window.innerWidth / 2, 110 + threadLength2, 100, 100);
            if (frameCount % 10 == 0){
              if (index < 2){
                index++;
              } 
             else {
                index = 0;
              }
            }
            detectBendingIndexFinger(hand);
            if (threadLength2 < window.innerHeight - 220) {
              txt = "Shoot a thread so that we can drop down until we reach the ground.";
              if (isIndexFingerBent) {
                threadLength2 += 4;
              }
            } 
            else {
              txt = "Well done! I have a feeling that the threads are a little loose…";
              threadLength2 = threadLength2;
              if (!secondTextBlock1){
                previousMillis = millis();
                secondTextBlock1 = true;
              }
              else{
                if (millis() - previousMillis >= 2000){
                  txt= "You don't believe me? Make the “cellphone” gesture to listen to the vibration yourself! With your non-dominant hand!";
                  } 
              }
            let cellPhone = detectCellphonePose(hand);
            let fingersCrossed = detectCrossingFingers(hand);
            if (cellPhone) {
              //play sound file
              stubborn = true; 
            }
            if (stubborn){
              txt = "Aren't you stubborn? Cross the fingers of your non-dominant hand to heave the thread. ";
            }
            if (heavedLength <= 100) {
              if (fingersCrossed) {
                heavedLength += 2;
              }
            } else {
              heavedLength = heavedLength;
              txt = "Not a bad job. Now we have a basic Y-shape. Time to add more anchor threads.";
              if (!secondTextBlock2){
                previousMillis = millis();
                secondTextBlock2 = true;
              }
              else{
                if (millis() - previousMillis >= 2000){
                  txt= "Shoot a thread and drag it to the left top anchor. Remember to use both of your hands!";
                  moveToLeftAnchor = true;
                  spiderMoved = false;
                  } 
              }
            }
            } 
          } 
        }
        else { //move to left anchor
          if (hands.length > 0) {
            for (let hand of hands) {
              if (hand.handedness == domHand){
                detectPinch(hand);
              }
              if (hand.handedness == nonDomHand){
                detectBendingIndexFinger(hand);
              }
            }
            } 
          if (!spiderMoved){
            imageMode(CENTER);
            spider.x = window.innerWidth / 2;
            spider.y = window.innerHeight - 110;
            image(spiderImage[1], spider.x, spider.y, 100, 100);
          }
          else { //if spider is moved
            if (!diagonalLeft) { //vertical dragging
              imageMode(CENTER);
              image(spiderImage[index], window.innerWidth / 2, constrain(spider.y, 110+heavedLength, window.innerHeight-110), 100, 100);
              if (frameCount % 10 == 0){
              if (index < 2){
                  index++;
                } 
               else {
                  index = 0;
                }
              }
              if (spider.y <= 110 + heavedLength + 5){ //ready for diagonal dragging
                diagonalLeft = true;
              }
            }
            if (diagonalLeft && !moveToRightAnchor){
              let m = (110 + heavedLength-110)/( window.innerWidth / 2 - 110);
              let b = 110 - m*110;
              let projectedX = (spider.x + m * (spider.y - b))/(1 + m * m);
              let projectedY = m * spider.x + b;
              imageMode(CENTER);
              image(spiderImage[index], constrain(projectedX, 110, window.innerWidth/2), constrain(projectedY, 110, 110+heavedLength), 100, 100);
              if (frameCount % 10 == 0){
              if (index < 2){
                  index++;
                } 
                else {
                 index = 0;
                }
              }
              if (projectedX <= 115){ //at left anchor
                txt = "Well done! Let's go to the right anchor. I'm sure you will find the shortcut!";
                moveToRightAnchor = true;
               }
              else if (projectedX > 115){
                //left anchor thread
                push();
                strokeWeight(1);
                stroke(0);
                line(window.innerWidth / 2, window.innerHeight - 110, constrain(projectedX, 110, window.innerWidth/2), constrain(projectedY, 110, 110+heavedLength));
                pop();
              }            
            }
            if(!detectBendingIndexFinger(hand)){
              txt = "Gotta keep the thread goin'";
              //console.log(detectBendingIndexFinger(hand), detectPinch(hand));
            }
            else{
              txt = "You are getting so close!";
            }
        }
        }
      // if (makeRightAnchorThread){
      //   if (!detectBendingIndexFinger() && (spider.x != window.innerWidth - 110)|| spider.y != window.innerHeight-110){
      //     txt = "Remember to keep shooting the thread!";
      //     //!!!!!add function so that spider cannot move
      //   } 
      // }
      if (moveToRightAnchor){
          //unchanged left anchor thread
          push();
          strokeWeight(1);
          stroke(0);
          line(window.innerWidth / 2, window.innerHeight - 110, 110, 110);
          pop();

          if (!diagonalRight){
            detectPinch(hand);
            imageMode(CENTER);
            image(spiderImage[index], constrain(spider.x, 110, window.innerWidth - 110), 110, 100, 100);
            if (frameCount % 10 == 0){
              if (index < 2){
               index++;
              } 
              else {
                index = 0;
            }
          }
          }

          if (spider.x >= window.innerWidth - 115){ //at right anchor
              txt = "Now shoot another thread and drag it to the bottom anchor.";
              diagonalRight = true;
          }
        }          
      if (diagonalRight){ 
          m = (110 -(heavedLength+110))/((window.innerWidth - 110)-window.innerWidth/2);
          b = heavedLength + 110 - m * window.innerWidth/2
          projectedX = (spider.x + m * (spider.y - b))/(1 + m * m);
          projectedY = m * spider.x + b
          if (projectedX >= window.innerWidth/2 +5){
            imageMode(CENTER);
            image(spiderImage[index], constrain(projectedX, window.innerWidth/2, window.innerWidth - 110), constrain(projectedY, 110, 110 + heavedLength), 100, 100);
            if (frameCount % 10 == 0){
            if (index < 2){
                index++;
              } 
              else {
                index = 0;
             }
            }
            //right anchor thread
            push();
            strokeWeight(1);
            stroke(0);
            line(window.innerWidth -110 , 110, constrain(projectedX, window.innerWidth/2, window.innerWidth - 110), constrain(projectedY, 110, 110+heavedLength));
            pop();
          }
          else {
            moveToBottomAnchor = true;
            //diagonalRight = false;
          }
        }
        if (moveToBottomAnchor){
            if (spider.y >= window.innerHeight-115){ //at bottom anchor
              imageMode(CENTER);
              image(spiderImage[index], window.innerWidth / 2, window.innerHeight-110, 100, 100);
              if (frameCount % 10 == 0){
              if (index < 2){
                 index++;
               } 
               else {
                 index = 0;
                }
              }
              push();
              strokeWeight(1);
              stroke(0);
              line(window.innerWidth - 110, 110, window.innerWidth/2, window.innerHeight-110);
              pop();
              txt = "I'm proud of myself for making this far.";
              if (!secondTextBlock3){
                previousMillis = millis();
                secondTextBlock3 = true;
              }
              else {
                if (millis() - previousMillis >=2000){
                  txt= "To provide more stability to the web, let's add more threads to the center of the web";
                  dying = true;
                  spiderMoved = false;
                  } 
              }            
            }
            else {
              imageMode(CENTER);
              image(spiderImage[index], window.innerWidth / 2, constrain(spider.y, 110+heavedLength, window.innerHeight-110), 100, 100);
              if (frameCount % 10 == 0){
              if (index < 2){
                index++;
              } 
              else {
                index = 0;
              }
            }
              push();
              strokeWeight(1);
              stroke(0);
              line(window.innerWidth - 110, 110, window.innerWidth/2, constrain(spider.y, 110+heavedLength, window.innerHeight-110));
              pop();
            }
          }

      if (dying){
        //right thread
        push();
        strokeWeight(1);
        stroke(0);
        line(window.innerWidth - 110, 110, window.innerWidth/2,  window.innerHeight-110);
        pop();
        detectPinch(hand);
        if (!spiderMoved){
          imageMode(CENTER);
          image(spiderImage[0], window.innerWidth / 2, window.innerHeight-110, 100, 100);
        }
        else{
          moveToBottomAnchor = false;
          if (spider.y > 110 + heavedLength + 5){
            if(spider.y <= window.innerHeight/2){
              txt = "I have to try harder."
            }
            else{
              txt = "Why am I crawling this slowly?";
            }
            imageMode(CENTER);
            image(spiderImage[index], window.innerWidth / 2, spider.y, 100, 100);
            if (frameCount % 10 == 0){
            if (index < 2){
              index++;
            } 
            else {
              index = 0;
            }
          }
        }
          else if (spider.y <= 110 + heavedLength + 5 && spider.y >= 110 + heavedLength - 5) {
            txt = "I'm stuck in my own web";
            if (!secondTextBlock4){
              secondTextBlock4 = true;
              previousMillis = millis();
           }
            else{
              if (detectBendingIndexFinger(hand) == true){
                txt = "I don't have more silk to shoot. Stop trying."
              }
              if (detectCellphonePose(hand) == true){
                txt = "There is no use listening to the vibrations. Stop trying.";
          }
          if (detectCrossingFingers(hand) == true){
            txt = "I don't have any strength to heave the thread. Stop trying.";
          }
          if (millis() - previousMillis >= 5000){
            txt = "There is no point in trying. I'm going to rot and die alone on this web."
            if (detectBendingIndexFinger(hand) == false && detectCellphonePose(hand) == false && detectPinch(hand) == false && detectCrossingFingers(hand) == false){
              sceneNum = 3;
            }
          }
          } 
        }
        }
      }
      //heaved threads
      push();
      strokeWeight(1);
      stroke(0);
      line(110, 110, window.innerWidth / 2, 110 + heavedLength);
      line(window.innerWidth - 110,110, window.innerWidth / 2, 110 + heavedLength);
      pop();
      
      //vertical thread
      push();
      strokeWeight(1);
      stroke(0);
      line(window.innerWidth / 2, 110 + heavedLength, window.innerWidth / 2, 110 + threadLength2);
      pop();
  }

      //text
      stroke(0);
      strokeWeight(0.1);
      textAlign(LEFT);
      rectMode(CENTER);
      text(
        txt,
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerWidth / 2
      );
      break;
    case 3:
      //txt = "Blink to see more clearly."
      background(0);
      stroke(255);
      strokeWeight(0.1);
      textAlign(LEFT);
      textFont(BalooThambi2);
      textSize(100);
      rectMode(CENTER);
      text(
        txt,
        window.innerWidth / 2,
        window.innerHeight / 2,
        (window.innerWidth * 3) / 4
      );
  }
}


class Spider {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  body() {
    if (frameCount % 10 == 0){
      if (index < 2){
        index++;
      } 
      else {
        index = 0;
      }
    }
    spiderImage[index].resize(100, 100);
    image(spiderImage[index], this.x, this.y);
  }

  wiggle() {
    let wiggleOffsetX = (noise(frameCount * 0.05) - 0.5) * 20; // amplitude=20
    let wiggleOffsetY = (noise(frameCount * 0.05 + 1000) - 0.5) * 20;

    image(spiderImage[index], this.x + wiggleOffsetX, this.y + wiggleOffsetY);
    if (frameCount % 10 == 0){
    if (index < 2){
      index++;
    } 
    else {
      index = 0;
    }
}
  }

  fall() {
    this.y += 8;
    image(spiderImage[index], this.x, this.y);
    if (frameCount % 10 == 0){
    if (index < 2){
      index++;
    } 
    else {
      index = 0;
    }
}
  }
}

function webTouched() {
  if (hands.length > 0) {
    for (let hand of hands){
    noStroke();
    fill(0, 0, 0);
    circle(hand.index_finger_tip.x, hand.index_finger_tip.y, 5);
    domHand = hand.handedness;
    if (domHand == "Right"){
      nonDomHand = "Left";
    }
    else {
      nonDomHand = "Right";
    }
    let index = hand.index_finger_tip;
    let x = index.x;
    let y = index.y;
    for (
      let i = 0, j = webBoundary.length - 1;
      i < webBoundary.length;
      j = i++
    ) {
      let xi = webBoundary[i].x,
        yi = webBoundary[i].y;
      let xj = webBoundary[j].x,
        yj = webBoundary[j].y;

      let intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    if (inside && i < 200) {
      i++;
      isWiggling = true;
      wiggleDuration = 30;
      console.log("Web touched");
    }
  }
  }
    return inside;
}

function spiderTouched() {
  if (hands.length > 0) {
    for (let hand of hands){
    noStroke();
    fill(0, 0, 0);
    circle(hand.index_finger_tip.x, hand.index_finger_tip.y, 5);
    if (domHand == hand.handedness){
    let index = hand.index_finger_tip;
    if (index.x >= 125 && index.x <= 165 && index.y >= 200 && index.x <= 240) {
      i = 200;
      return true;
    }
  }
}
}
  return false;
}

function detectPinch(hand) {
  if (hands.length > 0) {
    for (let hand of hands){
    if (domHand == hand.handedness){
    noStroke();
    fill(0, 0, 0);
    circle(hand.index_finger_tip.x, hand.index_finger_tip.y, 5);
    circle(hand.thumb_tip.x, hand.thumb_tip.y, 5);
    let d = dist(
      hand.index_finger_tip.x,
      hand.index_finger_tip.y,
      hand.thumb_tip.x,
      hand.thumb_tip.y
    );
    let distToIndex = dist(
      hand.index_finger_tip.x,
      hand.index_finger_tip.y,
      spider.x,
      spider.y
    );
    let distToThumb = dist(
      hand.thumb_tip.x,
      hand.thumb_tip.y,
      spider.x,
      spider.y
    );
    if (d <= 65 && (distToIndex <= 65 || distToThumb <= 65)) {
      if (moveToLeftAnchor){
        if (detectBendingIndexFinger(hand)){
          spider.x = (hand.index_finger_tip.x + hand.thumb_tip.x) / 2;
          spider.y = (hand.index_finger_tip.y + hand.thumb_tip.y) / 2;
          spiderMoved = true;
          return true;
        }
      }
      else{
        spider.x = (hand.index_finger_tip.x + hand.thumb_tip.x) / 2;
        spider.y = (hand.index_finger_tip.y + hand.thumb_tip.y) / 2;
        spiderMoved = true; 
        return true;
      }
    }
  }
}
  }
  return false;
}


function detectBendingIndexFinger(hand) {
  if (hands.length > 0) {
    for (let hand of hands){
    if (nonDomHand == hand.handedness){
    noStroke();
    fill(0, 0, 0);
    circle(hand.index_finger_tip.x, hand.index_finger_tip.y, 5);
    let d56 = dist(
      hand.index_finger_mcp.x,
      hand.index_finger_mcp.y,
      hand.index_finger_pip.x,
      hand.index_finger_pip.y
    );
    let d67 = dist(
      hand.index_finger_pip.x,
      hand.index_finger_pip.y,
      hand.index_finger_dip.x,
      hand.index_finger_dip.y
    );
    let d78 = dist(
      hand.index_finger_dip.x,
      hand.index_finger_dip.y,
      hand.index_finger_tip.x,
      hand.index_finger_tip.y
    );

    let totalDist = d56 + d67 + d78;
    let directDist = dist(
      hand.index_finger_mcp.x,
      hand.index_finger_mcp.y,
      hand.index_finger_tip.x,
      hand.index_finger_tip.y
    );
    return totalDist > 1.5 * directDist;
  }
}
  }
  return false;
}

function detectCellphonePose(hand) {
  if (hands.length > 0) {
    for (let hand of hands){
    if (nonDomHand == hand.handedness){
    noStroke();
    fill(0, 0, 0);
    circle(hand.index_finger_tip.x, hand.index_finger_tip.y, 5);
    circle(hand.middle_finger_tip.x, hand.middle_finger_tip.y, 5);
    circle(hand.ring_finger_tip.x, hand.ring_finger_tip.y, 5)
    let indexDist = dist(
      hand.index_finger_tip.x,
      hand.index_finger_tip.y,
      hand.wrist.x,
      hand.wrist.y
    );

    let middleDist = dist(
      hand.middle_finger_tip.x,
      hand.middle_finger_tip.y,
      hand.wrist.x,
      hand.wrist.y
    );

    let ringDist = dist(
      hand.ring_finger_tip.x,
      hand.ring_finger_tip.y,
      hand.wrist.x,
      hand.wrist.y
    );

    let threshold = 230;
    if (
      indexDist < threshold &&
      middleDist < threshold &&
      ringDist < threshold
    ) {
      return true;
    }
  }
}
}
  return false;
}

function detectCrossingFingers(hand) {
  if (hands.length > 0) {
    for (let hand of hands){
    if (nonDomHand == hand.handedness){
    noStroke();
    fill(0, 0, 0);
    circle(hand.index_finger_tip.x, hand.index_finger_tip.y, 5);
    circle(hand.middle_finger_tip.x, hand.middle_finger_tip.y, 5);
    let distance = dist(
      hand.index_finger_tip.x,
      hand.index_finger_tip.y,
      hand.middle_finger_tip.x,
      hand.middle_finger_tip.y
    );
    if (distance < 25) {
      return true;
    }
  }
}
  }
  return false;
}
