// src/components/DateDisplayCanvas.jsx

import React from 'react';
import { ReactP5Wrapper } from '@p5-wrapper/react';
import dayjs from 'dayjs';

function sketch(p5) {
  let helvet, bodoni, timesNR;
  let sunIcon, moonIcon;
  let daySet, monthSet, yearSet, timeOfDay, timeOfDayText;
  let scaleFactor = 1;

  p5.preload = () => {
    helvet = p5.loadFont('helveticanowdisplay-black.ttf');
    bodoni = p5.loadFont('bondoni.ttf');
    timesNR = p5.loadFont('Times New Roman Bold.ttf');
    sunIcon = p5.loadImage('sun.png');
    moonIcon = p5.loadImage('moon.png');
  };

  p5.setup = () => {
    const canvas = p5.createCanvas(500, 500, p5.P2D);
    canvas.parent(p5.select('.date-display-container'));
    canvas.style('display', 'block'); canvas.style('width', '100%'); canvas.style('height', '100%');
    p5.angleMode(p5.DEGREES);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.noLoop(); // Start with the loop paused.
  };
  
  p5.windowResized = () => {};

  p5.updateWithProps = (props) => {
    if (props.date) {
      const date = dayjs(props.date);
      daySet = date.date();
      monthSet = date.month() + 1;
      yearSet = date.year();
      
      const hour = date.hour();
      if (hour >= 5 && hour < 12) timeOfDayText = "Morning";
      else if (hour >= 12 && hour < 17) timeOfDayText = "Afternoon";
      else if (hour >= 17 && hour < 21) timeOfDayText = "Evening";
      else timeOfDayText = "Nighttime";
      
      if (hour >= 6 && hour < 18) timeOfDay = 'DAY';
      else timeOfDay = 'NIGHT';
      
      p5.loop(); // UPDATED: Wake up the draw loop to run one frame.
    }
  };

  p5.draw = () => {
    p5.clear();
    if (!daySet) return;
    
    scaleFactor = p5.width / 500;
    
    p5.push();
    p5.scale(scaleFactor);
    drawDate();
    p5.pop();

    p5.noLoop(); // UPDATED: Put the draw loop back to sleep after it's done.
  };

  // --- ALL YOUR DRAWING FUNCTIONS BELOW REMAIN THE SAME ---
  // (drawDate, drawDayPart, drawMonthPart, drawWeatherIcon, etc.)

  function drawDate() {
    p5.push();
    p5.translate(45, -30);
    drawDayPart(255, 60);
    drawMonthPart(255, 50);
    drawTimeText(255, 3);
    p5.push();
    p5.fill(255); p5.stroke(255); p5.strokeWeight(25);
    p5.quad(38, 310, 149, 244, 161, 257, 60, 340);
    p5.quad(60, 324, 160, 245, 170, 256, 87, 340);
    p5.quad(186, 180, 271, 172, 260, 323, 210, 329);
    p5.quad(113, 214, 200, 224, 189, 272, 95, 265);
    p5.pop();
    p5.push();
    p5.fill(255); p5.strokeWeight(0); p5.rotate(-20.3);
    p5.square(215, 260, 118);
    p5.pop();
    drawDayPart(0, 35);
    drawMonthPart(0, 30);
    drawWeatherIcon();
    drawTimeText(0, 0);
    p5.push();
    p5.fill(0); p5.stroke(0); p5.strokeWeight(0);
    p5.quad(38, 310, 149, 244, 161, 257, 60, 340);
    p5.quad(55, 324, 160, 245, 170, 256, 87, 340);
    p5.quad(186, 180, 271, 172, 260, 323, 210, 329);
    if (monthSet >= 10) p5.quad(30, 214, 200, 224, 189, 272, 50, 310);
    else {
      if (monthSet === 7) p5.quad(50, 214, 200, 224, 189, 272, 80, 300);
      else p5.quad(95, 214, 200, 224, 189, 272, 80, 300);
    }
    p5.pop();
    drawDayPart(255, 0);
    drawMonthPart(255, 0);
    p5.push();
    p5.fill(255); p5.stroke(255); p5.strokeWeight(0);
    p5.quad(67, 304, 134, 261, 138, 267, 72, 313);
    p5.pop();
    p5.pop();
  }

  function drawDayPart(color, weight) {
    p5.push();
    p5.textFont(helvet);
    p5.textSize(500 / 3);
    p5.fill(color); p5.stroke(color); p5.strokeWeight(weight);
    p5.scale(0.67, 1, 1);
    if (p5.floor(daySet / 10) === 0) {
      p5.rotate(3.6);
      p5.text(daySet, 320, 210);
    } else {
      p5.rotate(-5.6);
      p5.text(p5.floor(daySet / 10), 250, 250);
      p5.rotate(5.6);
      p5.rotate(3.6);
      p5.text(daySet - (p5.floor(daySet / 10) * 10), 420, 190);
    }
    p5.pop();
  }

  function drawMonthPart(color, weight) {
    p5.push();
    p5.textFont(bodoni);
    p5.textSize(400 / 3);
    p5.fill(color); p5.stroke(color); p5.strokeWeight(weight);
    p5.scale(1.09 * 0.9, 1 * 0.9, 1);
    p5.translate(0, 40);
    if (p5.floor(monthSet / 10) === 0) {
      if ([1, 4, 6, 8, 9].includes(monthSet)) {
          p5.textFont(timesNR);
      }
      p5.rotate(4.9);
      p5.shearX(-8.3);
      p5.text(monthSet, 130, 210);
    } else {
      p5.push();
      p5.textFont(timesNR);
      p5.textSize(450 / 3);
      p5.rotate(4.9);
      p5.shearX(-1.6);
      p5.text(1, 45, 210);
      p5.pop();
      if ([10, 11].includes(monthSet)) {
          p5.textFont(timesNR);
      }
      p5.rotate(4.9);
      p5.shearX(-8.3);
      p5.text(monthSet - 10, 130, 210);
    }
    p5.pop();
  }

  function drawWeatherIcon() {
    p5.push();
    p5.rotate(-20.3);
    p5.translate(220, 265);
    p5.imageMode(p5.CENTER);
    if (timeOfDay === 'DAY') {
      p5.image(sunIcon, 50, 50, 80, 80);
    } else {
      p5.image(moonIcon, 50, 50, 80, 80);
    }
    p5.pop();
  }

  function drawTimeText(color, weight) {
    p5.push();
    p5.textFont(helvet);
    p5.textAlign(p5.LEFT, p5.CENTER);
    p5.fill(color); p5.stroke(color); p5.strokeWeight(weight);
    p5.rotate(-23.6);
    p5.scale(0.4 * 5, 1 * 5, 1);
    const textToDraw = timeOfDayText || "";
    p5.text(textToDraw, -p5.textWidth(textToDraw), 76);
    p5.pop();
  }
}

function DateDisplayCanvas({ date }) {
  return <ReactP5Wrapper sketch={sketch} date={date} />;
}

export default DateDisplayCanvas;