// window.onload = function() {

class CanvasGame {
    constructor(brickRowCount, brickColumnCount, dx, dy) {
        // this.firstName = firstName;
        // let hidden = "Hidden var new";
        // this.service = function() {console.log(hidden)};

        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var ballRadius = 10;
        var x = canvas.width/2;
        var y = canvas.height-30;
        this.dx = dx;
        this.dy = dy;
        var paddleHeight = 10;
        var paddleWidth = 75;
        var paddleX = (canvas.width-paddleWidth)/2;
        var rightPressed = false;
        var leftPressed = false;
        this.brickRowCount = brickRowCount;
        this.brickColumnCount = brickColumnCount;
        var brickWidth = 75;
        var brickHeight = 20;
        var brickPadding = 10;
        var brickOffsetTop = 30;
        var brickOffsetLeft = 30;
        var score = 0;
        this.currentScore = function() {return score;};
        var lives = 3;
        var direction;


        var bricks = [];
        for(let c=0; c<this.brickColumnCount; c++) {
            bricks[c] = [];
            for(let r=0; r<this.brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }

        $(document).keydown(function(event) {
            if (event.keyCode == 39) {
                direction = "right";
            }
            else if (event.keyCode == 37) {
                direction = "left";
                leftPressed = true;
            }
        });

        $(document).mousemove(function(event) {
            direction = null;
            _this.mouseMoveHandler(event);
        });

        // document.addEventListener("mousemove", this.mouseMoveHandler, false);

        this.mouseMoveHandler = function (e) {
            var relativeX = e.clientX - canvas.offsetLeft;
            if(relativeX > 0 && relativeX < canvas.width) {
                paddleX = relativeX - paddleWidth/2;
            }
        }
        this.collisionDetection = function() {
            for(let c=0; c<this.brickColumnCount; c++) {
                for(let r=0; r<this.brickRowCount; r++) {
                    var b = bricks[c][r];
                    if(b.status == 1) {
                        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                            this.dy = -this.dy;
                            b.status = 0;
                            score++;
                            if(score == this.brickRowCount*this.brickColumnCount) {
                                alert("YOU WIN, CONGRATS!");
                                document.location.reload();
                            }
                        }
                    }
                }
            }
        }

        this.drawBall = function() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI*2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
        this.drawPaddle = function() {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
        this.drawBricks = function() {
            for(let c=0; c<this.brickColumnCount; c++) {
                for(let r=0; r<this.brickRowCount; r++) {
                    if(bricks[c][r].status == 1) {
                        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "#0095DD";
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }
        this.drawScore = function() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.fillText("Score: "+score, 8, 20);
        }
        this.drawLives = function() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.fillText("Lives: "+lives, canvas.width-65, 20);
        }
    
        var _this = this;
        this.draw = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            _this.drawBricks();
            _this.drawBall();
            _this.drawPaddle();
            _this.drawScore();
            _this.drawLives();
            _this.collisionDetection();

            if(x + _this.dx > canvas.width-ballRadius || x + _this.dx < ballRadius) {
                _this.dx = -_this.dx;
            }
            if(y + _this.dy < ballRadius) {
                _this.dy = -_this.dy;
            }
            else if(y + _this.dy > canvas.height-ballRadius) {
                if(x > paddleX && x < paddleX + paddleWidth) {
                    _this.dy = -_this.dy;
                }
                else {
                    lives--;
                    if(!lives) {
                        alert("GAME OVER");
                        document.location.reload();
                    }
                    else {
                        x = canvas.width/2;
                        y = canvas.height-30;
                        // _this.dx = 3;
                        // _this.dy = -3;
                        paddleX = (canvas.width-paddleWidth)/2;
                    }
                }
            }

            if (direction && direction == "right" && paddleX < canvas.width-paddleWidth) {
                paddleX += 7;
            } else if (direction && direction == "left" && paddleX > 0) {
                paddleX -= 7;
            }

            x += _this.dx;
            y += _this.dy;
            requestAnimationFrame(_this.draw);
        }
        
    }
}

 

// Example usage:
// console.log(newCanvasGame);
// console.log(newCanvasGame instanceof CanvasGame);

// };

$(document).ready(function(){
    var newCanvasGame;
    var yourCurrentScore;

$( "#start" ).click(function() {
    newCanvasGame = new CanvasGame(parseInt($("#rows").val()), $("#columns").val(), 
        parseInt(jQuery('input[name="dif"]:checked').attr("dx")), parseInt(jQuery('input[name="dif"]:checked').attr("dx")));
    newCanvasGame.draw();
});





$("#stop" ).click(function() {
  yourCurrentScore = newCanvasGame.currentScore();
   alert("Резултатът ти е " + yourCurrentScore);
   document.location.reload();
});

$("#pause" ).click(function() {
   $( "#myCanvas" ).stop();
});

$('#rows').change(function() {
    if ( parseInt($("#rows").val()) > 5 || parseInt($("#rows").val()) < 1 ) {
      alert("избери редове от 1 до 5");
    }
});
$('#columns').change(function() {
    if ( parseInt($("#columns").val()) > 8 || parseInt($("#rows").val()) < 1 ) {
      alert("избери редове от 1 до 8");
    }
});

jQuery('#fullscreen').change(function() {
    if (jQuery('#fullscreen:checked')) {
      jQuery('body').addClass("fullscreen");
    }
    
});

jQuery('#normal').change(function() {
     
    if (jQuery('#normal:checked')) {
      jQuery('body').removeClass("fullscreen");
    }
});


jQuery('.exit-fs').click(function() {
   
      jQuery('body').removeClass("fullscreen");
    jQuery('#fullscreen').prop('checked', false);
     jQuery('#normal').prop('checked', true);
});



});


