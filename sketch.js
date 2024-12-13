let sceneNum = 0;
let spiderUpImage = [];
let spiderDownImage = [];
let spiderLeftImage = [];
let spiderRightImage = [];
let spiderDiagonalLeftImage = [];
let spiderDiagonalRightImage = [];
let index = 0;
let web;
let webBoundary = [
  { x: 0, y: 840/874*window.innerHeight },
  { x: 224/1710*window.innerWidth, y: 664/874*window.innerHeight },
  { x: 615/1710*window.innerWidth, y: 349/874*window.innerHeight },
  { x: 1069/1710*window.innerWidth, y: 232/874*window.innerHeight },
  { x: 1452/1710*window.innerWidth, y: 78/874*window.innerHeight },
  { x: 1620/1710*window.innerWidth, y: 2/874*window.innerHeight },
  { x: 79/1710*window.innerWidth, y: 312/874*window.innerHeight },
  { x: 0, y: 0 },
];
let inside = false;
let i = 0;
let wiggleDuration = 0;
let isWiggling = false;
let spiderMoved = false;
let spiderPickedUp = false;
let seeking;

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
let stuck = false;
let secondTextBlock5 = false;
let lastUpdateTime = 0; 
let dyingUpdateInterval = 500;

function preload() {
  for (let i = 0; i < 3; i++){
    spiderUpImage[i] = loadImage('spider_up_' + i + '.png');
    spiderDownImage[i] = loadImage('spider_down_' + i + '.png');
    spiderLeftImage[i] = loadImage('spider_left_' + i + '.png');
    spiderRightImage[i] = loadImage('spider_right_' + i + '.png');
    spiderDiagonalLeftImage[i] = loadImage('spider_diagonal_left_' + i + '.png');
    spiderDiagonalRightImage[i] = loadImage('spider_diagonal_right_' + i + '.png');
  }
  web = loadImage("web.png");
  landscape = loadImage("background.png");
  seeking = loadImage("seeking.png");
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
  // sceneNum++;
  console.log(mouseX, mouseY);
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
  //document.body.style.cursor = "none";
  spider = new Spider(180, 240);

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
      image(web, 0, 0, window.innerWidth, window.innerHeight);
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
      image(seeking, 0, 0, window.innerWidth, window.innerHeight);
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
      image(spiderRightImage[index], spider.x, spider.y, 100, 100);
        if (frameCount % 10 == 0){
        if (index < 2){
          index++;
        } 
        else {
          index = 0;
        }
      if (spider.x >= window.innerWidth*3/4) {
        sceneNum = 2;
      }
        }
      break;
    case 2:
      push();
      imageMode(CENTER);
      image(landscape, window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight);
      pop();

      let isIndexFingerBent = detectBendingIndexFinger(hand);
      if (shootingOnboard && !dying) {
        if (isIndexFingerBent) {
          if (threadLength1 < window.innerWidth / 2 - 226/1710*window.innerWidth) {
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
          if (threadLength1 < 1484/1710*window.innerWidth - 226/1710*window.innerWidth) {
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
      line(226/1710*window.innerWidth, 158/874*window.innerHeight, 226/1710*window.innerWidth + threadLength1, 158/874*window.innerHeight);
      pop();

      if (!moveToCenter && !dying) { //while shooting thread
        spider.x = 226/1710*window.innerWidth;
        spider.y = 158/874*window.innerHeight;
        imageMode(CENTER);
        image(spiderLeftImage[index], spider.x, spider.y, 100, 100);
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
        if (!moveToLeftAnchor && !dying){
          detectPinch(hand);
          if (spider.x < window.innerWidth / 2 - 20 || spider.x > window.innerWidth / 2 + 20){
            txt = "Let’s move to the center of the silk strand and continue weaving our orb web!";
            imageMode(CENTER);
            image(spiderRightImage[index], constrain(spider.x, 226/1710*window.innerWidth, 1484/1710*window.innerWidth), 158/874*window.innerHeight, 100, 100);
            if (frameCount % 10 == 0){
              if (index < 2){
                index++;
              } 
              else {
               index = 0;
              }
            }
          }
          else if (spider.x > window.innerWidth / 2 - 20 && spider.x < window.innerWidth / 2 + 20) { //if at center
            imageMode(CENTER);
            image(spiderDownImage[index], window.innerWidth / 2, 158/874*window.innerHeight + threadLength2, 100, 100);
            if (frameCount % 10 == 0){
              if (index < 2){
                index++;
              } 
             else {
                index = 0;
              }
            }
            detectBendingIndexFinger(hand);
            if (threadLength2 < (670-158)/874*window.innerHeight) {
              txt = "Shoot a thread so that we can drop down until we reach something.";
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
        else if (moveToLeftAnchor && !dying){ //move to left anchor
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
            spider.y = 670/874*window.innerHeight;
            image(spiderUpImage[1], spider.x, spider.y, 100, 100);
          }
          else { //if spider is moved
            if (!diagonalLeft && !dying) {
              imageMode(CENTER);
              image(spiderUpImage[index], window.innerWidth / 2, constrain(spider.y, 158/874*window.innerHeight+heavedLength, 670/874*window.innerHeight), 100, 100);
              if (frameCount % 10 == 0){
              if (index < 2){
                  index++;
                } 
               else {
                  index = 0;
                }
              }
              if (spider.y <= 158/874*window.innerHeight + heavedLength + 5){ //ready for diagonal dragging
                diagonalLeft = true;
              }
            }
            if (diagonalLeft && !moveToRightAnchor & !dying){
              let m = (158/874*window.innerHeight + heavedLength - 158/874*window.innerHeight)/( window.innerWidth / 2 - 226/1710*window.innerWidth);
              let b = 158/874*window.innerHeight - m*226/1710*window.innerWidth;
              let projectedX = (spider.x + m * (spider.y - b))/(1 + m * m);
              let projectedY = m * spider.x + b;
              imageMode(CENTER);
              image(spiderDiagonalLeftImage[index], constrain(projectedX, 226/1710*window.innerWidth, window.innerWidth/2), constrain(projectedY, 158/874*window.innerHeight, 158/874*window.innerHeight+heavedLength), 115, 115);
              if (frameCount % 10 == 0){
              if (index < 2){
                  index++;
                } 
                else {
                 index = 0;
                }
              }
              if (projectedX <= 226/1710*window.innerWidth){ //at left anchor
                txt = "Well done! Let's go to the right anchor. I'm sure you will find the shortcut!";
                moveToRightAnchor = true;
               }
              else if (projectedX > 226/1710*window.innerWidth){
                //left anchor thread
                push();
                strokeWeight(1);
                stroke(0);
                line(window.innerWidth / 2, 670/874*window.innerHeight, constrain(projectedX, 226/1710*window.innerWidth, window.innerWidth/2), constrain(projectedY, 158/874*window.innerHeight, 158/874*window.innerHeight+heavedLength));
                pop();
              }            
            }
            if(!detectBendingIndexFinger(hand)){
              txt = "Gotta keep the thread goin'";
            }
            else{
              txt = "You are getting so close to the left anchor!";
            }
        }
        }
      if (moveToRightAnchor & !dying){
          //unchanged left anchor thread
          push();
          strokeWeight(1);
          stroke(0);
          line(window.innerWidth / 2, 670/874*window.innerHeight, 226/1710*window.innerWidth, 158/874*window.innerHeight);
          pop();

          if (!diagonalRight){
            txt = "Well done! Let's go to the right anchor. I'm sure you will find the shortcut!";
            detectPinch(hand);
            imageMode(CENTER);
            image(spiderRightImage[index], constrain(spider.x, 226/1710*window.innerWidth, 1484/1710*window.innerWidth), 158/874*window.innerHeight, 100, 100);
            if (frameCount % 10 == 0){
              if (index < 2){
               index++;
              } 
              else {
                index = 0;
            }
          }
          }

          if (spider.x >= 1484/1710*window.innerWidth){ //at right anchor
              diagonalRight = true;
          }
        }

      if (diagonalRight & !moveToBottomAnchor){ 
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
          if(!detectBendingIndexFinger(hand)){
            txt = "Gotta keep the thread goin'";
          }
          else{
            txt = "Well done! Now shoot another thread and drag it to the bottom anchor.";
          }
          m = (158/874*window.innerHeight - (heavedLength + 158/874*window.innerHeight))/(1484/1710*window.innerWidth - window.innerWidth / 2);
          b = 158/874*window.innerHeight + heavedLength - m * window.innerWidth/2;
          projectedX = (spider.x + m * (spider.y - b))/(1 + m * m);
          projectedY = m * spider.x + b
          if (projectedX >= window.innerWidth/2 + 3){
            imageMode(CENTER);
            image(spiderDiagonalRightImage[index], constrain(projectedX, window.innerWidth/2, 1484/1710*window.innerWidth), constrain(projectedY, 158/874*window.innerHeight, 158/874*window.innerHeight + heavedLength), 115, 115);
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
            line(1484/1710*window.innerWidth, 158/874*window.innerHeight, constrain(projectedX, window.innerWidth/2, 1484/1710*window.innerWidth), constrain(projectedY, 158/874*window.innerHeight, 158/874*window.innerHeight + heavedLength));
            pop();
          }
          else {
            moveToBottomAnchor = true;
          }
        }
        if (moveToBottomAnchor & !dying){
            if (spider.y >= 670/874*window.innerHeight){ //at bottom anchor
              spider.y = 670/874*window.innerHeight;
              spider.x = window.innerWidth / 2
              imageMode(CENTER);
              image(spiderUpImage[index], spider.x, spider.y, 100, 100);
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
              line(1484/1710*window.innerWidth, 158/874*window.innerHeight, window.innerWidth/2, 670/874*window.innerHeight);
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
              if(!detectBendingIndexFinger(hand)){
                txt = "Gotta keep the thread goin'";
              }
              else{
                txt = "You are getting so close to the bottom anchor!";
              }
              imageMode(CENTER);
              image(spiderDownImage[index], window.innerWidth / 2, constrain(spider.y, 158/874*window.innerHeight+heavedLength, 670/874*window.innerHeight), 100, 100);
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
              line(1484/1710*window.innerWidth, 158/874*window.innerHeight, window.innerWidth/2, constrain(spider.y, 158/874*window.innerHeight+heavedLength, 670/874*window.innerHeight));
              pop();
            }
          }

      if (dying){
        //right + left thread
        push();
        strokeWeight(1);
        stroke(0);
        line(1484/1710*window.innerWidth, 158/874*window.innerHeight, window.innerWidth/2, 670/874*window.innerHeight);
        line(window.innerWidth / 2, 670/874*window.innerHeight, 226/1710*window.innerWidth, 158/874*window.innerHeight);
        pop();

        detectPinch(hand);
        if (!spiderMoved){
          spider.x = window.innerWidth/2;
          spider.y = 670/874*window.innerHeight;
          imageMode(CENTER);
          image(spiderUpImage[0], spider.x, spider.y, 100, 100);
        }
        else {
          if (spider.y > 158/874*window.innerHeight + heavedLength + 5 && !stuck){ //if not at center
            txt = "Why am I crawling this slowly?";
            if(!detectBendingIndexFinger(hand)){
              txt = "Gotta keep the thread goin'";
            }
            if (!secondTextBlock4){
              previousMillis = millis();
              secondTextBlock4 = true;
            }
            else{
              if (millis() - previousMillis >= 2000){
                txt = "I have to try harder.";
              }
            imageMode(CENTER);
            image(spiderUpImage[index], constrain(spider.x, window.innerWidth /2, window.innerWidth /2), constrain(spider.y, 158/874*window.innerHeight + heavedLength, 670/874*window.innerHeight), 100, 100);
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
          else if (spider.y <= 158/874*window.innerHeight + heavedLength){ 
            stuck = true;
          }
          if (stuck){
            spider.x = window.innerWidth / 2;
            spider.y = 158/874*window.innerHeight +  heavedLength;
            imageMode(CENTER);
            image(spiderUpImage[0], spider.x, spider.y, 100, 100);
            txt = "I'm stuck in my own web.";
            if (!secondTextBlock5){
              previousMillis = millis();
              secondTextBlock5 = true;
            }
            else {
              if (detectPinch(hand)){
                spider.x = window.innerWidth / 2;
                spider.y = 158/874*window.innerHeight +  heavedLength;
                txt = "I don't have more strength to crawl. Stop trying.";
              }
              if (detectBendingIndexFinger(hand)){
                txt = "I don't have more silk to shoot. Stop trying."
              }
              if (detectCellphonePose(hand)){
                txt = "There is no use listening to the vibrations. Stop trying.";
              }
          if (detectCrossingFingers(hand)){
            txt = "I don't have any strength to heave the thread. Stop trying.";
          }
          if (millis() - previousMillis >= 8000){
            txt = "There is no point in trying. I'm going to rot and die alone on this web."
          }
          if(millis() - previousMillis >= 12000){
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
      line(226/1710*window.innerWidth, 158/874*window.innerHeight, window.innerWidth / 2, 158/874*window.innerHeight + heavedLength);
      line(1484/1710*window.innerWidth, 158/874*window.innerHeight, window.innerWidth / 2, 158/874*window.innerHeight + heavedLength);
      pop();
      
      //vertical thread
      push();
      strokeWeight(1);
      stroke(0);
      line(window.innerWidth / 2, 158/874*window.innerHeight + heavedLength, window.innerWidth / 2, 158/874*window.innerHeight + threadLength2);
      pop();
  }

      //text
      stroke(0);
      strokeWeight(0.1);
      textAlign(LEFT);
      rectMode(CENTER);
      text(
        txt,
        280/1710*window.innerWidth + window.innerWidth * .31,
        73/874*window.innerHeight,
        window.innerWidth * .62
      );
      // text(
      //   txt,
      //   553/1710*window.innerWidth + window.innerWidth * .2,
      //   303/874*window.innerHeight,
      //   window.innerWidth * .4
      // );
      break;
    case 3:
      txt = "Blink to see more clearly."
      background(0);
      stroke(255);
      strokeWeight(0.1);
      textAlign(LEFT);
      textFont(BalooThambi2);
      textSize(25);
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
    spiderUpImage[index].resize(100, 100);
    //imageMode(CENTER);
    image(spiderUpImage[index], this.x, this.y);
  }

  wiggle() {
    let wiggleOffsetX = (noise(frameCount * 0.05) - 0.5) * 20; // amplitude=20
    let wiggleOffsetY = (noise(frameCount * 0.05 + 1000) - 0.5) * 20;

    image(spiderUpImage[index], this.x + wiggleOffsetX, this.y + wiggleOffsetY);
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
    image(spiderUpImage[index], this.x, this.y);
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
    if (index.x >= 181 && index.x <= 268 && index.y >= 253 && index.y <= 318) { //(231, 288)
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
      let currentTime = millis();
      if (!dying || currentTime - lastUpdateTime >= dyingUpdateInterval) {
        if (moveToLeftAnchor || moveToBottomAnchor|| diagonalRight){ 
          if (detectBendingIndexFinger(hand)){
            spider.x = (hand.index_finger_tip.x + hand.thumb_tip.x) / 2;
            spider.y = (hand.index_finger_tip.y + hand.thumb_tip.y) / 2;
            spiderMoved = true;
            lastUpdateTime = currentTime;
            return true;
          }
        }
      }
      if (!moveToLeftAnchor && !moveToBottomAnchor && !diagonalRight) {
        spider.x = (hand.index_finger_tip.x + hand.thumb_tip.x) / 2;
        spider.y = (hand.index_finger_tip.y + hand.thumb_tip.y) / 2;
        spiderMoved = true;
        lastUpdateTime = currentTime;
        return true;
      }

      if (moveToRightAnchor && !diagonalRight) {
        spider.x = (hand.index_finger_tip.x + hand.thumb_tip.x) / 2;
        spider.y = (hand.index_finger_tip.y + hand.thumb_tip.y) / 2;
        spiderMoved = true;
        lastUpdateTime = currentTime;
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
    if (distance < 45) {
      return true;
    }
  }
}
  }
  return false;
}
