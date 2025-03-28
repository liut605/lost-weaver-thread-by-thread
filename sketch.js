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
  { x: 0, y: (840 / 874) * window.innerHeight },
  { x: (224 / 1710) * window.innerWidth, y: (664 / 874) * window.innerHeight },
  { x: (615 / 1710) * window.innerWidth, y: (349 / 874) * window.innerHeight },
  { x: (1069 / 1710) * window.innerWidth, y: (232 / 874) * window.innerHeight },
  { x: (1452 / 1710) * window.innerWidth, y: (78 / 874) * window.innerHeight },
  { x: (1620 / 1710) * window.innerWidth, y: (2 / 874) * window.innerHeight },
  { x: (79 / 1710) * window.innerWidth, y: (312 / 874) * window.innerHeight },
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
let bending_index_figer_left;
let bending_index_figer_right;

let BalooThambi2;
let Gluten;
let txt;
let instruction;
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

let threadStartingPos =
  window.innerWidth / 2 - (226 / 1710) * window.innerWidth;

function preload() {
  for (let i = 0; i < 3; i++) {
    spiderUpImage[i] = loadImage("spider_up_" + i + ".png");
    spiderDownImage[i] = loadImage("spider_down_" + i + ".png");
    spiderLeftImage[i] = loadImage("spider_left_" + i + ".png");
    spiderRightImage[i] = loadImage("spider_right_" + i + ".png");
    spiderDiagonalLeftImage[i] = loadImage(
      "spider_diagonal_left_" + i + ".png"
    );
    spiderDiagonalRightImage[i] = loadImage(
      "spider_diagonal_right_" + i + ".png"
    );
  }
  web = loadImage("web.png");
  landscape = loadImage("background.png");
  seeking = loadImage("seeking.png");
  thumb = loadImage("thumb.png");
  index_finger = loadImage("index_finger.png");
  non_dom_hand = loadImage("non_dom_hand.png");
  bending_index_figer_left = loadImage("bending_index_finger_left.png");
  bending_index_figer_right = loadImage("bending_index_finger_right.png");
  pinch_left = loadImage("pinch_left.png");
  pinch_right = loadImage("pinch_right.png");

  handPose = ml5.handPose({ flipped: true });
  wind = loadSound("wind.mp3");
  gluten = loadFont("Gluten.ttf");
  BalooThambi2 = loadFont("BalooThambi2.ttf");
}

// function keyPressed() {
//   //getting hand positions
//   console.log(hands);
// }

// function mousePressed() {
//   //for developing only
//   // sceneNum++;
//   console.log(mouseX, mouseY);
// }

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
  video = createCapture(VIDEO, { flipped: true });
  video.size(window.innerWidth, window.innerWidth * 0.75);
  video.hide();
  handPose.detectStart(video, gotHands);
}

