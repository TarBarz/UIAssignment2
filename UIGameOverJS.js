var canvas = document.querySelector("canvas");
canvas.width = 1280;
canvas.height = 750;
var surface = canvas.getContext("2d");

surface.fillStyle = "white";
surface.fillRect(0, 0, 1280, 750);
surface.font = "100px gameOver red";
surface.textAlign = "center";

var sideArrow = new Image();
sideArrow.src = "img/selectionarrowside.png";

//window.addEventListener("keydown", keyDown);


drawGameOverScreen();
drawTipBox();
drawTipInfoBox();
drawContinueButton();
drawBackToTitleButton();

function drawGameOverScreen()
{
	surface.fillStyle = "black";
	surface.fillRect(150, 25, 750, 450);
	
	surface.fillStyle = "red";
	surface.font = "70px gameOver";
	surface.fillText("GAME", 540, 200);
	surface.textAlign = "center";
	
	surface.fillStyle = "red";
	surface.font = "60px gameOver";
	surface.fillText("OVER", 540, 320);
	surface.textAlign = "center";
}

function drawTipBox()
{
	surface.fillStyle = "black";
	surface.fillRect(1015, 25, 150, 100);
	
	surface.fillStyle = "red";
	surface.font = "50px gameOver";
	surface.fillText("TIP", 1090, 95);
	surface.textAlign = "center";
}

function drawTipInfoBox()
{
	surface.fillStyle = "black";
	surface.fillRect(930, 200, 310, 275);
	
	surface.fillStyle = "red";
	surface.font = "14px gameOver";
	surface.fillText("If you notice a change in the boss's stance, watch out!", 1085, 300);
	surface.fillText("He's prepared to use his special!", 1085, 350);
	surface.textAlign = "center";
}

function drawContinueButton()
{
	surface.fillStyle = "black";
	surface.fillRect(150, 500, 750, 50);
	
	surface.fillStyle = "red";
	surface.font = "30px gameOver";
	surface.fillText("CONTINUE", 540, 535);
	surface.textAlign = "center";
}

function drawBackToTitleButton()
{
	surface.fillStyle = "black";
	surface.fillRect(150, 600, 750, 50);
	
	surface.fillStyle = "red";
	surface.font = "30px gameOver";
	surface.fillText("Back To Title", 540, 635);
	surface.textAlign = "center";
}