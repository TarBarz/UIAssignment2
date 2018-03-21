var canvas = document.querySelector("canvas");
canvas.width = 1280;
canvas.height = 640;
var surface = canvas.getContext("2d");

var ding = document.getElementById("ding");
var shoo = document.getElementById("shoo");
var bimp = document.getElementById("bimp");
var fip = document.getElementById("fip");
var whirr = document.getElementById("whirr");

surface.font = "50px Arial Black";
surface.textAlign = "center";

var lv = 9;
var currentXP = 960;
var maxXP = 2000;
var currentHP = 340;
var maxHP = 900;
var currentMP = 80;
var maxMP = 165;
var atk = 21;
var def = 18;
var spd = 12;
var gold = 350;

var itemArray = [{id: 0, img: "itemicon1", name: "Health Potion", qty: 3, price: 35, desc: "A potent healing potion brewed by a witch.", effectdesc: "HP +400"},
{id: 1, img: "itemicon2", name: "Magic Potion", qty: 2, price: 30, desc: "A powerful brew that restores magic power.", effectdesc: "MP +50"},
{id: 2, img: "itemicon3", name: "Attack Boost", qty: 1, price: 180, desc: "A magic sigil that boosts strength permanently.", effectdesc: "ATK +2"},
{id: 3, img: "itemicon4", name: "Defence Boost", qty: 1, price: 180, desc: "A magic sigil that boosts defence permanently.", effectdesc: "DEF +2"},
{id: 4, img: "itemicon5", name: "Gold Coin", qty: 1, price: 500, desc: "A coin with no practical use. Can be sold for a high price.", effectdesc: "N/A"},
{id: 5, img: "itemicon6", name: "Super Potion", qty: 0, price: 200, desc: "A strong, versatile, and rare potion.", effectdesc: "HP +500, MP +100"}];



var item0img = new Image();
item0img.src = "img/" + itemArray[0].img + ".png";
var item1img = new Image();
item1img.src = "img/" + itemArray[1].img + ".png";
var item2img = new Image();
item2img.src = "img/" + itemArray[2].img + ".png";
var item3img = new Image();
item3img.src = "img/" + itemArray[3].img + ".png";
var item4img = new Image();
item4img.src = "img/" + itemArray[4].img + ".png";
var item5img = new Image();
item5img.src = "img/" + itemArray[5].img + ".png";

var arrow = new Image();
arrow.src = "img/selectionarrow.png";
var arrowLocation;
var specialArrow = new Image();
specialArrow.src = "img/specialarrow.png";

var specialArrowLocation;

var currentScreen; //assign id numbers to each screen

window.addEventListener("keydown", keyDown);

StartInventoryScreen();

function StartInventoryScreen()
{
	arrowLocation = 0;
	specialArrowLocation = 0;
	DrawInventoryScreen();
	currentScreen = 1;
}

