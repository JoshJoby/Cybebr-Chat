const cv = require('@u4/opencv4nodejs');
const path = require('path');
const { drawRectAroundFaces, getImage } = require('./commons');

const faceCascade = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_DEFAULT);

const basePath = './faces';

// initialize face recognizer with the LBPH algorithm
const recognizer = new cv.FaceRecognizerLBPH();

// load pre-trained data
const trainedModel = path.resolve(basePath, 'trainedModelLBPH.json');
const trainedModelData = require(trainedModel);
recognizer.loadFromJson(trainedModelData);

// open capture from webcam
const devicePort = 0;
const wCap = new cv.VideoCapture(devicePort);

// loop through the capture
const delay = 10;
setInterval(() => {
  let frame = wCap.read();
  // loop back to start on end of stream reached
  if (frame.empty) {
    wCap.reset();
    frame = wCap.read();
  }
  // detect faces
  const grayImg = frame.bgrToGray();
  const faceRects = faceCascade.detectMultiScale(grayImg).objects;

  // recognize faces
  faceRects.forEach(faceRect => {
    const faceImg = grayImg.getRegion(faceRect).resize(100, 100);
    const result = recognizer.predict(faceImg);

    console.log(`Recognized face: ${result.label}`);
  });

}, delay);