function draw() {
  background(255);
  if (frameCount % 10 == 0) {
    //spider animation
    if (index < 2) {
      index++;
    } else {
      index = 0;
    }
  }
  switch (sceneNum) {
    case 0:
      webTouched();
      spiderTouched();
      imageMode(CORNERS);
      image(web, 0, 0, window.innerWidth, window.innerHeight);
      stroke(0);
      strokeWeight(0.1);
      textSize(Math.max((25 / 874) * window.innerHeight, 15));
      textFont(BalooThambi2);
      rectMode(CENTER);
      textAlign(CENTER);
      text(
        "Use your dominant hand to interact with me",
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerWidth / 3
      );
      if (i == 200 || spiderTouched()) {
        spider.fall();
      } else {
        spider = new Spider(
          (234 / 1710) * window.innerWidth,
          (285 / 874) * window.innerHeight
        );
      }
      if (isWiggling) {
        spider.wiggle();
        wiggleDuration--;
        if (wiggleDuration <= 0) {
          isWiggling = false;
        }
      } else {
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
        spider.x = window.innerWidth / 2 - (70 / 1710) * window.innerWidth;
        spider.y = window.innerHeight / 2 + (170 / 874) * window.innerHeight;
      }
      rectMode(CENTER);
      textAlign(LEFT);
      stroke(0);
      strokeWeight(0.1);
      textSize(Math.max((25 / 874) * window.innerHeight, 15));
      text(
        "I can't keep holding onto other spider webs. I need to learn how to build my own web… a place for myself. Follow the windscape…",
        window.innerWidth * 0.15,
        window.innerHeight * 0.5,
        window.innerWidth * 0.25
      );
      push();
      textSize(Math.max((20 / 874) * window.innerHeight, 15));
      text(
        "Will you pinch your fingers and pick me up?",
        window.innerWidth * 0.15,
        window.innerHeight * 0.75,
        window.innerWidth * 0.25
      );
      pop();
      imageMode(CENTER);
      if (domHand === "Left") {
        image(
          pinch_left,
          window.innerWidth / 3.5,
          (window.innerHeight / 4) * 3,
          140,
          140
        );
      } else {
        image(
          pinch_right,
          window.innerWidth / 3.5,
          (window.innerHeight / 4) * 3,
          140,
          140
        );
      }
      detectPinch(hand);
      if (detectPinch(hand)) {
        imageMode(CENTER);
        image(
          spiderRightImage[index],
          spider.x,
          spider.y,
          Math.max(
            Math.sqrt(
              ((100 * 100) / (1710 * 874)) *
                window.innerWidth *
                window.innerHeight
            ),
            70
          ),
          Math.max(
            Math.sqrt(
              ((100 * 100) / (1710 * 874)) *
                window.innerWidth *
                window.innerHeight
            ),
            70
          )
        );
      } else {
        imageMode(CENTER);
        image(
          spiderRightImage[0],
          spider.x,
          spider.y,
          Math.max(
            Math.sqrt(
              ((100 * 100) / (1710 * 874)) *
                window.innerWidth *
                window.innerHeight
            ),
            70
          ),
          Math.max(
            Math.sqrt(
              ((100 * 100) / (1710 * 874)) *
                window.innerWidth *
                window.innerHeight
            ),
            70
          )
        );
      }
      if (spider.x >= (window.innerWidth * 3) / 4) {
        sceneNum = 2;
      }
      break;
    case 2:
      imageMode(CENTER);
      image(
        landscape,
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerWidth,
        window.innerHeight
      );

      let isIndexFingerBent = detectBendingIndexFinger(hand);
      if (shootingOnboard && !dying) {
        instruction =
          "Bend index finger to shoot a thread. Straighten it to stop.";
        if (domHand === "Right") {
          image(
            bending_index_figer_left,
            window.innerWidth * 0.05,
            window.innerHeight * 0.8,
            140,
            140
          );
        }
        if (domHand === "Left") {
          image(
            bending_index_figer_right,
            window.innerWidth * 0.05,
            window.innerHeight * 0.8,
            140,
            140
          );
        }

        if (!blownAway) {
          // console.log(threadLength1, threadStartingPos);
          txt =
            "This could the starting point for my web! Spider silk requires both strength and elasticity. I will start with the stronger silk to build the anchor points & support threads. Will you be here with me?";
          if (threadLength1 < threadStartingPos) {
            if (isIndexFingerBent) {
              // console.log("shooting");
              threadLength1 += 4;
            } else {
              if (threadLength1 > 0) {
                threadLength1 -= 4;
                // console.log("released");
              }
            }
          } else if (threadLength1 >= threadStartingPos) {
            // console.log("blownaway");
            threadLength1 = threadStartingPos - 1;
            blownAway = true;
          }
        } else {
          // console.log(threadLength1, threadStartingPos);
          txt = "Nice try, but it seems that the windscape isn’t in our favor!";
          if (threadLength1 > 0 && threadLength1 < threadStartingPos) {
            if (isIndexFingerBent && threadLength1 <= threadStartingPos - 4) {
              threadLength1 += 4;
              // console.log("post - shooting");
            } else {
              threadLength1 -= 4;
              // console.log("post - released");
            }
          }
          if (threadLength1 <= 0) {
            txt =
              "Now listen to the alignment of windscape so that the wind can take up the thread. Start shooting silk again to reach the other side.";
            shootingOnboard = false;
            // console.log(shootingOnboard);
          }
        }
      } else if (!shootingOnboard && !moveToCenter) {
        instruction =
          "Bend index finger to shoot spider silk. Straighten it to stop.";
        if (domHand === "Right") {
          image(
            bending_index_figer_left,
            window.innerWidth * 0.05,
            window.innerHeight * 0.8,
            140,
            140
          );
        }
        if (domHand === "Left") {
          image(
            bending_index_figer_right,
            window.innerWidth * 0.05,
            window.innerHeight * 0.8,
            140,
            140
          );
        }
        if (second() % 8 == 0 && threadLength1 <= 0) {
          wind.play();
          windAligned = true;
          // console.log("aligned");
        }
        if (windAligned && isIndexFingerBent) {
          if (
            threadLength1 <
            (1484 / 1710) * window.innerWidth - (226 / 1710) * window.innerWidth
          ) {
            threadLength1 += 4;
            txt = "Look at you! Keep going!";
          } else {
            threadLength1 = threadLength1;
            txt =
              "We just successfully bridged the gap! Let’s move to the center of the silk strand and continue weaving our orb web!";
            moveToCenter = true;
            // console.log("aligned, shooting");
          }
        }
        if (windAligned && !isIndexFingerBent && !moveToCenter) {
          txt =
            "You missed it! Remember to listen to the alignment of windscape.";
          if (threadLength1 > 0) {
            threadLength1 -= 4;
          }
          if (threadLength1 <= 0) {
            windAligned = false;
            // console.log("restart");
          }
        }
      }
      push();
      strokeWeight(1);
      stroke(0);
      line(
        (226 / 1710) * window.innerWidth,
        (158 / 874) * window.innerHeight,
        (226 / 1710) * window.innerWidth + threadLength1,
        (158 / 874) * window.innerHeight
      );
      pop();

      if (!moveToCenter && !dying) {
        //while shooting thread
        spider.x = (226 / 1710) * window.innerWidth;
        spider.y = (158 / 874) * window.innerHeight;
        imageMode(CENTER);
        image(
          spiderLeftImage[0],
          spider.x,
          spider.y,
          Math.max(
            Math.sqrt(
              ((100 * 100) / (1710 * 874)) *
                window.innerWidth *
                window.innerHeight
            ),
            70
          ),
          Math.max(
            Math.sqrt(
              ((100 * 100) / (1710 * 874)) *
                window.innerWidth *
                window.innerHeight
            ),
            70
          )
        );
      } else {
        //start moving to the center
        windAligned = false;
        if (!moveToLeftAnchor && !dying) {
          detectPinch(hand);
          if (
            spider.x < window.innerWidth / 2 - 20 ||
            spider.x > window.innerWidth / 2 + 20
          ) {
            txt =
              "We just successfully bridged the gap! Let’s move to the center of the silk strand and continue weaving our orb web!";
            instruction = "Pinch your fingers to pick me up.";
            if (domHand === "Left") {
              image(
                pinch_left,
                window.innerWidth * 0.05,
                window.innerHeight * 0.8,
                140,
                140
              );
            } else {
              image(
                pinch_right,
                window.innerWidth * 0.05,
                window.innerHeight * 0.8,
                140,
                140
              );
            }
            if (detectPinch(hand)) {
              imageMode(CENTER);
              image(
                spiderRightImage[index],
                constrain(
                  spider.x,
                  (226 / 1710) * window.innerWidth,
                  (1484 / 1710) * window.innerWidth
                ),
                (158 / 874) * window.innerHeight,
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                ),
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                )
              );
            } else {
              imageMode(CENTER);
              image(
                spiderRightImage[0],
                constrain(
                  spider.x,
                  (226 / 1710) * window.innerWidth,
                  (1484 / 1710) * window.innerWidth
                ),
                (158 / 874) * window.innerHeight,
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                ),
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                )
              );
            }
          } else if (
            spider.x > window.innerWidth / 2 - 20 &&
            spider.x < window.innerWidth / 2 + 20
          ) {
            //if at center
            if (detectPinch(hand)) {
              imageMode(CENTER);
              image(
                spiderDownImage[index],
                window.innerWidth / 2,
                (158 / 874) * window.innerHeight + threadLength2,
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                ),
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                )
              );
            } else {
              imageMode(CENTER);
              image(
                spiderDownImage[0],
                window.innerWidth / 2,
                (158 / 874) * window.innerHeight + threadLength2,
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                ),
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                )
              );
            }
            detectBendingIndexFinger(hand);
            if (threadLength2 < ((670 - 158) / 874) * window.innerHeight) {
              txt =
                "Shoot a thread so that we can drop down until we reach the bottom windscape.";
              instruction = "Bend index finger to shoot a thread.";
              if (domHand === "Right") {
                image(
                  bending_index_figer_left,
                  window.innerWidth * 0.05,
                  window.innerHeight * 0.8,
                  140,
                  140
                );
              }
              if (domHand === "Left") {
                image(
                  bending_index_figer_right,
                  window.innerWidth * 0.05,
                  window.innerHeight * 0.8,
                  140,
                  140
                );
              }

              if (isIndexFingerBent) {
                threadLength2 += 4;
              }
            } else {
              txt =
                "Well done! I have a feeling that the threads are a little loose…";
              threadLength2 = threadLength2;
              if (!secondTextBlock1) {
                previousMillis = millis();
                secondTextBlock1 = true;
              } else {
                if (millis() - previousMillis >= 2000) {
                  txt = "You don't believe me?";
                  instruction =
                    "Make the “cellphone” gesture to listen to the vibration yourself! With your non-dominant hand!";
                }
              }
              let cellPhone = detectCellphonePose(hand);
              let fingersCrossed = detectCrossingFingers(hand);
              if (cellPhone) {
                //play sound file
                stubborn = true;
              }
              if (stubborn) {
                txt =
                  "Aren't you stubborn? I just told you it's a little loose...";
                instruction =
                  "Cross the fingers of your non-dominant hand to heave the thread.";
              }
              if (heavedLength <= 100) {
                if (fingersCrossed) {
                  heavedLength += 2;
                }
              } else {
                heavedLength = heavedLength;
                txt =
                  "Not a bad job. Now we have a basic Y-shape. Time to add more anchor threads.";
                if (!secondTextBlock2) {
                  previousMillis = millis();
                  secondTextBlock2 = true;
                } else {
                  if (millis() - previousMillis >= 2000) {
                    txt = "Shoot a thread and drag it to the left top anchor.";
                    instruction =
                      "Pinch to pick me up. Bend index finger to shoot a thread.";
                    moveToLeftAnchor = true;
                    spiderMoved = false;
                  }
                }
              }
            }
          }
        } else if (moveToLeftAnchor && !dying) {
          //no initial icon whyyyyy????????
          //move to left anchor
          if (hands.length > 0) {
            for (let hand of hands) {
              if (hand.handedness == domHand) {
                detectPinch(hand);
              }
              if (hand.handedness == nonDomHand) {
                detectBendingIndexFinger(hand);
              }
            }
          }
          if (!spiderMoved) {
            imageMode(CENTER);
            spider.x = window.innerWidth / 2;
            spider.y = (670 / 874) * window.innerHeight;
            image(
              spiderUpImage[0],
              spider.x,
              spider.y,
              Math.max(
                Math.sqrt(
                  ((100 * 100) / (1710 * 874)) *
                    window.innerWidth *
                    window.innerHeight
                ),
                70
              ),
              Math.max(
                Math.sqrt(
                  ((100 * 100) / (1710 * 874)) *
                    window.innerWidth *
                    window.innerHeight
                ),
                70
              )
            );
          } else {
            //if spider is moved
            if (!diagonalLeft && !dying) {
              if (detectPinch(hand)) {
                imageMode(CENTER);
                image(
                  spiderUpImage[index],
                  window.innerWidth / 2,
                  constrain(
                    spider.y,
                    (158 / 874) * window.innerHeight + heavedLength,
                    (670 / 874) * window.innerHeight
                  ),
                  Math.max(
                    Math.sqrt(
                      ((100 * 100) / (1710 * 874)) *
                        window.innerWidth *
                        window.innerHeight
                    ),
                    70
                  ),
                  Math.max(
                    Math.sqrt(
                      ((100 * 100) / (1710 * 874)) *
                        window.innerWidth *
                        window.innerHeight
                    ),
                    70
                  )
                );
              } else {
                imageMode(CENTER);
                image(
                  spiderUpImage[0],
                  window.innerWidth / 2,
                  constrain(
                    spider.y,
                    (158 / 874) * window.innerHeight + heavedLength,
                    (670 / 874) * window.innerHeight
                  ),
                  Math.max(
                    Math.sqrt(
                      ((100 * 100) / (1710 * 874)) *
                        window.innerWidth *
                        window.innerHeight
                    ),
                    70
                  ),
                  Math.max(
                    Math.sqrt(
                      ((100 * 100) / (1710 * 874)) *
                        window.innerWidth *
                        window.innerHeight
                    ),
                    70
                  )
                );
              }
              if (
                spider.y <=
                (158 / 874) * window.innerHeight + heavedLength + 5
              ) {
                //ready for diagonal dragging
                diagonalLeft = true;
              }
            }
            if (diagonalLeft && !moveToRightAnchor & !dying) {
              let m =
                ((158 / 874) * window.innerHeight +
                  heavedLength -
                  (158 / 874) * window.innerHeight) /
                (window.innerWidth / 2 - (226 / 1710) * window.innerWidth);
              let b =
                (158 / 874) * window.innerHeight -
                ((m * 226) / 1710) * window.innerWidth;
              let projectedX = (spider.x + m * (spider.y - b)) / (1 + m * m);
              let projectedY = m * spider.x + b;
              if (detectPinch(hand)) {
                imageMode(CENTER);
                image(
                  spiderDiagonalLeftImage[index],
                  constrain(
                    projectedX,
                    (226 / 1710) * window.innerWidth,
                    window.innerWidth / 2
                  ),
                  constrain(
                    projectedY,
                    (158 / 874) * window.innerHeight,
                    (158 / 874) * window.innerHeight + heavedLength
                  ),
                  Math.max(
                    Math.sqrt(
                      ((115 * 115) / (1710 * 874)) *
                        window.innerWidth *
                        window.innerHeight
                    ),
                    80.5
                  ),
                  Math.max(
                    Math.sqrt(
                      ((115 * 115) / (1710 * 874)) *
                        window.innerWidth *
                        window.innerHeight
                    ),
                    80.5
                  )
                );
              } else {
                imageMode(CENTER);
                image(
                  spiderDiagonalLeftImage[0],
                  constrain(
                    projectedX,
                    (226 / 1710) * window.innerWidth,
                    window.innerWidth / 2
                  ),
                  constrain(
                    projectedY,
                    (158 / 874) * window.innerHeight,
                    (158 / 874) * window.innerHeight + heavedLength
                  ),
                  Math.max(
                    Math.sqrt(
                      ((115 * 115) / (1710 * 874)) *
                        window.innerWidth *
                        window.innerHeight
                    ),
                    80.5
                  ),
                  Math.max(
                    Math.sqrt(
                      ((115 * 115) / (1710 * 874)) *
                        window.innerWidth *
                        window.innerHeight
                    ),
                    80.5
                  )
                );
              }
              if (projectedX <= (226 / 1710) * window.innerWidth) {
                //at left anchor
                txt =
                  "Well done! Let's go to the right anchor. I'm sure you will find the shortcut!";
                instruction = "Pinch to pick me up.";
                moveToRightAnchor = true;
              } else if (projectedX > (226 / 1710) * window.innerWidth) {
                //left anchor thread
                push();
                strokeWeight(1);
                stroke(0);
                line(
                  window.innerWidth / 2,
                  (670 / 874) * window.innerHeight,
                  constrain(
                    projectedX,
                    (226 / 1710) * window.innerWidth,
                    window.innerWidth / 2
                  ),
                  constrain(
                    projectedY,
                    (158 / 874) * window.innerHeight,
                    (158 / 874) * window.innerHeight + heavedLength
                  )
                );
                pop();
              }
            }
            if (!detectBendingIndexFinger(hand)) {
              txt = "Gotta keep the thread goin'";
              instruction = "Bend index finger to shoot a thread.";
              if (domHand === "Right") {
                if (moveToRightAnchor) {
                  image(
                    pinch_right,
                    window.innerWidth * 0.13,
                    window.innerHeight * 0.8,
                    140,
                    140
                  );
                } else {
                  // console.log("859");
                  image(
                    bending_index_figer_left,
                    window.innerWidth * 0.05,
                    window.innerHeight * 0.8,
                    140,
                    140
                  );
                  image(
                    pinch_right,
                    window.innerWidth * 0.13,
                    window.innerHeight * 0.8,
                    140,
                    140
                  );
                }
              }
              if (domHand === "Left") {
                if (moveToRightAnchor) {
                  image(
                    pinch_left,
                    window.innerWidth * 0.05,
                    window.innerHeight * 0.8,
                    140,
                    140
                  );
                } else {
                  image(
                    bending_index_figer_right,
                    window.innerWidth * 0.13,
                    window.innerHeight * 0.8,
                    140,
                    140
                  );
                  image(
                    pinch_left,
                    window.innerWidth * 0.05,
                    window.innerHeight * 0.8,
                    140,
                    140
                  );
                }
              }
            } else {
              txt = "You are getting so close to the left anchor!";
              instruction =
                "Pinch to pick me up. Bend index finger to shoot a thread.";
              if (!moveToRightAnchor) {
                if (domHand === "Right") {
                  image(
                    bending_index_figer_left,
                    window.innerWidth * 0.05,
                    window.innerHeight * 0.8,
                    140,
                    140
                  );
                  image(
                    pinch_right,
                    window.innerWidth * 0.13,
                    window.innerHeight * 0.8,
                    140,
                    140
                  );
                } else if (domHand === "Left") {
                  //an old bug, left display
                  // console.log("left, 700");
                  image(
                    bending_index_figer_right,
                    window.innerWidth * 0.13,
                    window.innerHeight * 0.8,
                    140,
                    140
                  );
                  image(
                    pinch_left,
                    window.innerWidth * 0.05,
                    window.innerHeight * 0.8,
                    140,
                    140
                  );
                }
              }
            }
          }
        }
        if (moveToRightAnchor & !dying) {
          // console.log("moveToRightAnchor", moveToRightAnchor);
          if (domHand === "Right") {
            // console.log("right, normal");
            image(
              pinch_right,
              window.innerWidth * 0.13,
              window.innerHeight * 0.8,
              140,
              140
            );
          } else if (domHand === "Left") {
            //an old bug, left display
            // console.log("left, 1000");
            image(
              pinch_left,
              window.innerWidth * 0.05,
              window.innerHeight * 0.8,
              140,
              140
            );
          }
          //unchanged left anchor thread
          push();
          strokeWeight(1);
          stroke(0);
          line(
            window.innerWidth / 2,
            (670 / 874) * window.innerHeight,
            (226 / 1710) * window.innerWidth,
            (158 / 874) * window.innerHeight
          );
          pop();

          if (!diagonalRight) {
            txt =
              "Well done! Let's go to the right anchor. I'm sure you will find the shortcut!";
            instruction = "Pinch to pick me up.";

            detectPinch(hand);
            if (detectPinch(hand)) {
              imageMode(CENTER);
              image(
                spiderRightImage[index],
                constrain(
                  spider.x,
                  (226 / 1710) * window.innerWidth,
                  (1484 / 1710) * window.innerWidth
                ),
                (158 / 874) * window.innerHeight,
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                ),
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                )
              );
            } else {
              imageMode(CENTER);
              image(
                spiderRightImage[0],
                constrain(
                  spider.x,
                  (226 / 1710) * window.innerWidth,
                  (1484 / 1710) * window.innerWidth
                ),
                (158 / 874) * window.innerHeight,
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                ),
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                )
              );
            }
          }

          if (spider.x >= (1484 / 1710) * window.innerWidth) {
            //at right anchor
            diagonalRight = true;
          }
        }

        if (diagonalRight && !moveToBottomAnchor) {
          // console.log("diagonalRight:", diagonalRight);
          if (hands.length > 0) {
            for (let hand of hands) {
              if (hand.handedness == domHand) {
                detectPinch(hand);
              }
              if (hand.handedness == nonDomHand) {
                detectBendingIndexFinger(hand);
              }
            }
          }
          if (!detectBendingIndexFinger(hand)) {
            txt = "Gotta keep the thread goin'";
            instruction = "Bend index finger to shoot a thread.";
            if (domHand === "Right") {
              console.log("1051");
              image(
                bending_index_figer_left,
                window.innerWidth * 0.05,
                window.innerHeight * 0.8,
                140,
                140
              );
              image(
                pinch_right,
                window.innerWidth * 0.13,
                window.innerHeight * 0.8,
                140,
                140
              );
            }
            if (domHand === "Left") {
              // console.log(domHand, "left");
              image(
                bending_index_figer_right,
                window.innerWidth * 0.13,
                window.innerHeight * 0.8,
                140,
                140
              );
              image(
                pinch_left,
                window.innerWidth * 0.05,
                window.innerHeight * 0.8,
                140,
                140
              );
            }
          } else {
            txt =
              "Well done! Now shoot another thread and drag it to the bottom anchor.";
            instruction =
              "Pinch to pick me up. Bend index finger to shoot a thread.";
            if (domHand === "Right") {
              image(
                bending_index_figer_left,
                window.innerWidth * 0.05,
                window.innerHeight * 0.8,
                140,
                140
              );
              image(
                pinch_right,
                window.innerWidth * 0.13,
                window.innerHeight * 0.8,
                140,
                140
              );
            }
            if (domHand === "Left") {
              // console.log(domHand, "left");
              image(
                bending_index_figer_right,
                window.innerWidth * 0.13,
                window.innerHeight * 0.8,
                140,
                140
              );
              image(
                pinch_left,
                window.innerWidth * 0.05,
                window.innerHeight * 0.8,
                140,
                140
              );
            }
          }
          m =
            ((158 / 874) * window.innerHeight -
              (heavedLength + (158 / 874) * window.innerHeight)) /
            ((1484 / 1710) * window.innerWidth - window.innerWidth / 2);
          b =
            (158 / 874) * window.innerHeight +
            heavedLength -
            (m * window.innerWidth) / 2;
          projectedX = (spider.x + m * (spider.y - b)) / (1 + m * m);
          projectedY = m * spider.x + b;
          if (projectedX >= window.innerWidth / 2 + 3) {
            if (detectPinch(hand)) {
              imageMode(CENTER);
              image(
                spiderDiagonalRightImage[index],
                constrain(
                  projectedX,
                  window.innerWidth / 2,
                  (1484 / 1710) * window.innerWidth
                ),
                constrain(
                  projectedY,
                  (158 / 874) * window.innerHeight,
                  (158 / 874) * window.innerHeight + heavedLength
                ),
                Math.max(
                  Math.sqrt(
                    ((115 * 115) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  80.5
                ),
                Math.max(
                  Math.sqrt(
                    ((115 * 115) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  80.5
                )
              );
            } else {
              imageMode(CENTER);
              image(
                spiderDiagonalRightImage[0],
                constrain(
                  projectedX,
                  window.innerWidth / 2,
                  (1484 / 1710) * window.innerWidth
                ),
                constrain(
                  projectedY,
                  (158 / 874) * window.innerHeight,
                  (158 / 874) * window.innerHeight + heavedLength
                ),
                Math.max(
                  Math.sqrt(
                    ((115 * 115) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  80.5
                ),
                Math.max(
                  Math.sqrt(
                    ((115 * 115) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  80.5
                )
              );
            }

            //right anchor thread
            push();
            strokeWeight(1);
            stroke(0);
            line(
              (1484 / 1710) * window.innerWidth,
              (158 / 874) * window.innerHeight,
              constrain(
                projectedX,
                window.innerWidth / 2,
                (1484 / 1710) * window.innerWidth
              ),
              constrain(
                projectedY,
                (158 / 874) * window.innerHeight,
                (158 / 874) * window.innerHeight + heavedLength
              )
            );
            pop();
          } else {
            moveToBottomAnchor = true;
          }
        }
        if (moveToBottomAnchor & !dying) {
          if (spider.y >= (670 / 874) * window.innerHeight) {
            //at bottom anchor
            spider.y = (670 / 874) * window.innerHeight;
            spider.x = window.innerWidth / 2;
            imageMode(CENTER);
            image(
              spiderUpImage[0],
              spider.x,
              spider.y,
              Math.max(
                Math.sqrt(
                  ((100 * 100) / (1710 * 874)) *
                    window.innerWidth *
                    window.innerHeight
                ),
                70
              ),
              Math.max(
                Math.sqrt(
                  ((100 * 100) / (1710 * 874)) *
                    window.innerWidth *
                    window.innerHeight
                ),
                70
              )
            );
            push();
            strokeWeight(1);
            stroke(0);
            line(
              (1484 / 1710) * window.innerWidth,
              (158 / 874) * window.innerHeight,
              window.innerWidth / 2,
              (670 / 874) * window.innerHeight
            );
            pop();
            txt = "I'm proud of us for making this far.";
            instruction = " ";

            if (!secondTextBlock3) {
              previousMillis = millis();
              secondTextBlock3 = true;
            } else {
              if (millis() - previousMillis >= 2500) {
                txt =
                  "To provide more stability to the web, let's add more threads to the center of the web";
                instruction =
                  "Pinch to pick me up. Bend index finger to shoot a thread.";
                dying = true;
                spiderMoved = false;
              }
            }
          } else {
            if (!detectBendingIndexFinger(hand)) {
              txt = "Gotta keep the thread goin'";
              instruction = "Bend index finger to shoot a thread.";
              if (domHand === "Right") {
                console.log("1279");
                image(
                  bending_index_figer_left,
                  window.innerWidth * 0.05,
                  window.innerHeight * 0.8,
                  140,
                  140
                );
                image(
                  pinch_right,
                  window.innerWidth * 0.13,
                  window.innerHeight * 0.8,
                  140,
                  140
                );
              }
              if (domHand === "Left") {
                // console.log(domHand, "left");
                image(
                  bending_index_figer_right,
                  window.innerWidth * 0.13,
                  window.innerHeight * 0.8,
                  140,
                  140
                );
                image(
                  pinch_left,
                  window.innerWidth * 0.05,
                  window.innerHeight * 0.8,
                  140,
                  140
                );
              }
            } else {
              txt = "You are getting so close to the bottom anchor!";
              instruction =
                "Pinch to pick me up. Bend index finger to shoot a thread.";
              if (domHand === "Right") {
                image(
                  bending_index_figer_left,
                  window.innerWidth * 0.05,
                  window.innerHeight * 0.8,
                  140,
                  140
                );
                image(
                  pinch_right,
                  window.innerWidth * 0.13,
                  window.innerHeight * 0.8,
                  140,
                  140
                );
              }
              if (domHand === "Left") {
                image(
                  bending_index_figer_right,
                  window.innerWidth * 0.13,
                  window.innerHeight * 0.8,
                  140,
                  140
                );
                image(
                  pinch_left,
                  window.innerWidth * 0.05,
                  window.innerHeight * 0.8,
                  140,
                  140
                );
              }
            }
            if (detectPinch(hand)) {
              imageMode(CENTER);
              image(
                spiderDownImage[index],
                window.innerWidth / 2,
                constrain(
                  spider.y,
                  (158 / 874) * window.innerHeight + heavedLength,
                  (670 / 874) * window.innerHeight
                ),
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                ),
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                )
              );
            } else {
              imageMode(CENTER);
              image(
                spiderDownImage[0],
                window.innerWidth / 2,
                constrain(
                  spider.y,
                  (158 / 874) * window.innerHeight + heavedLength,
                  (670 / 874) * window.innerHeight
                ),
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                ),
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                )
              );
            }

            push();
            strokeWeight(1);
            stroke(0);
            line(
              (1484 / 1710) * window.innerWidth,
              (158 / 874) * window.innerHeight,
              window.innerWidth / 2,
              constrain(
                spider.y,
                (158 / 874) * window.innerHeight + heavedLength,
                (670 / 874) * window.innerHeight
              )
            );
            pop();
          }
        }

        if (dying) {
          // console.log(stuck, domHand);
          //right + left thread
          push();
          strokeWeight(1);
          stroke(0);
          line(
            (1484 / 1710) * window.innerWidth,
            (158 / 874) * window.innerHeight,
            window.innerWidth / 2,
            (670 / 874) * window.innerHeight
          );
          line(
            window.innerWidth / 2,
            (670 / 874) * window.innerHeight,
            (226 / 1710) * window.innerWidth,
            (158 / 874) * window.innerHeight
          );
          pop();
          detectPinch(hand);
          // console.log(detectPinch(hand));
          if (!spiderMoved) {
            spider.x = window.innerWidth / 2;
            spider.y = (670 / 874) * window.innerHeight;
            imageMode(CENTER);
            image(
              spiderUpImage[0],
              spider.x,
              spider.y,
              Math.max(
                Math.sqrt(
                  ((100 * 100) / (1710 * 874)) *
                    window.innerWidth *
                    window.innerHeight
                ),
                70
              ),
              Math.max(
                Math.sqrt(
                  ((100 * 100) / (1710 * 874)) *
                    window.innerWidth *
                    window.innerHeight
                ),
                70
              )
            );
          } else {
            if (
              spider.y > (158 / 874) * window.innerHeight + heavedLength + 5 &&
              !stuck
            ) {
              // console.log(stuck, domHand);
              //if not at center
              txt = "Why am I crawling this slowly?";
              instruction =
                "Pinch to pick me up. Bend index finger to shoot a thread.";
              if (domHand === "Right") {
                image(
                  pinch_right,
                  window.innerWidth * 0.13,
                  window.innerHeight * 0.8,
                  140,
                  140
                );
                image(
                  bending_index_figer_left,
                  window.innerWidth * 0.05,
                  window.innerHeight * 0.8,
                  140,
                  140
                );
              } else if (domHand === "Left") {
                image(
                  pinch_left,
                  window.innerWidth * 0.05,
                  window.innerHeight * 0.8,
                  140,
                  140
                );
                image(
                  bending_index_figer_right,
                  window.innerWidth * 0.13,
                  window.innerHeight * 0.8,
                  140,
                  140
                );
              }

              if (!detectBendingIndexFinger(hand)) {
                console.log("1511");
                //txt = "Gotta keep the thread goin'";
                //console.log("Right, need to shoot thread");
                instruction = "BEND YOUR INDEX FINGER!!!";
                if (domHand === "Right") {
                  image(
                    pinch_right,
                    window.innerWidth * 0.13,
                    window.innerHeight * 0.8,
                    140,
                    140
                  );
                } else if (domHand === "Left") {
                  image(
                    pinch_left,
                    window.innerWidth * 0.05,
                    window.innerHeight * 0.8,
                    140,
                    140
                  );
                }
              }
              if (!secondTextBlock4) {
                previousMillis = millis();
                secondTextBlock4 = true;
              } else {
                if (millis() - previousMillis >= 2000) {
                  txt = "I have to try harder.";
                  instruction =
                    "Pinch to pick me up. Bend index finger to shoot a thread.";
                  if (!detectBendingIndexFinger(hand)) {
                    console.log("1542");
                    //txt = "Gotta keep the thread goin'";
                    instruction = "BEND YOUR INDEX FINGER!!!!";
                    // i dont know why its not working
                  }
                }
              }
              if (detectPinch(hand)) {
                imageMode(CENTER);
                image(
                  spiderUpImage[index],
                  constrain(
                    spider.x,
                    window.innerWidth / 2,
                    window.innerWidth / 2
                  ),
                  constrain(
                    spider.y,
                    (158 / 874) * window.innerHeight + heavedLength,
                    (670 / 874) * window.innerHeight
                  ),
                  Math.max(
                    Math.sqrt(
                      ((100 * 100) / (1710 * 874)) *
                        window.innerWidth *
                        window.innerHeight
                    ),
                    70
                  ),
                  Math.max(
                    Math.sqrt(
                      ((100 * 100) / (1710 * 874)) *
                        window.innerWidth *
                        window.innerHeight
                    ),
                    70
                  )
                );
              } else {
                imageMode(CENTER);
                image(
                  spiderUpImage[0],
                  constrain(
                    spider.x,
                    window.innerWidth / 2,
                    window.innerWidth / 2
                  ),
                  constrain(
                    spider.y,
                    (158 / 874) * window.innerHeight + heavedLength,
                    (670 / 874) * window.innerHeight
                  ),
                  Math.max(
                    Math.sqrt(
                      ((100 * 100) / (1710 * 874)) *
                        window.innerWidth *
                        window.innerHeight
                    ),
                    70
                  ),
                  Math.max(
                    Math.sqrt(
                      ((100 * 100) / (1710 * 874)) *
                        window.innerWidth *
                        window.innerHeight
                    ),
                    70
                  )
                );
              }
            } else if (
              spider.y <=
              (158 / 874) * window.innerHeight + heavedLength
            ) {
              stuck = true;
            }
            if (stuck) {
              spider.x = window.innerWidth / 2;
              spider.y = (158 / 874) * window.innerHeight + heavedLength;
              imageMode(CENTER);
              image(
                spiderUpImage[0],
                spider.x,
                spider.y,
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                ),
                Math.max(
                  Math.sqrt(
                    ((100 * 100) / (1710 * 874)) *
                      window.innerWidth *
                      window.innerHeight
                  ),
                  70
                )
              );
              txt = "I'm stuck in my own web.";
              instruction = " ";
              if (!secondTextBlock5) {
                previousMillis = millis();
                secondTextBlock5 = true;
              } else {
                if (detectPinch(hand)) {
                  spider.x = window.innerWidth / 2;
                  spider.y = (158 / 874) * window.innerHeight + heavedLength;
                  txt = "I don't have more strength to crawl. Stop trying.";
                }
                if (detectBendingIndexFinger(hand)) {
                  txt = "I don't have more silk to shoot. Stop trying.";
                }
                if (detectCellphonePose(hand)) {
                  txt =
                    "There is no use listening to the vibrations. Stop trying.";
                }
                if (detectCrossingFingers(hand)) {
                  txt =
                    "I don't have any strength to heave the thread. Stop trying.";
                }
                if (millis() - previousMillis >= 8000) {
                  txt =
                    "There is no point in trying. I'm going to rot and die alone on this web.";
                }
                if (millis() - previousMillis >= 15000) {
                  if (
                    detectBendingIndexFinger(hand) == false &&
                    detectCellphonePose(hand) == false &&
                    detectPinch(hand) == false &&
                    detectCrossingFingers(hand) == false
                  ) {
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
        line(
          (226 / 1710) * window.innerWidth,
          (158 / 874) * window.innerHeight,
          window.innerWidth / 2,
          (158 / 874) * window.innerHeight + heavedLength
        );
        line(
          (1484 / 1710) * window.innerWidth,
          (158 / 874) * window.innerHeight,
          window.innerWidth / 2,
          (158 / 874) * window.innerHeight + heavedLength
        );
        pop();

        //vertical thread
        push();
        strokeWeight(1);
        stroke(0);
        line(
          window.innerWidth / 2,
          (158 / 874) * window.innerHeight + heavedLength,
          window.innerWidth / 2,
          (158 / 874) * window.innerHeight + threadLength2
        );
        pop();
      }

      //text
      stroke(0);
      strokeWeight(0.1);
      textAlign(LEFT);
      rectMode(CENTER);
      text(
        txt,
        window.innerWidth * 0.15,
        window.innerHeight * 0.5,
        window.innerWidth * 0.25
      );
      push();
      textAlign(LEFT);
      rectMode(CENTER);
      textSize(Math.max((20 / 874) * window.innerHeight, 15));
      text(
        instruction,
        window.innerWidth * 0.15,
        window.innerHeight * 0.92,
        window.innerWidth * 0.25
      );
      pop();
      break;
    case 3:
      background(195, 38, 45);
  }
}

class Spider {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  body() {
    imageMode(CENTER);
    image(
      spiderUpImage[0],
      this.x,
      this.y,
      Math.max(
        Math.sqrt(
          ((100 * 100) / (1710 * 874)) * window.innerWidth * window.innerHeight
        ),
        70
      ),
      Math.max(
        Math.sqrt(
          ((100 * 100) / (1710 * 874)) * window.innerWidth * window.innerHeight
        ),
        70
      )
    );
  }

  wiggle() {
    let wiggleOffsetX = (noise(frameCount * 0.05) - 0.5) * 20; // amplitude=20
    let wiggleOffsetY = (noise(frameCount * 0.05 + 1000) - 0.5) * 20;
    imageMode(CENTER);
    image(
      spiderUpImage[index],
      this.x + wiggleOffsetX,
      this.y + wiggleOffsetY,
      Math.max(
        Math.sqrt(
          ((100 * 100) / (1710 * 874)) * window.innerWidth * window.innerHeight
        ),
        70
      ),
      Math.max(
        Math.sqrt(
          ((100 * 100) / (1710 * 874)) * window.innerWidth * window.innerHeight
        ),
        70
      )
    );
  }

  fall() {
    imageMode(CENTER);
    image(
      spiderUpImage[index],
      this.x,
      this.y,
      Math.max(
        Math.sqrt(
          ((100 * 100) / (1710 * 874)) * window.innerWidth * window.innerHeight
        ),
        70
      ),
      Math.max(
        Math.sqrt(
          ((100 * 100) / (1710 * 874)) * window.innerWidth * window.innerHeight
        ),
        70
      )
    );
    this.y += 8;
  }
}

function webTouched() {
  if (hands.length > 0) {
    for (let hand of hands) {
      // noStroke();
      // fill(0, 0, 0);
      // circle(hand.index_finger_tip.x, hand.index_finger_tip.y, 5);
      imageMode(CENTER);
      image(
        index_finger,
        hand.index_finger_tip.x,
        hand.index_finger_tip.y,
        250,
        250
      );
      domHand = hand.handedness;
      if (domHand === "Right") {
        nonDomHand = "Left";
      } else {
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
    for (let hand of hands) {
      // noStroke();
      // fill(0, 0, 0);
      // circle(hand.index_finger_tip.x, hand.index_finger_tip.y, 5);
      imageMode(CENTER);
      image(
        index_finger,
        hand.index_finger_tip.x,
        hand.index_finger_tip.y,
        250,
        250
      );
      if (domHand === hand.handedness) {
        let index = hand.index_finger_tip;
        if (
          index.x >= 181 &&
          index.x <= 268 &&
          index.y >= 253 &&
          index.y <= 318
        ) {
          //(231, 288)
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
    for (let hand of hands) {
      if (domHand === hand.handedness) {
        // noStroke();
        // fill(0, 0, 0);
        // circle(hand.index_finger_tip.x, hand.index_finger_tip.y, 5);
        // circle(hand.thumb_tip.x, hand.thumb_tip.y, 5);
        imageMode(CENTER);
        image(
          index_finger,
          hand.index_finger_tip.x,
          hand.index_finger_tip.y,
          250,
          250
        );
        image(thumb, hand.thumb_tip.x, hand.thumb_tip.y, 250, 250);
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
          // console.log(
          //   currentTime,
          //   lastUpdateTime,
          //   currentTime - lastUpdateTime
          // );
          if (!dying || currentTime - lastUpdateTime >= dyingUpdateInterval) {
            if (
              (moveToLeftAnchor || moveToBottomAnchor || diagonalRight) &&
              detectBendingIndexFinger(hand)
            ) {
              // console.log("All conditions met, updating spider position.");
              spider.x = (hand.index_finger_tip.x + hand.thumb_tip.x) / 2;
              spider.y = (hand.index_finger_tip.y + hand.thumb_tip.y) / 2;
              spiderMoved = true;
              lastUpdateTime = currentTime;
              return true;
            }
          }
          if (!moveToLeftAnchor && !moveToBottomAnchor && !diagonalRight) {
            spider.x = (hand.index_finger_tip.x + hand.thumb_tip.x) / 2;
            spider.y = (hand.index_finger_tip.y + hand.thumb_tip.y) / 2;
            spiderMoved = true;
            //lastUpdateTime = currentTime;
            return true;
          }

          if (moveToRightAnchor && !diagonalRight) {
            spider.x = (hand.index_finger_tip.x + hand.thumb_tip.x) / 2;
            spider.y = (hand.index_finger_tip.y + hand.thumb_tip.y) / 2;
            spiderMoved = true;
            //lastUpdateTime = currentTime;
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
    for (let hand of hands) {
      if (nonDomHand == hand.handedness) {
        // noStroke();
        // fill(0, 0, 0);
        // circle(hand.index_finger_tip.x, hand.index_finger_tip.y, 5);
        imageMode(CENTER);
        image(
          non_dom_hand,
          hand.index_finger_tip.x,
          hand.index_finger_tip.y,
          250,
          250
        );
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
    for (let hand of hands) {
      if (nonDomHand == hand.handedness) {
        // noStroke();
        // fill(0, 0, 0);
        // circle(hand.index_finger_tip.x, hand.index_finger_tip.y, 5);
        // circle(hand.middle_finger_tip.x, hand.middle_finger_tip.y, 5);
        // circle(hand.ring_finger_tip.x, hand.ring_finger_tip.y, 5);
        imageMode(CENTER);
        image(
          non_dom_hand,
          hand.index_finger_tip.x,
          hand.index_finger_tip.y,
          250,
          250
        );
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
    for (let hand of hands) {
      if (nonDomHand == hand.handedness) {
        // noStroke();
        // fill(0, 0, 0);
        // circle(hand.index_finger_tip.x, hand.index_finger_tip.y, 5);
        // circle(hand.middle_finger_tip.x, hand.middle_finger_tip.y, 5);
        imageMode(CENTER);
        image(
          non_dom_hand,
          hand.index_finger_tip.x,
          hand.index_finger_tip.y,
          250,
          250
        );
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