function DrawInventoryScreen()
{
	surface.clearRect(0,0,1280,640);
	surface.font = "50px Arial Black";
	surface.textAlign = "center";
	surface.fillStyle = "white";
	surface.fillRect(220, 130, 840, 250);
	surface.beginPath();
	surface.lineWidth = 3;
	surface.rect(220, 130, 840, 250);
	surface.stroke();
	
	surface.fillRect(320, 10, 640, 100);
	surface.rect(320, 10, 640, 100);
	surface.stroke();
	
	surface.fillRect(40, 10, 260, 100); //menu cycle buttons
	surface.rect(40, 10, 260, 100);
	surface.stroke();
	surface.fillRect(980,10,260,100);
	surface.rect(980, 10, 260, 100);
	surface.stroke();

	surface.fillRect(320,400,640,100); //item name
	surface.rect(320, 400, 640, 100);
	surface.stroke();
	
	surface.fillRect(180, 400, 100, 100);
	surface.rect(180, 400, 100, 100); //icon
	surface.stroke();
	
	surface.fillRect(180, 520, 780, 100);
	surface.rect(180, 520, 780, 100); //description
	surface.stroke();
	
	surface.fillRect(980, 400, 260, 60);
	surface.rect(980, 400, 260, 60); //# held
	surface.stroke();
	
	surface.fillRect(980, 480, 260, 60)
	surface.rect(980, 480, 260, 60); //USE/DISCARD boxes
	surface.fillRect(980, 560, 260, 60);
	surface.rect(980, 560, 260, 60);
	surface.stroke();
	
	surface.fillStyle = "black";
	surface.fillRect(10, 20, 80, 80);
	surface.fillRect(1190, 20, 80, 80);
	surface.fillStyle = "white";
	surface.fillText("Q", 50, 75);
	surface.fillText("P", 1230, 75);
	
	surface.lineWidth = 3;
	surface.fillStyle = "black";
	surface.fillText("INVENTORY", 640, 75);
	surface.font = "40px Arial Black";
	surface.fillText("PAUSE", 170, 75);
	surface.fillText("GEAR", 1110, 75);
	surface.fillText("USE", 1110, 525);
	surface.fillText("DISCARD", 1110, 605);
	
	if (arrowLocation <=5 && itemArray[arrowLocation].qty != 0)
	{
		surface.fillText(itemArray[arrowLocation].name,640,460);
		switch (arrowLocation)
		{
			case 0:
				surface.drawImage(item0img, 180, 400, 100, 100);
				break;
			case 1:
				surface.drawImage(item1img, 180, 400, 100, 100);
				break;
			case 2:
				surface.drawImage(item2img, 180, 400, 100, 100);
				break;
			case 3:
				surface.drawImage(item3img, 180, 400, 100, 100);
				break;
			case 4:
				surface.drawImage(item4img, 180, 400, 100, 100);
				break;
			case 5:
				surface.drawImage(item5img, 180, 400, 100, 100);
				break;				
		}
		surface.fillText("HELD: "+itemArray[arrowLocation].qty, 1110, 445);
		surface.font = "20px Arial Black";
		surface.fillText(itemArray[arrowLocation].desc, 570, 560);
		surface.fillText(itemArray[arrowLocation].effectdesc, 570, 590);
	}
	
	var pointsArrayX = [240, 420, 600, 780, 960, 240, 420, 600, 780, 960];
	var pointsArrayY = [150, 150, 150, 150, 150, 280, 280, 280, 280, 280];
	
	for (var i = 0; i <= 9; i++)
	{
	surface.fillStyle = "#ffc7ff";
	surface.fillRect(pointsArrayX[i], pointsArrayY[i], 80, 80);
	surface.beginPath();
	surface.lineWidth = 3;
	surface.rect(pointsArrayX[i],pointsArrayY[i],80,80);
	surface.stroke();		
	}

	item0img.onload = function()
	{
		if (itemArray[0].qty != 0)
			surface.drawImage(item0img, pointsArrayX[0]+8, pointsArrayY[0]+8);
	};
	item1img.onload = function()
	{
		if (itemArray[1].qty != 0)
			surface.drawImage(item1img, pointsArrayX[1]+8, pointsArrayY[1]+8);
	};
	item2img.onload = function()
	{
		if (itemArray[2].qty != 0)
			surface.drawImage(item2img, pointsArrayX[2]+8, pointsArrayY[2]+8);
	};
	item3img.onload = function()
	{
		if (itemArray[3].qty != 0)
			surface.drawImage(item3img, pointsArrayX[3]+8, pointsArrayY[3]+8);
	}
	item4img.onload = function()
	{
		if (itemArray[4].qty != 0)
			surface.drawImage(item4img, pointsArrayX[4]+8, pointsArrayY[4]+8);
	}
	item5img.onload = function()
	{
		if (itemArray[5].qty != 0)
		surface.drawImage(item5img, pointsArrayX[5]+8, pointsArrayY[5]+8);
	}
	if (itemArray[0].qty != 0)
		surface.drawImage(item0img, pointsArrayX[0]+8, pointsArrayY[0]+8);
	if (itemArray[1].qty != 0)
			surface.drawImage(item1img, pointsArrayX[1]+8, pointsArrayY[1]+8);
	if (itemArray[2].qty != 0)
		surface.drawImage(item2img, pointsArrayX[2]+8, pointsArrayY[2]+8);
	if (itemArray[3].qty != 0)
		surface.drawImage(item3img, pointsArrayX[3]+8, pointsArrayY[3]+8);	
	if (itemArray[4].qty != 0)
		surface.drawImage(item4img, pointsArrayX[4]+8, pointsArrayY[4]+8);
	if (itemArray[5].qty != 0)
		surface.drawImage(item5img, pointsArrayX[5]+8, pointsArrayY[5]+8);
	
	arrow.onload = function()
	{
		surface.drawImage(arrow, pointsArrayX[arrowLocation]+24, pointsArrayY[arrowLocation]-16);
	}
	surface.drawImage(arrow, pointsArrayX[arrowLocation]+24, pointsArrayY[arrowLocation]-16);
	

	if (specialArrowLocation != 0)
	{
	specialArrow.onload = function()
	{
		surface.drawImage(specialArrow, 1240, 494);
	}
	if (specialArrowLocation == 1)
		surface.drawImage(specialArrow, 1240, 494);
	if (specialArrowLocation == 2)
		surface.drawImage(specialArrow, 1240, 574);
	}
}

