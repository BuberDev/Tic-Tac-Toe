const canvas = document.querySelector('canvas');
 const ctx = canvas.getContext('2d');
 canvas.width = 1000;
 canvas.height = 500;
 const cw = canvas.width;
 const ch = canvas.height;
 const ballSize = 20;
 let ballX = cw / 2 - ballSize / 2
 let ballY = ch / 2 - ballSize / 2

 const paddelHeight = 100;
 const paddelWidth = 20;

 const playerX = 70;
 const aiX = 910;

 let playerY = 200;
 let aiY = 200;

 const lineWidth = 6;
 const lineHeight = 16;

 let ballSpeedX = 4;
 let ballSpeedY = 4;

 function player() {
   ctx.fillStyle = 'blue';
   ctx.fillRect(playerX, playerY, paddelWidth, paddelHeight);
     
      // reaction to bounce player
if (ballX - paddelWidth <= playerX && ballY >= playerY - ballSize && ballY <= playerY + paddelHeight){
 ballSpeedX = -ballSpeedX;
}
 }

 function ai() {
   ctx.fillStyle = 'red';
   ctx.fillRect(aiX, aiY, paddelWidth, paddelHeight);
      // reaction to bounce AI
if (ballX + ballSize >= aiX && ballY <= aiY + paddelHeight && ballY >= aiY - ballSize){
 ballSpeedX = -ballSpeedX;
}
 }

 function ball() {
   ctx.fillStyle = '#ffffff';
   ctx.fillRect(ballX, ballY, ballSize, ballSize);

   ballX += ballSpeedX;
   ballY += ballSpeedY;

   if (ballY <= 0 || ballY + ballSize >= ch) {
     ballSpeedY = -ballSpeedY;
     speedUp()
   }
   if (ballX <= 0 || ballX + ballSize >= cw) {
     ballSpeedX = -ballSpeedX;
     speedUp()
   }
 }

 function table() {
   ctx.fillStyle = 'darkgreen';
   ctx.fillRect(0, 0, cw, ch);

   for (let linePosition = 20; linePosition < ch; linePosition += 30) {
     ctx.fillStyle = "darkgray"
     ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight)
   }

 }

 topCanvas = canvas.offsetTop;
 console.log(topCanvas)

 function playerPosition(e) {
   playerY = e.clientY - topCanvas - paddelHeight / 2;

   if (playerY >= ch - paddelHeight) {
     playerY = ch - paddelHeight
   }

   if (playerY <= 0) {
     playerY = 0;
   }
   //aiY = playerY;
 }

 function speedUp() {
   if (ballSpeedX > 0 && ballSpeedX < 16) {
     ballSpeedX += .2;

   } else if (ballSpeedX < 0 && ballSpeedX > -16) {
     ballSpeedX -= .2;
   }

   if (ballSpeedY > 0 && ballSpeedY < 16) {
     ballSpeedY += .2;

   } else if (ballSpeedY < 0 && ballSpeedY > -16) {
     ballSpeedY -= .2;
   }

   console.log(ballSpeedX + ", " + ballSpeedY)
 }

 /*-----------AI----------*/

 function aiPosition() {
   // Function called by the game () function (60 times per second in our case) The purpose of the function is to determine the position of the racket, which is then drawn by the function ai ().
   // this is just a simple variation that uses two elements: the position of the ball and the position of the racket and the relationship between them. You can program a more complicated mechanism yourself, which will also use, for example, ball speed, difficulty level, duration of the game (the longer the AI behaves differently). Combine.
   const middlePaddel= aiY + paddelHeight / 2 ;
   // aiY + paddelHeight / 2 - always means the coordinates of the center of the racket height. Obviously, each time the function is run, it retrieves the current values.      
   const middleBall = ballY + ballSize / 2;
   // ballY + ballSize / 2 - current ball coordinates (middle of height) on the canvas.      
   if (ballX > 500) { // the ball will be on the right side of the canvas (canvas from 0 to 1000, i.e. in this case the area is larger from 500 to 1000)
     
   // Condition 1 - the center of the ball is more than 200px from the center of the racket        
     if (middlePaddel - middleBall > 200) {
      

       aiY -= 24; //ruch rakietki w stronę piłki (wartość określa "prędkość") Zmniejszamy na osi Y odległość między piłką a rakietką.
       
   // If the condition is not met, we check if the second specified in the else if is met. If the first is true, the second is not executed.        
     } else 
       if (middlePaddel - middleBall > 50) {
       aiY -= 10;
     }
     // Very similar condition, we only check if the center of the ball is not closer to the center of the racket. If the distance is less (equal to) 50px from the center then do nothing. If it is greater than 50px (and less than 200 by default), then move it by -6px towards the ball.
     
             // THE SAME AS ABOVE ONLY OTHER SIDES (THE BALL IS UNDER THE ROCKET)
     else if (middlePaddel - middleBall < -200) {
       aiY += 24;
     } else if (middlePaddel - middleBall < -50) {
       aiY += 10;
     }
    }
   
   
   
       // WHEN BALLS ARE MORE THAN 100 AND LESS EQUAL TO 500 FROM THE LEFT EDGE (left side of the court)     
     if (ballX <= 500 && ballX > 100) {
     if (middlePaddel - middleBall > 100) {
       aiY -= 3;
     } 
if (middlePaddel - middleBall < -100) {
       aiY += 3;
     }
   }

// when trying to swing the paddle at the bottom off the canvas      
   if (aiY >= ch - paddelHeight) {
     aiY = ch - paddelHeight
   }

// when trying to swing the racket at the top off the canvas      
   if (aiY <= 0) {
     aiY = 0;
   }
 }

 canvas.addEventListener("mousemove", playerPosition)

 function game() {
   table()
   ball()
   player()
   ai()
   aiPosition()
 }

 setInterval(game, 1000 / 60)