function keyDown()
{
	switch (event.keyCode)
	{

		case 87: //W
			if (currentScreen == 1)
			{
				if (specialArrowLocation == 0)
				{
					if (arrowLocation >= 5)
					{
						arrowLocation -= 5;
						//ding.play();
						DrawInventoryScreen();
					}
					else
						bimp.play();
				}
				else if (specialArrowLocation == 1)
				{
					specialArrowLocation = 2;
					fip.play();
					DrawInventoryScreen();
				}
				else if (specialArrowLocation==2)
				{
					specialArrowLocation = 1;
					fip.play();
					DrawInventoryScreen();
				}
			}
			break;
		case 83: //S
			if (currentScreen == 1)
			{
				if (specialArrowLocation == 0)
				{
					if (arrowLocation <= 4)
					{
						arrowLocation += 5;
						fip.play();
						DrawInventoryScreen();
					}
					else
						bimp.play();
				}
				else if (specialArrowLocation == 1)
				{
					specialArrowLocation = 2;
					fip.play();
					DrawInventoryScreen();
				}
				else if (specialArrowLocation==2)
				{
					specialArrowLocation = 1;
					fip.play();
					DrawInventoryScreen();
				}
			}
			break;
		case 65: //A
			if (currentScreen == 1)
			{
				if (specialArrowLocation == 0)
				{
				if (arrowLocation > 0)
					{
						arrowLocation -= 1;
						fip.play();
						DrawInventoryScreen();
					}
					else
						bimp.play();
				}
			}
			break;
		case 68: //D
			if (currentScreen == 1)
			{
				if (specialArrowLocation == 0)
				{
					if (arrowLocation < 9)
					{
						arrowLocation += 1;
						fip.play();
						DrawInventoryScreen();
					}
					else
						bimp.play();
				}
			}
			break;
		case 32: //Space
			if (currentScreen == 1)
			{
				if (specialArrowLocation == 0)
				{
					if (arrowLocation <=5)
					{
						if (itemArray[arrowLocation].qty > 0)
						{
							specialArrowLocation = 1;
							ding.play();
							DrawInventoryScreen();
						}
						else
							bimp.play();
					}
					else
						bimp.play();
				}
				else if (specialArrowLocation == 1)
				{
					specialArrowLocation = 0;
					UseItem();
					DrawInventoryScreen();
				}
				else if (specialArrowLocation == 2)
				{
					specialArrowLocation = 0;
					DiscardItem();
					ding.play();
					DrawInventoryScreen();
				}
			}
			break;
		case 8: //Backspace
			if (currentScreen == 1)
				if (specialArrowLocation != 0)
				{
					specialArrowLocation = 0;
					shoo.play();
					DrawInventoryScreen();
				}
				break;
	} 
}

function UseItem()
{
	if (arrowLocation == 0)
	{
		if (currentHP + 400 <= maxHP)
			currentHP += 400;
		else
			currentHP = maxHP;
		itemArray[0].qty -= 1;
		whirr.play();
	}
	if (arrowLocation == 1)
	{
		if (currentMP + 50 <= maxMP)
			currentMP += 50;
		else
			currentMP = maxMP;
		itemArray[1].qty -= 1;
		whirr.play();
	}
	if (arrowLocation == 2)
	{
		atk += 2;
		itemArray[2].qty -= 1;
		whirr.play();
	}
	if (arrowLocation == 3)
	{
		def += 2;
		itemArray[3].qty -= 1;
		whirr.play();
	}
	if (arrowLocation == 4)
	{
		bimp.play();
	}
	if (arrowLocation == 5)
	{
		if (currentHP + 500 <= maxHP)
			currentHP += 500;
		else
			currentHP = maxHP;
		
		if (currentMP + 100 <= maxMP)
			currentMP += 100;
		else
			currentMP = maxMP;
		itemArray[5].qty -= 1;
		whirr.play();
	}
}

function DiscardItem()
{
	itemArray[arrowLocation].qty -= 1;
}